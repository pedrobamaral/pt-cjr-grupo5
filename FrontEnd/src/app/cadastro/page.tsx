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
        await cadastrar(
          values.nome,
          values.email,
          values.password,
          values.curso,
          values.departamento
        );
        alert("Cadastro realizado com sucesso!");
        router.push("/login");
      } catch (err: any) {
        setError(err?.message || "Erro ao realizar o cadastro");
      }
    },
  });

  return (
    <div className="flex h-screen w-screen">
      {/* Lado da imagem */}
      <div className="w-1/2 flex items-center justify-center bg-[#F8F8F8]">
        <img
          src="/images/logoCadastro.png"
          alt="Logo EduRanking"
          className="w-[1000px] max-w-[100%] h-auto object-contain"
        />
      </div>

      {/* Lado do formulário */}
      <div className="w-1/2 flex items-center justify-center bg-[#A0DCFF]">
        <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-lg mx-6">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
            Cadastro Usuário
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              onChange={formik.handleChange}
              value={formik.values.nome}
              className="w-full py-2 px-4 rounded border border-gray-300 placeholder:text-gray-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="w-full py-2 px-4 rounded border border-gray-300 placeholder:text-gray-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="w-full py-2 px-4 rounded border border-gray-300 placeholder:text-gray-400"
            />
            <input
              type="text"
              name="curso"
              placeholder="Curso"
              onChange={formik.handleChange}
              value={formik.values.curso}
              className="w-full py-2 px-4 rounded border border-gray-300 placeholder:text-gray-400"
            />
            <input
              type="text"
              name="departamento"
              placeholder="Departamento"
              onChange={formik.handleChange}
              value={formik.values.departamento}
              className="w-full py-2 px-4 rounded border border-gray-300 placeholder:text-gray-400"
            />

            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-300 hover:bg-green-400 text-black font-semibold rounded mt-2"
            >
              Criar Conta
            </button>
          </form>

          {error && (
            <p className="text-red-600 text-center mt-4">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
