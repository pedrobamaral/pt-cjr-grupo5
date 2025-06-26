// components/EvaluationBox.tsx
import { MessageCircle } from 'lucide-react';
import { Edit, Trash2 } from 'lucide-react';

export interface EvaluationProps {
  studentName: string;
  date: string;       
  time: string;       
  discipline: string; 
  teacherName: string; 
  text: string;
  commentsCount: number;
}

export default function EvaluationBox({
  studentName,
  date,
  time,
  discipline,
  teacherName,
  text,
  commentsCount,
}: EvaluationProps) {
  return (
    <div className="bg-[#15589A] rounded-2xl h-60 w-205 flex flex-col justify-between p-4">
  {/* Header */}
  <div className="flex flex-row">
    <img
      src="/images/logo.png"
      alt="Avatar do aluno"
      className="w-16 h-16 rounded-full"
    />
    <div className="text-sm ml-4 mt-4">
      <span className="text-white font-semibold">Arthur Mendes Borges</span>{" "}
      <span className="text-white">
        • 25/06/2025, às 18:53 • Bernadini • Calculo 1
      </span>
    </div>
  </div>

  {/* Texto da avaliação - flex-1 e rolagem interna */}
  <div className="flex-1 overflow-y-auto mt-4 text-white text-sm">
    <p>
      O Bernadini é com certeza um dos melhores professores de Cálculo, senão o melhor que eu conheço, explica muito bem o conteúdo, é bastante paciente e educado com aqueles que tem dificuldade de entender o conteúdo, as provas deles são muito justas e coerentes com o conteúdo dado e passado em sala de aula, além dele disponibilizar as provas dos semestres passados, para poder ter uma ótima base de estudo para fazer uma prova bem mais tranquilo e calmo. Por fim, ele da mais chances de ganhar pontos, dando ponto extra com atividades interativas e divertidas, que animam e enguajam o aluno mais na matéria 
    </p>
  </div>

  {/* Rodapé fixado no final do card */}
  <div className="flex flex-row justify-between items-center text-white mt-2">
    <div className="flex flex-row gap-2">
      <MessageCircle size={20} />
      <span>{commentsCount} comentário{commentsCount !== 1 ? "s" : ""}</span>
    </div>
    <div className="flex flex-row gap-2">
      <Edit size={20} />
      <Trash2 size={20} />
    </div>
  </div>
</div>

  );
}
