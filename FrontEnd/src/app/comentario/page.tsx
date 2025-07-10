"use client";

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Modal from "../components/modalComentario";

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
  const usuarioAtual = typeof window !== "undefined" ? localStorage.getItem("usuario") : "";

  useEffect(() => {
    fetch("http://localhost:3001/avaliacao")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setComentarios(data))
      .catch(console.error);
  }, []);

  const formikComentario = useFormik({
    initialValues: { autor: "", conteudo: "", professor: "" },
    onSubmit: async (values, { resetForm }) => {
      const res = await fetch("http://localhost:3001/avaliacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        const novo = await res.json();
        setComentarios([novo, ...comentarios]);
        resetForm();
        setComentarioModalAberto(false);
      }
    },
  });

  const formikResposta = useFormik({
    initialValues: { comentarioId: "", autor: "", conteudo: "" },
    onSubmit: async (values, { resetForm }) => {
      await fetch("http://localhost:3001/avaliacao/resposta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const atualizados = await fetch("http://localhost:3001/avaliacao").then((r) => r.json());
      setComentarios(atualizados);
      resetForm();
      setRespostaModalAberto(null);
    },
  });

  async function handleExcluirComentario(id: string) {
    await fetch(`http://localhost:3001/avaliacao/${id}`, { method: "DELETE" });
    const atualizados = await fetch("http://localhost:3001/avaliacao").then((r) => r.json());
    setComentarios(atualizados);
  }

  async function handleEditarComentario(id: string) {
    await fetch(`http://localhost:3001/avaliacao/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conteudo: textoEdicao }),
    });
    const atualizados = await fetch("http://localhost:3001/avaliacao").then((r) => r.json());
    setComentarios(atualizados);
    setEdicaoModalAberto(null);
  }

  function formatarData(dataString: string) {
    const data = new Date(dataString);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    
    return `${dia}/${mes}/${ano}, às ${horas}:${minutos}`;
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar foto="/avatar1.png" />
      <div className="flex flex-1 bg-[#eeeeee]">
        <div className="w-[80px] bg-[#eeeeee] flex items-start justify-center pt-6">
          <button className="text-2xl">⬅</button>
        </div>
        <div className="flex-1 bg-white px-4 py-6 overflow-y-auto">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setComentarioModalAberto(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Novo Comentário
            </button>
          </div>

          {comentarios.map((comentario) => (
            <div key={comentario.id} className="bg-white p-4 rounded-xl mb-6 border border-gray-200">
              <div className="flex items-start gap-3 mb-2">
                <img src="/avatar1.png" alt="Avatar" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <p className="font-bold">{comentario.autor}</p>
                    <span className="text-gray-500 text-sm">- {formatarData(comentario.criadoEm)} - {comentario.professor} - Surf</span>
                  </div>
                  <p className="text-md mt-1">{comentario.conteudo}</p>
                  
                  <div className="mt-2">
                    <button
                      onClick={() => setRespostaModalAberto(comentario.id)}
                      className="text-sm text-gray-500"
                    >
                      {comentario.respostas.length} comentários
                    </button>
                  </div>

                  {/* Respostas */}
                  {comentario.respostas.length > 0 && (
                    <div className="mt-3 pl-4 border-l-2 border-gray-200">
                      {comentario.respostas.map((resposta) => (
                        <div key={resposta.id} className="mb-3">
                          <div className="flex items-center gap-1">
                            <p className="font-bold text-sm">{resposta.autor}</p>
                            <span className="text-gray-500 text-xs">- {formatarData(resposta.criadoEm)}</span>
                          </div>
                          <p className="text-sm mt-1">{resposta.conteudo}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {usuarioAtual === comentario.autor && (
                  <div className="flex gap-3 text-black">
                    <button
                      onClick={() => {
                        setEdicaoModalAberto(comentario.id);
                        setTextoEdicao(comentario.conteudo);
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => handleExcluirComentario(comentario.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      🗑️
                    </button>
                  </div>
                )}
              </div>

              {/* MODAL RESPOSTA */}
              <Modal
                isOpen={respostaModalAberto === comentario.id}
                onClose={() => {
                  setRespostaModalAberto(null);
                  formikResposta.resetForm();
                }}
              >
                <h2 className="text-xl font-bold mb-3">Responder comentário</h2>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await formikResposta.setFieldValue("comentarioId", comentario.id);
                    await formikResposta.handleSubmit();
                  }}
                  className="space-y-3"
                >
                  <input
                    type="text"
                    name="autor"
                    placeholder="Seu nome"
                    onChange={formikResposta.handleChange}
                    value={formikResposta.values.autor}
                    className="border rounded w-full px-3 py-2"
                    required
                  />
                  <input
                    type="text"
                    name="conteudo"
                    placeholder="Sua resposta"
                    onChange={formikResposta.handleChange}
                    value={formikResposta.values.conteudo}
                    className="border rounded w-full px-3 py-2"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Enviar resposta
                  </button>
                </form>
              </Modal>

              {/* MODAL EDIÇÃO */}
              <Modal isOpen={edicaoModalAberto === comentario.id} onClose={() => setEdicaoModalAberto(null)}>
                <h2 className="text-xl font-bold mb-3">Editar comentário</h2>
                <textarea
                  value={textoEdicao}
                  onChange={(e) => setTextoEdicao(e.target.value)}
                  className="border w-full rounded p-2"
                  rows={4}
                />
                <button
                  onClick={() => handleEditarComentario(comentario.id)}
                  className="bg-green-600 text-white mt-3 px-4 py-2 rounded"
                >
                  Salvar edição
                </button>
              </Modal>
            </div>
          ))}
        </div>
        <div className="w-[80px] bg-[#eeeeee]"></div>
      </div>

      {/* MODAL COMENTÁRIO */}
      <Modal isOpen={comentarioModalAberto} onClose={() => setComentarioModalAberto(false)}>
        <h2 className="text-xl font-bold mb-3">Novo Comentário</h2>
        <form onSubmit={formikComentario.handleSubmit} className="space-y-3">
          <input
            type="text"
            name="autor"
            placeholder="Seu nome"
            onChange={formikComentario.handleChange}
            value={formikComentario.values.autor}
            className="border rounded w-full px-3 py-2"
            required
          />
          <input
            type="text"
            name="professor"
            placeholder="Nome do professor"
            onChange={formikComentario.handleChange}
            value={formikComentario.values.professor}
            className="border rounded w-full px-3 py-2"
            required
          />
          <textarea
            name="conteudo"
            placeholder="Comentário"
            onChange={formikComentario.handleChange}
            value={formikComentario.values.conteudo}
            className="border rounded w-full px-3 py-2 h-24"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Comentar
          </button>
        </form>
      </Modal>
    </main>
  );
}