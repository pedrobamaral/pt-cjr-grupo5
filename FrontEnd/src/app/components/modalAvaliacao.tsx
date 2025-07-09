// components/ModalAvaliacao.tsx
"use client";

import { useState, FormEvent } from "react";

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
  const [professor, setProfessor] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [texto, setTexto] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({ professor, disciplina, texto });
    // limpa e fecha
    setProfessor("");
    setDisciplina("");
    setTexto("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl mx-4 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">
          Nova Publicação
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Nome do Professor */}
          <input
            type="text"
            placeholder="Nome do professor"
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
            required
            className="bg-white w-full h-12 px-4 rounded-lg border border-gray-300 focus:ring-0"
          />

          {/* Disciplina */}
          <input
            type="text"
            placeholder="Disciplina"
            value={disciplina}
            onChange={(e) => setDisciplina(e.target.value)}
            required
            className="bg-white w-full h-12 px-4 rounded-lg border border-gray-300 focus:ring-0"
          />

          {/* Texto da Avaliação */}
          <textarea
            placeholder="Escreva sua avaliação..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
            className="bg-white w-full h-40 px-4 py-3 rounded-lg resize-none border border-gray-300 focus:ring-0 overflow-y-auto"
          />

          {/* Botões */}
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
              className="px-4 py-2 bg-[#4BA9D6] text-white rounded-full hover:bg-[#4baad6a9]"
            >
              Avaliar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
