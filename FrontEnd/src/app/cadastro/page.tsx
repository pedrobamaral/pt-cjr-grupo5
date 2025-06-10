"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      password: "",
      curso: "",
      departamento: "",
    },
    onSubmit: (values) => {
      console.log("Form values:", values);
    },
  });

  return (
    <div className="flex h-full w-full">
      {/* Lado da imagem */}
      <div className="w-3/7 h-full">
        <img
          src="/images/logo.png"
          alt="Imagem"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Lado do formulário */}
      <div className="w-4/7 h-full flex justify-center items-center bg-">
        <div className="form-container">
          <div className="mb-4">
            <img 
              src="/images/logo-alegria.png" 
              alt="Logo Alegria" 
              className="w-20 h-auto"
            />
            <h2> <p className="text-black">Cadastro</p></h2>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="nome"> <p className="text-black mb-0"> Nome: </p> </label>
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
              <label htmlFor="email"> <p className="text-black mb-2 gap-0"> Email: </p> </label>
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
              <label htmlFor="password"> <p className="text-black mt-0"> Senha: </p> </label>
              <input
                id="password"
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Digite sua senha"
              />
            </div>
            <div>
              <label htmlFor="curso"> <p className="text-black mt-0"> Curso: </p> </label>
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
              <label htmlFor="departamento"> <p className="text-black mt-0"> Departamento: </p> </label>
              <input
                id="departamento"
                type="text"
                name="departamento"
                onChange={formik.handleChange}
                value={formik.values.departamento}
                placeholder="Digite seu departamento"
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
    </div>
  );
}
