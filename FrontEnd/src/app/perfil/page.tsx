"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Building, Mail } from "lucide-react";
import EvaluationBox from "../components/evaluationbox";
import Navbar from "../components/navbar";

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
  const router = useRouter();

  // Carrega usuário real da API
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userID");
    if (!token || !userID) {
      router.push('/login');
      return;
    }

    fetch(`http://localhost:3001/usuario/${userID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Não autorizado');
        return res.json();
      })
      .then((data: Usuario) => {
        setUsuario(data);
        setIsLoaded(true);
        fetchAvaliacoes(data.id);
      })
      .catch(err => {
        console.error(err);
        router.push('/login');
      });
  }, []);

  // src/app/…/perfil/page.tsx  (ou onde você faça o fetch)

const fetchAvaliacoes = async (usuarioId: number) => {
  try {
    const res = await fetch(`http://localhost:3001/avaliacao/usuario/${usuarioId}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json() as Array<{
      id: number;
      conteudo: string;
      createdAt: string;
      usuario:    { nome: string };
      professor:  { nome: string };
      disciplina: { nome: string };
      comentarios: any[];
    }>;

    const formatted = data.map(av => ({
      id: av.id,
      studentName:   av.usuario.nome,
      teacherName:   av.professor.nome,
      discipline:    av.disciplina.nome,
      text:          av.conteudo,
      date:          new Date(av.createdAt).toLocaleDateString("pt-BR"),
      time:          new Date(av.createdAt).toLocaleTimeString("pt-BR", {
                       hour: "2-digit", minute: "2-digit"
                     }),
      commentsCount: av.comentarios.length,
    }));

    setAvaliacoes(formatted);

  } catch (err) {
    console.error("Erro ao buscar avaliações:", err);
  }
};



  if (!isLoaded) return <p className="text-center mt-8">Carregando perfil…</p>;
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

