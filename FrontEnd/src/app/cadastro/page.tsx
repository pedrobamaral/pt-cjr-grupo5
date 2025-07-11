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
    <div
      className="relative h-screen w-screen overflow-hidden flex items-center justify-center"
      style={{
        background: "linear-gradient(to right, #ffffff 45%, #A0DCFF 85%, #5DB2E8 100%)",
      }}
    >
      {/* Container da logo */}
      <div className="absolute left-0 w-1/2 h-full flex items-center justify-center">
        <img
          src="/images/logo_main.jpeg"
          alt="Logo EduRanking"
          className="w-[500px] max-w-[90%] h-auto object-contain"
        />
      </div>

      {/* Container do formulário */}
      <div className="absolute right-0 w-1/2 h-full flex items-center justify-center">
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
              className="w-full py-2 px-4 bg-[#A0DCFF] hover:bg-[#89cfff] text-black font-semibold rounded mt-2"
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