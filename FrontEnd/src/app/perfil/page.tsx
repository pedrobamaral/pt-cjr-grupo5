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
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userID");
    if (!token || !userID) {
      router.push("/login");
      return;
    }

    fetch(`http://localhost:3001/api/perfil/${userID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Não autorizado");
        return res.json();
      })
      .then((data: Usuario) => {
        setUsuario(data);
        // Aqui você poderia buscar também as avaliações reais do usuário:
        // return fetch(`http://localhost:3001/perfil/${userID}/avaliacoes`, { headers: { Authorization: `Bearer ${token}` } })
        // Ou, enquanto não vem do backend, usar dados mock:
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
        <div className="w-full max-w-4xl mx-auto px-4 pt-28 relative">
          {/* Banner */}
          <div className="bg-[#15589A] h-40 shadow-md"></div>

          {/* Card branco */}
          <div className="bg-white relative pt-24 pb-12 px-8 rounded-t-xl">
            {/* Foto */}
            <img
              src="/images/logo.png"
              className="absolute left-8 top-[-4rem] w-40 h-40 rounded-full border-4 border-white"
              alt="avatar"
            />

            {/* Dados do usuário */}
            <div className="ml-52">
              <h1 className="text-2xl font-semibold">{usuario.nome}</h1>
              <p className="flex items-center text-gray-600 mt-2">
                <Building className="mr-1" />
                {usuario.departamento} — {usuario.curso}
              </p>
              <p className="flex items-center text-gray-600 mt-1">
                <Mail className="mr-1" />
                {usuario.email}
              </p>
            </div>

            {/* Botões editar/excluir */}
            <div className="absolute right-8 top-8 flex gap-2">
              <button className="bg-green-400 text-white px-4 py-2 rounded-full hover:opacity-90">
                Editar
              </button>
              <button className="bg-red-400 text-white px-4 py-2 rounded-full hover:opacity-90">
                Excluir
              </button>
            </div>
          </div>

          {/* Publicações */}
          <section className="mt-8">
            <h2 className="text-2xl font-medium mb-4">Publicações</h2>
            <div className="flex flex-col gap-6">
              {avaliacoes.map((av, i) => (
                <EvaluationBox key={i} {...av} foto={""} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
