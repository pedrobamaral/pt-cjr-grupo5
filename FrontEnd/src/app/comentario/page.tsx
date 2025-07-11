"use client";

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import ModalComentario from "../components/modalComentario";
import { FiEdit2, FiTrash2, FiMessageCircle } from "react-icons/fi";

interface Resposta {
  id: string;
  autor: string;
  conteudo: string;
  criadoEm: string;
}

interface Comentario {
  id: string;
  autor: string;
  conteudo: string;
  professor: string;
  criadoEm: string;
  respostas: Resposta[];
}

export default function ComentarioPage() {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [respostaModalAberto, setRespostaModalAberto] = useState<string | null>(null);
  const [edicaoModalAberto, setEdicaoModalAberto] = useState<string | null>(null);
  const [textoEdicao, setTextoEdicao] = useState("");
  const [comentarioModalAberto, setComentarioModalAberto] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [usuarioAtual, setUsuarioAtual] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const usuario = localStorage.getItem("usuario");
    setUsuarioAtual(usuario || "");

    const buscarComentarios = async () => {
      try {
        setCarregando(true);
        const resposta = await fetch("http://localhost:3001/avaliacao");
        if (!resposta.ok) throw new Error(`HTTP error! status: ${resposta.status}`);
        const dados = await resposta.json();
        if (Array.isArray(dados)) setComentarios(dados);
      } catch (error) {
        console.error("Erro ao buscar comentários:", error);
        setErro("Falha ao carregar comentários");
      } finally {
        setCarregando(false);
      }
    };

    buscarComentarios();
  }, []);

  const formikComentario = useFormik({
    initialValues: {
      usuarioID: 1,
      professorID: 1,
      disciplinaID: 1,
      conteudo: ""
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        setCarregando(true);
        const res = await fetch("http://localhost:3001/avaliacao", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        });

        const resposta = await res.text();

        if (!res.ok) {
          throw new Error(`Falha ao publicar comentário: ${res.status} - ${resposta}`);
        }

        const novoComentario = JSON.parse(resposta);
        setComentarios(prev => [novoComentario, ...prev]);
        resetForm();
        setComentarioModalAberto(false);
        setErro("");
      } catch (error: any) {
        console.error("Erro ao publicar comentário:", error);
        setErro(error.message || "Erro ao publicar comentário.");
      } finally {
        setCarregando(false);
      }
    },
  });

  const formikResposta = useFormik({
    initialValues: {
      usuarioID: 1,
      conteudo: "",
      avaliacaoID: ""
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        setCarregando(true);
        const res = await fetch("http://localhost:3001/resposta", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...values,
            avaliacaoID: respostaModalAberto
          })
        });

        if (!res.ok) throw new Error(`Erro ao responder comentário: ${res.status}`);
        const dadosAtualizados = await fetch("http://localhost:3001/avaliacao").then(r => r.json());
        setComentarios(dadosAtualizados);
        setRespostaModalAberto(null);
        resetForm();
      } catch (error: any) {
        console.error(error);
        setErro(error.message || "Erro ao responder comentário.");
      } finally {
        setCarregando(false);
      }
    }
  });

  const handleExcluirComentario = async (id: string) => {
    try {
      setCarregando(true);
      await fetch(`http://localhost:3001/avaliacao/${id}`, {
        method: "DELETE"
      });

      const dadosAtualizados = await fetch("http://localhost:3001/avaliacao").then(r => r.json());
      setComentarios(dadosAtualizados);
    } catch (error: any) {
      console.error("Erro ao excluir comentário:", error);
      setErro(error.message || "Erro ao excluir comentário");
    } finally {
      setCarregando(false);
    }
  };

  const formatarData = (dataString: string) => {
    if (!dataString) return "";
    const data = new Date(dataString);
    if (isNaN(data.getTime())) return "";

    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');

    return `${dia}/${mes}/${ano}, às ${horas}:${minutos}`;
  };

  if (!isClient) {
    return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;
  }

  return (
    <main className="flex flex-col min-h-screen bg-gray-100">
      <Navbar foto="/avatar1.png" />

      <div className="px-6 mt-4">
        <button className="text-3xl">←</button>
      </div>

      {erro && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 mt-4">
          <span>{erro}</span>
        </div>
      )}

      <div className="flex-1 flex flex-col px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Comentários</h1>
          <button
            onClick={() => setComentarioModalAberto(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Novo Comentário
          </button>
        </div>

        {comentarios.map((comentario) => (
          <div key={comentario.id} className="mb-6">
            <div className="flex gap-3 mb-2">
              <img src="/avatar1.png" className="w-10 h-10 rounded-full mt-1" alt="avatar" />
              <div className="relative bg-[#34f4a0] rounded-3xl px-5 py-4 shadow-md w-full">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-bold">
                    {comentario.autor}
                    <span className="text-gray-700 font-normal"> • {formatarData(comentario.criadoEm)} • {comentario.professor} • Surf</span>
                  </p>
                  {usuarioAtual === comentario.autor && (
                    <div className="flex gap-2">
                      <button onClick={() => {
                        setEdicaoModalAberto(comentario.id);
                        setTextoEdicao(comentario.conteudo);
                      }}>
                        <FiEdit2 />
                      </button>
                      <button onClick={() => handleExcluirComentario(comentario.id)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  )}
                </div>
                <p className="mt-2 text-sm">{comentario.conteudo}</p>
                <div
                  className="mt-3 text-sm text-black flex items-center gap-1 cursor-pointer"
                  onClick={() => setRespostaModalAberto(comentario.id)}
                >
                  <FiMessageCircle />
                  {(comentario.respostas?.length ?? 0)} comentário{(comentario.respostas?.length ?? 0) !== 1 ? "s" : ""}
                </div>
                {respostaModalAberto === comentario.id && (
                  <form onSubmit={formikResposta.handleSubmit} className="mt-3">
                    <textarea
                      name="conteudo"
                      onChange={formikResposta.handleChange}
                      value={formikResposta.values.conteudo}
                      className="w-full border rounded px-3 py-2 text-sm"
                      placeholder="Digite sua resposta"
                    />
                    <div className="flex justify-end mt-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          formikResposta.resetForm();
                          setRespostaModalAberto(null);
                        }}
                        className="text-sm text-gray-600"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                      >
                        Responder
                      </button>
                    </div>
                  </form>
                )}
                <div className="absolute left-10 -bottom-3 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[#34f4a0]" />
              </div>
            </div>

            {(comentario.respostas ?? []).map((resposta) => (
              <div key={resposta.id} className="flex gap-3 ml-14 mt-3">
                <img src="/avatar2.png" className="w-8 h-8 rounded-full mt-1" alt="avatar" />
                <div className="relative bg-[#34f4a0] rounded-3xl px-4 py-3 w-full shadow">
                  <p className="text-sm font-bold">
                    {resposta.autor}
                    <span className="text-gray-700 font-normal"> • {formatarData(resposta.criadoEm)}</span>
                  </p>
                  <p className="text-sm mt-1">{resposta.conteudo}</p>
                  <div className="absolute left-10 -top-3 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-[#34f4a0]" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <ModalComentario
        isOpen={comentarioModalAberto}
        onClose={() => setComentarioModalAberto(false)}
        title="Novo Comentário"
      >
        <form onSubmit={formikComentario.handleSubmit} className="space-y-4">
          <textarea
            name="conteudo"
            onChange={formikComentario.handleChange}
            value={formikComentario.values.conteudo}
            className="w-full border rounded px-3 py-2"
            placeholder="Seu comentário"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
          >
            Publicar
          </button>
        </form>
      </ModalComentario>
    </main>
  );
}
