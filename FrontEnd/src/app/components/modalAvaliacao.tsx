"use client";

import { useState, useEffect, useRef, FormEvent } from "react";

export type ModalAvaliacaoProps = {
  onClose: () => void;
  onSubmit: (dados: {
    professor: string;
    disciplina: string;
    texto: string;
  }) => void;
};

export default function ModalAvaliacao({
  onClose,
  onSubmit,
}: ModalAvaliacaoProps) {
  const [professores, setProfessores] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [filteredProfs, setFilteredProfs] = useState<string[]>([]);
  const [showProfSug, setShowProfSug] = useState(false);

  const [disciplinas, setDisciplinas] = useState<string[]>([]);
  const [discQuery, setDiscQuery] = useState("");
  const [filteredDiscs, setFilteredDiscs] = useState<string[]>([]);
  const [showDiscSug, setShowDiscSug] = useState(false);

  const [texto, setTexto] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // 1) carrega professores
  useEffect(() => {
    fetch("http://localhost:3001/professor")
      .then(res => res.json())
      .then(data => {
        const nomes = Array.isArray(data)
          ? data.map((p: any) => p.nome)
          : data.professores?.map((p: any) => p.nome) || [];
        setProfessores(nomes);
      })
      .catch(console.error);
  }, []);

  // 2) carrega disciplinas
  useEffect(() => {
    fetch("http://localhost:3001/disciplina")
      .then(res => res.json())
      .then(data => {
        console.log("raw disciplinas:", data);
        const lista = Array.isArray(data)
          ? data
          : data.disciplinas || data.rows || [];
        const nomes = lista.map((d: any) => d.nome);
        setDisciplinas(nomes);
      })
      .catch(console.error);
  }, []);

  // 3) filtra professores
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setFilteredProfs([]);
      setShowProfSug(false);
      return;
    }
    const res = professores.filter(nome =>
      nome.toLowerCase().includes(q)
    );
    setFilteredProfs(res);
    const únicoExato = res.length === 1 && res[0].toLowerCase() === q;
    setShowProfSug(res.length > 0 && !únicoExato);
  }, [query, professores]);

  // 4) filtra disciplinas
  useEffect(() => {
    const q = discQuery.trim().toLowerCase();
    if (!q) {
      setFilteredDiscs([]);
      setShowDiscSug(false);
      return;
    }
    const res = disciplinas.filter(nome =>
      nome.toLowerCase().includes(q)
    );
    setFilteredDiscs(res);
    const únicoExato = res.length === 1 && res[0].toLowerCase() === q;
    setShowDiscSug(res.length > 0 && !únicoExato);
  }, [discQuery, disciplinas]);

  // 5) fecha dropdowns ao clicar fora
  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowProfSug(false);
        setShowDiscSug(false);
      }
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  function pickProf(nome: string) {
    setQuery(nome);
    setShowProfSug(false);
  }
  function pickDisc(nome: string) {
    setDiscQuery(nome);
    setShowDiscSug(false);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({ professor: query, disciplina: discQuery, texto });
    setQuery(""); setDiscQuery(""); setTexto("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div
        ref={containerRef}
        className="bg-white w-full max-w-2xl mx-4 p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-6">Nova Publicação</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* professor */}
          <div className="relative">
            <input
              type="text"
              placeholder="Nome do professor"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() =>
                query && filteredProfs.length > 0 && setShowProfSug(true)
              }
              required
              className="bg-white w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none"
            />
            {showProfSug && (
              <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 max-h-40 overflow-y-auto rounded-b-lg z-50">
                {filteredProfs.map((nome, idx) => (
                  <li
                    key={idx}
                    onClick={() => pickProf(nome)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {nome}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* disciplina */}
          <div className="relative">
            <input
              type="text"
              placeholder="Disciplina"
              value={discQuery}
              onChange={e => setDiscQuery(e.target.value)}
              onFocus={() =>
                discQuery && filteredDiscs.length > 0 && setShowDiscSug(true)
              }
              required
              className="bg-white w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none"
            />
            {showDiscSug && (
              <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 max-h-40 overflow-y-auto rounded-b-lg z-50">
                {filteredDiscs.map((nome, idx) => (
                  <li
                    key={idx}
                    onClick={() => pickDisc(nome)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {nome}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* texto */}
          <textarea
            placeholder="Escreva sua avaliação..."
            value={texto}
            onChange={e => setTexto(e.target.value)}
            required
            className="bg-white w-full h-40 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none resize-none"
          />

          {/* botões */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#4BA9D6] text-white rounded-full hover:bg-[#16589A]"
            >
              Avaliar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
