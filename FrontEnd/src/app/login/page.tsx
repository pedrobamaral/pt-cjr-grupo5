"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async (values) => {
      setError("");
      try {
        const res = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: values.email, password: values.password }),
        });

        if (!res.ok) {
          setError("Credenciais inválidas");
          return;
        }

        const { access_token, usuario } = await res.json();
        console.log("usuario", usuario);
        console.log("token", access_token);
        console.log("userId", usuario.id.toString());
        localStorage.setItem("token", access_token);
        localStorage.setItem("userID", usuario.id.toString());
        router.push("/perfil");
      } catch (err) {
        setError("Erro ao conectar com o servidor.");
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
      {/* Lado da logo */}
      <div className="absolute left-0 w-1/2 h-full flex items-center justify-center">
        <img
          src="/images/logo_main.jpeg"
          alt="Logo EduRanking"
          className="w-[500px] max-w-[90%] h-auto object-contain"
        />
      </div>

      {/* Lado do formulário */}
      <div className="absolute right-0 w-1/2 h-full flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-lg mx-6">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
            Avaliação de Professores
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <input
              id="email"
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Email"
              className="w-full py-2 px-4 rounded border border-gray-300 placeholder:text-gray-400"
            />

            <input
              id="password"
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Senha"
              className="w-full py-2 px-4 rounded border border-gray-300 placeholder:text-gray-400"
            />

            <div className="flex gap-4 mt-2">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#A0DCFF] hover:bg-[#89cfff] text-black font-semibold rounded"
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={() => router.push("/cadastro")}
                className="w-full py-2 px-4 bg-[#A0DCFF] hover:bg-[#89cfff] text-black font-semibold rounded"
              >
                Criar Conta
              </button>
            </div>
          </form>

          {error && (
            <p className="text-red-600 text-center mt-4">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
