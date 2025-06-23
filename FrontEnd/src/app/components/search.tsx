"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

interface CardProps {
  placeHolder: string;
}

export default function Search({ placeHolder }: CardProps) {
  const [query, setQuery] = useState("");
  const [professores, setProfessores] = useState<string[]>([]);
  const [filtered, setFiltered] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProfessores() {
      try {
        const response = await fetch("http://localhost:3001/professor");
        if (!response.ok) throw new Error("Erro ao buscar professores");
        const data = await response.json();

        const nomes = data.map((prof: any) => prof.nome);
        setProfessores(nomes);
      } catch (error) {
        console.error("Erro ao buscar professores:", error);
      }
    }

    fetchProfessores();
  }, []);

  // filtra os nomes dos professores conforme o input
  useEffect(() => {
    if (query.trim() === "") {
      setFiltered([]);
      setShowSuggestions(false);
    } else {
      const lower = query.toLowerCase();
      const result = professores.filter((nome) =>
        nome.toLowerCase().includes(lower)
      );
      setFiltered(result);
      setShowSuggestions(result.length > 0);
    }
  }, [query, professores]);

  // fecha sugestões se clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // formata URL
  const formatUrl = (text: string) => {
    return `/search/${text.toLowerCase().replace(/\s+/g, '-')}`;
  };

  return (
    <div className="relative w-auto" ref={containerRef}>
      <div className="flex items-center gap-3 px-4 rounded-[20px] bg-white w-full h-[50px] shrink-0 shadow">
        <img
          src="/images/lupa.svg"
          alt="lupa"
          className="w-[25px] h-[25px] shrink-0"
        />
        <input
          type="text"
          placeholder={placeHolder}
          className="w-full outline-none text-gray-800 placeholder-gray-400 bg-transparent"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && filtered.length > 0 && setShowSuggestions(true)}
        />
      </div>

      {showSuggestions && (
        <div className="absolute top-[40px] left-0 w-full bg-white border border-gray-200 rounded-b-[10px] shadow z-10 max-h-[200px] overflow-y-auto">
          {filtered.map((s, i) => (
            <Link
              key={i}
              href={formatUrl(s)}
              onClick={() => setShowSuggestions(false)}
              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {s}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
