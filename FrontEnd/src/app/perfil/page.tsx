"use client";
import { useEffect, useState } from "react";
import { Mail, Building } from "lucide-react";
import Navbar from "../components/navbar";
import EvaluationBox from "../components/evaluationbox";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  departamento: string;
  curso: string;
}

interface Avaliacao {
  id: number;
  studentName: string;
  teacherName: string;
  date: string;
  time: string;
  discipline: string;
  text: string;
  commentsCount: number;
}

export default function PerfilPage() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadingAvaliacoes, setIsLoadingAvaliacoes] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>("");

  useEffect(() => {
    // Buscar dados do usuário do localStorage ou contexto
    const userID = localStorage.getItem("userID");
    
    if (userID) {
      const usuarioMock: Usuario = {
        id: parseInt(userID),
        nome: "Camilo",
        email: "camilo@gmail.com",
        departamento: "CJR",
        curso: "BOPE"
      };
      
      setUsuario(usuarioMock);
      setIsLoaded(true);
      fetchAvaliacoes(parseInt(userID));
    } else {
      const usuarioMock: Usuario = {
        id: 1,
        nome: "Camilo",
        email: "camilo@gmail.com",
        departamento: "CJR",
        curso: "BOPE"
      };
      
      setUsuario(usuarioMock);
      setIsLoaded(true);
      fetchAvaliacoes(1);
    }
  }, []);

  const fetchAvaliacoes = async (usuarioId: number) => {
    setIsLoadingAvaliacoes(true);
    
    try {
      // Testar diferentes URLs possíveis
      const possibleUrls = [
        `http://localhost:3000/avaliacao/usuario/${usuarioId}`,
        `http://localhost:3001/avaliacao/usuario/${usuarioId}`,
        `http://localhost:5000/avaliacao/usuario/${usuarioId}`,
        `http://localhost:8080/avaliacao/usuario/${usuarioId}`
      ];

      let success = false;
      let lastError = "";

      for (const url of possibleUrls) {
        try {
          setDebugInfo(prev => prev + `\nTentando URL: ${url}`);
          
          const response = await fetch(url);
          setDebugInfo(prev => prev + `\nStatus: ${response.status}`);
          
          if (response.ok) {
            const data = await response.json();
            setDebugInfo(prev => prev + `\nDados recebidos: ${JSON.stringify(data, null, 2)}`);
            
            if (Array.isArray(data) && data.length > 0) {
              setAvaliacoes(data);
              success = true;
              break;
            } else {
              setDebugInfo(prev => prev + `\nArray vazio ou não é array`);
            }
          } else {
            setDebugInfo(prev => prev + `\nErro HTTP: ${response.status} - ${response.statusText}`);
          }
        } catch (error) {
          lastError = error instanceof Error ? error.message : String(error);
          setDebugInfo(prev => prev + `\nErro na URL ${url}: ${lastError}`);
        }
      }

      if (!success) {
        setDebugInfo(prev => prev + `\nNenhuma URL funcionou. Último erro: ${lastError}`);
        
        // Fallback: tentar buscar todas as avaliações e filtrar
        try {
          const response = await fetch('http://localhost:3000/avaliacao');
          if (response.ok) {
            const allAvaliacoes = await response.json();
            setDebugInfo(prev => prev + `\nTodas as avaliações: ${JSON.stringify(allAvaliacoes, null, 2)}`);
            
            // Filtrar por usuário manualmente
            const userAvaliacoes = allAvaliacoes.filter((av: any) => av.usuarioID === usuarioId);
            setDebugInfo(prev => prev + `\nAvaliações filtradas: ${JSON.stringify(userAvaliacoes, null, 2)}`);
            
            if (userAvaliacoes.length > 0) {
              // Converter para o formato esperado
              const formattedAvaliacoes = userAvaliacoes.map((av: any) => ({
                id: av.id,
                studentName: "Camilo", // Nome do usuário
                teacherName: "Professor", // Placeholder
                discipline: "Disciplina", // Placeholder
                text: av.conteudo,
                date: new Date(av.createdAt).toLocaleDateString('pt-BR'),
                time: new Date(av.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                commentsCount: 0
              }));
              
              setAvaliacoes(formattedAvaliacoes);
              setDebugInfo(prev => prev + `\nAvaliações formatadas: ${JSON.stringify(formattedAvaliacoes, null, 2)}`);
            }
          }
        } catch (fallbackError) {
          setDebugInfo(prev => prev + `\nErro no fallback: ${fallbackError}`);
        }
      }
    } catch (error) {
      setDebugInfo(prev => prev + `\nErro geral: ${error}`);
    } finally {
      setIsLoadingAvaliacoes(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Carregando perfil…</p>
      </div>
    );
  }

  if (!usuario) return null;

  return (
    <div className="min-h-screen">
      <Navbar foto={""} />

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
              
              {/* Informações do usuário */}
              <div className="pl-20 pt-24">
                <h1 className="text-2xl font-semibold">{usuario.nome}</h1>
                <p className="flex text-gray-600 items-center pt-6">
                  <Building className="mr-1" size={16} />
                  {usuario.departamento} — {usuario.curso}
                </p>
                <p className="flex text-gray-600 items-center pt-3">
                  <Mail className="mr-1" size={16} />
                  {usuario.email}
                </p>
              </div>
              
              {/* Botões que só o usuário pode ver logado */}
              {isLoggedIn && (
                <>
                  <button className="absolute right-16 top-50 bg-green-400 text-white h-12 px-6 rounded hover:bg-green-500 transition-colors">
                    Editar Perfil
                  </button>
                  <button className="absolute right-16 top-70 bg-red-400 text-white h-12 px-6 rounded hover:bg-red-500 transition-colors">
                    Excluir Perfil
                  </button>
                </>
              )}

              {/* Linha que separa as informações e publicações */}
              <hr className="my-6 border-gray-300"/>

              <h1 className="text-2xl pl-6 pb-6 font-medium">Publicações</h1>

              <div className='flex justify-center'>
                {/* Lista de avaliações */}
                <section className="flex flex-col gap-6 w-full max-w-4xl px-6">
                  {isLoadingAvaliacoes ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4BA9D6] mx-auto"></div>
                      <p className="mt-4 text-gray-600">Carregando avaliações...</p>
                    </div>
                  ) : avaliacoes.length > 0 ? (
                    avaliacoes.map((av) => (
                      <EvaluationBox 
                        key={av.id} 
                        studentName={av.studentName}
                        date={av.date}
                        time={av.time}
                        discipline={av.discipline}
                        teacherName={av.teacherName}
                        text={av.text}
                        commentsCount={av.commentsCount}
                        foto="/images/logo.png" 
                      />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600">Nenhuma avaliação encontrada.</p>
                      <p className="text-gray-500 text-sm mt-2">
                        Crie sua primeira avaliação no feed principal!
                      </p>
                    </div>
                  )}
                </section>
              </div>
            </div> 
          </div>
        </div>
      </main>
    </div>
  );
}

