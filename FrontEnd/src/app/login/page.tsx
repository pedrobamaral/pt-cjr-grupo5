"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { login } from "../services/authService"; 
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async (values) => {
      // 1) chama o backend
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email, senha: values.password }),
      });
      if (!res.ok) {
        alert("Credenciais inválidas");
        return;
      }
      const { token, usuario } = await res.json();
      // 2) salva token e ID
      localStorage.setItem("token", token);
      localStorage.setItem("userID", usuario.id.toString());
      // 3) redireciona para perfil
      router.push("/perfil");
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
            <h1>Edu Ranking</h1>
            <h2>Avaliação de Professores</h2>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="email">Email: </label>
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
              <label htmlFor="password">Senha: </label>
              <br />
              <input
                id="password"
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Digite sua senha"
              />
            </div>

            <div className="buttons-wrapper">
              <button type="submit">
                Entrar
              </button>
              <button type="button" onClick={() => router.push("/cadastro")}>
                Criar Conta
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
