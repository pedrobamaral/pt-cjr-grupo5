"use client";
import { MessageCircle, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface EvaluationBoxProps {
  studentName: string;
  date: string;
  time: string;
  discipline: string;
  teacherName: string;
  text: string;
  commentsCount: number;
  foto?: string;
}

export default function EvaluationBox({
  studentName,
  date,
  time,
  discipline,
  teacherName,
  text,
  commentsCount,
  foto,
}: EvaluationBoxProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <div className="bg-[#3480A3] rounded-2xl h-60 w-full max-w-4xl flex flex-col justify-between p-4">
      {/* header */}
      <div className="flex flex-row">
        <img
          src={foto || "https://i.pinimg.com/736x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg"}
          alt="Avatar do aluno"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="text-sm ml-4 mt-4">
          <span className="text-white font-semibold">{studentName}</span>{" "}
          <span className="text-white">
            • {date}, às {time} • {teacherName} • {discipline}
          </span>
        </div>
      </div>

      {/* texto da avaliação - flex-1 e rolagem interna */}
      <div className="flex-1 overflow-y-auto mt-4 text-white text-sm">
        <p>
          {text}
        </p>
      </div>

      {/* odapé fixado no final do card */}
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

