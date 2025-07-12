"use client";
import axios from "axios";
import { useState, useEffect, useRef, FormEvent } from "react";

// Supondo que seus objetos de professor e disciplina tenham este formato
type Professor = {
  id: number;
  nome: string;
};

type Disciplina = {
  id: number;
  nome: string;
};

export type ModalAvaliacaoProps = {
  onClose: () => void;
};

export default function ModalAvaliacao({ onClose }: ModalAvaliacaoProps) {
  // Estados para armazenar a lista completa de objetos (ID e nome)
  const [professores, setProfessores] = useState<Professor[]>([]); // <<< MUDANÇA
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]); // <<< MUDANÇA

  // Estados para o texto dos inputs (busca)
  const [profQuery, setProfQuery] = useState("");
  const [discQuery, setDiscQuery] = useState("");

  // Estados para as listas filtradas do autocomplete
  const [filteredProfs, setFilteredProfs] = useState<Professor[]>([]);
  const [filteredDiscs, setFilteredDiscs] = useState<Disciplina[]>([]);

  // Estados para controlar a visibilidade dos dropdowns
  const [showProfSug, setShowProfSug] = useState(false);
  const [showDiscSug, setShowDiscSug] = useState(false);
  
  // Estados para os dados do formulário
  const [texto, setTexto] = useState("");
  const [usuarioID, setUsuarioID] = useState<string>(""); // <<< MUDANÇA: Renomeado para clareza
  const [professorID, setProfessorID] = useState<number | null>(null); // <<< MUDANÇA: Armazena o ID
  const [disciplinaID, setDisciplinaID] = useState<number | null>(null); // <<< MUDANÇA: Armazena o ID

  const containerRef = useRef<HTMLDivElement>(null);

  // 1) Carrega professores (agora com ID e nome)
  useEffect(() => {
    fetch("http://localhost:3001/professor")
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: Professor[]) => { // <<< MUDANÇA: Tipagem forte
        // Garante que o data é um array antes de setar
        const profs = Array.isArray(data) ? data : (data as any).professores || [];
        setProfessores(profs);
      })
      .catch(error => {
        console.error("Erro ao carregar professores:", error);
      });
  }, []);

  // 2) Carrega disciplinas (agora com ID e nome)
  useEffect(() => {
    fetch("http://localhost:3001/disciplina")
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: Disciplina[]) => { // <<< MUDANÇA: Tipagem forte
        setDisciplinas(Array.isArray(data) ? data : []);
      })
      .catch(error => {
        console.error("Erro ao carregar disciplinas:", error);
      });
  }, []);

  // 3) Filtra professores
  useEffect(() => {
    const q = profQuery.trim().toLowerCase();
    if (!q) {
      setFilteredProfs([]);
      setShowProfSug(false);
      return;
    }

    const res = professores.filter(prof => prof.nome.toLowerCase().includes(q)); // <<< MUDANÇA
    setFilteredProfs(res);

    const unicoExato = res.length === 1 && res[0].nome.toLowerCase() === q;
    setShowProfSug(res.length > 0 && !unicoExato);
  }, [profQuery, professores]);

  // 4) Filtra disciplinas
  useEffect(() => {
    const q = discQuery.trim().toLowerCase();
    if (!q) {
      setFilteredDiscs([]);
      setShowDiscSug(false);
      return;
    }

    const res = disciplinas.filter(disc => disc.nome.toLowerCase().includes(q)); // <<< MUDANÇA
    setFilteredDiscs(res);

    const unicoExato = res.length === 1 && res[0].nome.toLowerCase() === q;
    setShowDiscSug(res.length > 0 && !unicoExato);
  }, [discQuery, disciplinas]);

  // 5) Fecha dropdowns ao clicar fora
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
  
  // <<< MUDANÇA: Funções de seleção agora guardam o ID e atualizam o texto do input
  function pickProf(professor: Professor) {
    setProfQuery(professor.nome); // Atualiza o texto do input
    setProfessorID(professor.id); // Guarda o ID para o envio
    setShowProfSug(false);
  }
  
  function pickDisc(disciplina: Disciplina) {
    setDiscQuery(disciplina.nome); // Atualiza o texto do input
    setDisciplinaID(disciplina.id); // Guarda o ID para o envio
    setShowDiscSug(false);
  }

  // <<< MUDANÇA: Lógica de envio corrigida
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validação corrigida para usar os IDs
    if (!usuarioID || !professorID || !disciplinaID || !texto) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await axios.post("http://localhost:3001/avaliacao", {
        usuarioID: Number(usuarioID), // Converte para número, caso seja string
        professorID,
        disciplinaID,
        conteudo: texto,
      });

      alert("Avaliação criada com sucesso!");
      onClose();
    } catch (err: any) {
      console.error("Erro ao criar avaliação:", err);
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Ocorreu um erro ao criar a avaliação.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div
        ref={containerRef}
        className="bg-white w-full max-w-2xl mx-4 p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-6">Nova Publicação</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="number" // <<< MUDANÇA: Ideal que seja number
              placeholder="ID do Usuário"
              value={usuarioID}
              onChange={e => setUsuarioID(e.target.value)}
              required
              className="bg-white w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none"
            />
          </div>
          {/* professor */}
          <div className="relative">
            <input
              type="text"
              placeholder="Nome do professor"
              value={profQuery}
              onChange={e => {
                setProfQuery(e.target.value);
                setProfessorID(null); // <<< MUDANÇA: Limpa o ID se o usuário digitar novamente
              }}
              onFocus={() =>
                profQuery && filteredProfs.length > 0 && setShowProfSug(true)
              }
              required
              className="bg-white w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none"
            />
            {showProfSug && (
              <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 max-h-40 overflow-y-auto rounded-b-lg z-50">
                {filteredProfs.map(prof => ( // <<< MUDANÇA
                  <li
                    key={prof.id} // <<< MUDANÇA: Usar ID como key
                    onClick={() => pickProf(prof)} // <<< MUDANÇA
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {prof.nome}
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
              onChange={e => {
                setDiscQuery(e.target.value);
                setDisciplinaID(null); // <<< MUDANÇA: Limpa o ID se o usuário digitar novamente
              }}
              onFocus={() =>
                discQuery && filteredDiscs.length > 0 && setShowDiscSug(true)
              }
              required
              className="bg-white w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none"
            />
            {showDiscSug && (
              <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 max-h-40 overflow-y-auto rounded-b-lg z-50">
                {filteredDiscs.map(disc => ( // <<< MUDANÇA
                  <li
                    key={disc.id} // <<< MUDANÇA: Usar ID como key
                    onClick={() => pickDisc(disc)} // <<< MUDANÇA
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {disc.nome}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <textarea
            placeholder="Escreva sua avaliação..."
            value={texto}
            onChange={e => setTexto(e.target.value)}
            required
            className="bg-white w-full h-40 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none resize-none"
          />

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