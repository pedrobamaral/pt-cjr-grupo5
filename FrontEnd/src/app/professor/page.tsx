'use client'
import {BookOpen, Building} from "lucide-react";
import Navbar from "../components/navbar";
import EvaluationBox from "../components/evaluationbox";
import { useEffect, useState } from "react";

type Avaliacao = {
  id: number;
  conteudo: string;
  disciplina: { nome: string };
  usuario: { nome: string };
  createdAt: string;
  // adicione outros campos que você precise
};

type ProfessorFull = {
  id: number;
  nome: string;
  departamento: string;
  disciplinas: { nome: string };
  avaliacoes: Avaliacao[];
};

export default function ProfessorPage() {
  const [professor, setProfessor] = useState<ProfessorFull | null>(null);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);

  useEffect(() => {
    const profID = localStorage.getItem("profID");
    if (!profID) return;

    fetch(`http://localhost:3001/professor/${profID}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data: ProfessorFull) => {
        setProfessor(data);
        setAvaliacoes(data.avaliacoes);
      })
      .catch(err => console.error("Erro ao buscar professor:", err));
  }, []);

  if (!professor) {
    return <p className="p-4">Carregando...</p>;
  }
   
  return(
    <div className="min-h-screen">
        <Navbar foto={""}/>
        <main>
            <div className="relative">
                <div className="w-full max-w-4xl mx-auto px-4 relative">
                    <div className="bg-[#15589A] h-40 shadow-md"></div>
                    <div className="bg-white min-h-[calc(100vh)]">
                        
                        {/* Foto de perfil */}
                        <img 
                          src="/images/logo.png" 
                          className="absolute left-16 top-20 w-40 h-40 rounded-full border-white shadow-lg" 
                          alt="User Profile" 
                        />
                        {/* Informações do professor */}
                        <div className="pl-20 pt-24">
                            <h1 className="text-2xl font-semibold">
                              {professor.nome}
                            </h1>
                            
                            <p className="flex text-gray-600 items-center pt-6">
                              <Building className="mr-1" size={16}/>
                              {professor.departamento}
                              </p>
                            
                            <p className="flex text-gray-600 items-center pt-3">
                              <BookOpen className="mr-1" size={16}/>
                              {professor.disciplinas.nome}
                            </p>
                        </div>
                        
                        {/* Linha que separa as informações e publicações */}
                        <hr className="my-6 border-gray-300"/>
                        
                        <section className="flex flex-col gap-6 w-full max-w-4xl px-6">
                          <h2 className="text-2xl font-medium ">Avaliações</h2>
                            {avaliacoes.length > 0 ? (
                              <div className="flex flex-col gap-4">
                                {avaliacoes.map(av => (
                                  <EvaluationBox
                                    key={av.id}
                                    studentName={av.usuario.nome}
                                    teacherName={professor.nome}
                                    discipline={av.disciplina.nome}
                                    text={av.conteudo}
                                    date={new Date(av.createdAt).toLocaleDateString("pt-BR")}
                                    time={new Date(av.createdAt).toLocaleTimeString("pt-BR", {hour:"2-digit",minute:"2-digit"})}
                                    commentsCount={0} // ajuste se tiver comentários
                                    foto="/images/logo.png"
                                  />
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-500">Nenhuma avaliação encontrada.</p>
                            )}
                        </section> 
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
}