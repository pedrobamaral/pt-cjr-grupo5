"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cadastrar } from "../services/authService";

export default function CadastroPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      password: "",
      curso: "",
      departamento: "",
    },
    onSubmit: async (values) => {
      setError("");
      try {
        await cadastrar(values.nome, values.email, values.password, values.curso, values.departamento);
        alert("Cadastro realizado com sucesso!");
        router.push("/login"); // redireciona para login
      } catch (err: any) {
        setError(err?.message || "Erro ao realizar o cadastro");
      }
    },
  });

  return (
    <main className="h-screen flex">
      {/* Lado da imagem */}
      <div className="w-3/7 h-full">
        <img
          src="/images/logo.png"
          alt="Imagem"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Lado do formulário */}
      <div className="w-4/7 h-full flex justify-center items-center bg-[#15589A]">
        <div className="form-container">
          <div className="mb-6">
            <h1>Cadastro do Edu-Ranking</h1>
            <h2>Cadastro</h2>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="nome">Nome:</label>
              <br />
              <input
                id="nome"
                type="text"
                name="nome"
                onChange={formik.handleChange}
                value={formik.values.nome}
                placeholder="Digite seu nome"
              />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <br />
              <input
                id="email"
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Digite seu email"
              />
            </div>

            <div>
              <label htmlFor="password">password:</label>
              <br />
              <input
                id="password"
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Digite sua password"
              />
            </div>

            <div>
              <label htmlFor="curso">Curso:</label>
              <br />
              <input
                id="curso"
                type="text"
                name="curso"
                onChange={formik.handleChange}
                value={formik.values.curso}
                placeholder="Digite seu curso"
              />
            </div>

            <div>
              <label htmlFor="departamento">Departamento:</label>
              <br />
              <input
                id="departamento"
                type="text"
                name="departamento"
                onChange={formik.handleChange}
                value={formik.values.departamento}
                placeholder="Digite seu departamento"
              />
            </div>

            {/* Mensagem de erro */}
            {error && (
              <div className="text-red-500 mt-2">
                {error}
              </div>
            )}

            <div className="buttons-wrapper">
              <button type="submit">Cadastrar</button>
              <button type="button" onClick={() => router.push("/login")}>
                Já tenho conta
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
