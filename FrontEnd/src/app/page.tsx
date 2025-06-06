"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("Form values:", values);
      // Aqui você pode implementar a lógica de autenticação
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
