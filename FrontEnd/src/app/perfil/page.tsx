'use client'
import {BookOpen, Building} from "lucide-react";
import Navbar from "../components/navbar";
import EvaluationBox from "../components/evaluationbox";
import { useEffect, useState } from "react";

type Avaliacao = {
  id: number;
  conteudo: string;
  disciplina: { nome: string };
  professor: { nome: string };
  createdAt: string;
};

type Usuario = {
  id: number;
  nome: string;
  email: string;
  departamento: string;
  curso: string;
  foto_perfil: string;
  avaliacoes?: Avaliacao[];
};

export default function PerfilPage() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    if (!userID) return;

    // Buscar dados do usuário
    fetch(`http://localhost:3001/usuario/${userID}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data: Usuario) => {
        setUsuario(data);
      })
      .catch(err => console.error("Erro ao buscar usuário:", err));

    // Buscar avaliações do usuário
    fetch(`http://localhost:3001/avaliacao/usuario/${userID}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data: Avaliacao[]) => {
        setAvaliacoes(data);
      })
      .catch(err => console.error("Erro ao buscar avaliações:", err));
  }, []);

  if (!usuario) {
    return <p className="p-4">Carregando...</p>;
  }
   
  return(
    <div className="min-h-screen">
        <Navbar foto={usuario.foto_perfil || ""}/>
        <main>
            <div className="relative">
                <div className="w-full max-w-4xl mx-auto px-4 relative">
                    <div className="bg-[#15589A] h-40 shadow-md"></div>
                    <div className="bg-white min-h-[calc(100vh)]">
                        
                        {/* Foto de perfil */}
                        <img 
                          src={usuario.foto_perfil || "https://i.pinimg.com/736x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg"} 
                          className="absolute left-16 top-20 w-40 h-40 rounded-full border-white shadow-lg" 
                          alt="User Profile" 
                        />
                        
                        {/* Botões de ação */}
                        <div className="absolute right-16 top-45 flex flex-col gap-4">
                          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                            Editar Perfil
                          </button>
                          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                            Excluir Perfil
                          </button>
                        </div>

                        {/* Informações do usuário */}
                        <div className="pl-20 pt-24">
                            <h1 className="text-2xl font-semibold">
                              {usuario.nome}
                            </h1>
                            
                            <p className="flex text-gray-600 items-center pt-6">
                              <Building className="mr-1" size={16}/>
                              {usuario.departamento} — {usuario.curso}
                            </p>
                            
                            <p className="flex text-gray-600 items-center pt-3">
                              <BookOpen className="mr-1" size={16}/>
                              {usuario.email}
                            </p>
                        </div>
                        
                        {/* Linha que separa as informações e publicações */}
                        <hr className="my-6 border-gray-300"/>
                        
                        <section className="flex flex-col gap-6 w-full max-w-4xl px-6">
                          <h2 className="text-2xl font-medium ">Publicações</h2>
                            {avaliacoes.length > 0 ? (
                              <div className="flex flex-col gap-4">
                                {avaliacoes.map(av => (
                                  <EvaluationBox
                                    key={av.id}
                                    studentName={usuario.nome}
                                    teacherName={av.professor.nome}
                                    discipline={av.disciplina.nome}
                                    text={av.conteudo}
                                    date={new Date(av.createdAt).toLocaleDateString("pt-BR")}
                                    time={new Date(av.createdAt).toLocaleTimeString("pt-BR", {hour:"2-digit",minute:"2-digit"})}
                                    commentsCount={0} // ajuste se tiver comentários
                                    foto={usuario.foto_perfil}
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

