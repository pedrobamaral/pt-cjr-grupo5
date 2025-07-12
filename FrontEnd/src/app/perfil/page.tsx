"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";
import { Mail, Building } from "lucide-react";
import EvaluationBox from "../components/evaluationbox";

type Usuario = {
  id: number;
  nome: string;
  email: string;
  departamento: string;
  curso: string;
};

type Avaliacao = {
  studentName: string;
  teacherName: string;
  date: string;
  time: string;
  discipline: string;
  text: string;
  commentsCount: number;
};

export default function PerfilPage() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userID");
    console.log("token", token);
    console.log("userID", userID);
    if (!token || !userID) {
      console.log("Não encontrado", token, userID);
      return;
    }

    fetch(`http://localhost:3001/usuario/${userID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Não autorizado");
        return res.json();
      })
      .then((data: Usuario) => {
        setUsuario(data);
        const mock: Avaliacao[] = [
          {
            studentName: "João Silva",
            teacherName: data.nome,
            date: "25/06/2025",
            time: "18:53",
            discipline: "Cálculo 1",
            text:
              "Excelente professor, explica muito bem os conceitos e motiva a turma.",
            commentsCount: 2,
          },
          {
            studentName: "Maria Souza",
            teacherName: data.nome,
            date: "24/06/2025",
            time: "14:20",
            discipline: "Cálculo 1",
            text: "Muito claro nas explicações e paciente com dúvidas.",
            commentsCount: 1,
          },
        ];
        setAvaliacoes(mock);
      })
      .catch(() => {
        router.push("/login");
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, [router]);

  if (!isLoaded) return <p className="p-8">Carregando perfil…</p>;
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
                    <img src="/images/logo.png" 
                    className="absolute left-16 top-20 w-40 h-40 rounded-full" 
                    alt="User Profile" />
                    {/* Informações do usuário */}
                    <div className="pl-20 pt-23">
                        <h1 className="text-2xl font-semibold">{usuario.nome}</h1>
                        <p className="flex text-gray-600 items-center pt-6"><Building className="mr-1"/>{usuario.departamento} — {usuario.curso}</p>
                        <p className="flex text-gray-600 items-center pt-3"><Mail className="mr-1"/>{usuario.email}</p>
                    </div>
                    {/* Botões que só o usuário pode ver logado*/}
                    {isLoggedIn && (
                        <button className="absolute right-16 top-50 bg-green-400 text-white h-12 w-30 rounded">
                            Editar Perfil
                        </button>
                     )}
                     {isLoggedIn && (
                        <button className="absolute right-16 top-67 bg-red-400 text-white h-12 w-30 rounded">
                            Excluir Perfil
                        </button>

                     )}

                    {/* linha que separa as informações e publicações */}
                    <hr className="my-6 border-[#595652]"/>

                    <h1 className="text-2xl pl-6 pb-6 font-medium">Publicações</h1>

                    <div className='flex justify-center'>
                      {/* Lista de avaliações */}
                      <section className="flex flex-col gap-6">
                      {avaliacoes.map((av, i) => (
                        <EvaluationBox key={i} {...av} foto={"/images/logo.png"} />
                      ))}
                      </section>
                    </div>
                </div> 
            </div>
          </div>
      </main>
    </div>
  );
}
