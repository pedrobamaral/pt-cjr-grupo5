"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

type AboutType = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  departamento: string;
  curso: string;
}

export default function Home() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<AboutType[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async (values) => {
      try {
        const res = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email,
            senha: values.password
          })
        });

        if (!res.ok) throw new Error("Credenciais inválidas");
        const { token, usuario } = await res.json();

        // Salva o token
        localStorage.setItem("token", token);
        // redireciona para a página de perfil, guardando o id
        localStorage.setItem("userID", usuario.id.toString());
        router.push("/perfil");
      } catch (err: any) {
        alert(err.message);
      }
    },
  });


  useEffect(() => {
    async function fetchPerfil() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3001/perfil", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Não autorizado");
        const data = await res.json();
        setUsuario(data);
      } catch (err) {
        console.error(err);
        router.push("/login");
      }
    }
    fetchPerfil();
  }, []);
  
    function paginaUsuario(id: number){
      localStorage.setItem('userID', id.toString());
      router.push('/perfil');
    }

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
              <br></br>
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
              <br></br>
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
              {usuario.map((user) =>(
                <button type="submit" onClick={() => paginaUsuario(user.id)}>
                  Entrar
                </button>
              ))}
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
