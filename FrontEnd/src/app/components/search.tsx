"use client"

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface CardProps {
  placeHolder: string;
}

const MOCK_SUGESTOES = [
  "Mayara Marques",
  "Arthur Mendes",
  "Arhur Fernandes",
  "Pedro Amaral",
  "Mais Atual",
  "Ante-penúltimo",
  "Penultimo",
  "Último"
];

export default function Search({ placeHolder }: CardProps) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim() === "") {
      setFiltered([]);
      setShowSuggestions(false);
    } else {
      const lower = query.toLowerCase();
      const result = MOCK_SUGESTOES.filter(s =>
        s.toLowerCase().includes(lower)
      );
      setFiltered(result);
      setShowSuggestions(result.length > 0);
    }
  }, [query]);

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

  // formata url com base no nome da sugestão
  const formatUrl = (text: string) => {
    return `/search/${text.toLowerCase().replace(/\s+/g, '-')}`;
  };

  return (
    <div className="relative w-[500px]" ref={containerRef}>
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
