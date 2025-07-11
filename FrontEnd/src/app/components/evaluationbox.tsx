"use client";
import { MessageCircle } from 'lucide-react';
import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

export interface EvaluationProps {
  studentName: string;
  date: string;       
  time: string;       
  discipline: string; 
  teacherName: string; 
  text: string;
  commentsCount: number;
  foto: string;
}
// ele nao deixa usar o userState

export default function EvaluationBox({
  studentName,
  date,
  time,
  discipline,
  teacherName,
  text,
  commentsCount,
  foto,
}: EvaluationProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <div className="bg-[#15589A] rounded-2xl h-60 w-205 flex flex-col justify-between p-4">
  {/* Header */}
  <div className="flex flex-row">
    <img
      src={foto}
      alt="Avatar do aluno"
      className="w-16 h-16 rounded-full"
    />
    <div className="text-sm ml-4 mt-4">
      <span className="text-white font-semibold">{studentName}</span>{" "}
      <span className="text-white">
        • {date}, às {time} •{teacherName}• {discipline}
      </span>
    </div>
  </div>

  {/* Texto da avaliação - flex-1 e rolagem interna */}
  <div className="flex-1 overflow-y-auto mt-4 text-white text-sm">
    <p>
      {text}
    </p>
  </div>

  {/* Rodapé fixado no final do card */}
  <div className="flex flex-row justify-between items-center text-white mt-2">
    <div className="flex flex-row gap-2">
      <MessageCircle size={20} />
      <span>{commentsCount} comentário{commentsCount !== 1 ? "s" : ""}</span>
    </div>
    {isLoggedIn && (
      <div className="flex flex-row gap-2">
        <button>
          <Edit size={20}/>
        </button>
        <button>
          <Trash2 size={20}/>
        </button>
      </div>
    )}
  </div>
</div>

  );
}
