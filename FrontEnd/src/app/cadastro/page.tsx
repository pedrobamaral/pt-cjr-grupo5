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
      <div className="w-3/7 h-full ">
        <img
          src="/images/logo_main.jpeg"
          alt="Imagem"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Lado do formulário */}
      <div
        className="w-4/7 h-full flex justify-center items-center"
        style={{ backgroundColor: "#FEDD7C" }}
      >
        <div
          className="form-container"
          style={{
            borderRadius: "59px",
            background: "#FEDD7C",
            boxShadow: "25px 20px 50px #b3b3b3, -25px -15px 50px #ffffff",
            padding: "2rem 2.5rem",
          }}
        >
          <div className="mb-4">
            <div className="flex items-center justify-center gap-2">
              {/*<img
                src="/images/logo-alegria.png"
                alt="Logo Alegria"
                className="w-28 h-auto"
              /> */}
            </div>
            <p className="text-black text-3xl font-bold flex justify-center">
              Cadastro
            </p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="nome">
                {" "}
                <p className="text-black mb-0"> Nome: </p>{" "}
              </label>
              <input
                id="nome"
                type="text"
                name="nome"
                onChange={formik.handleChange}
                value={formik.values.nome}
                placeholder="Digite seu nome"
                className="w-150 py-2 px-3 rounded border border-gray-800 placeholder:text-base"
              />
            </div>
            <div>
              <label htmlFor="email">
                {" "}
                <p className="text-black mb-2 gap-0"> Email: </p>{" "}
              </label>
              <input
                id="email"
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Digite seu email"
                className="w-150 py-2 px-3 rounded border border-gray-300 placeholder:text-base"
              />
            </div>
            <div>
              <label htmlFor="password">
                {" "}
                <p className="text-black mt-0"> Senha: </p>{" "}
              </label>
              <input
                id="password"
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Digite sua senha"
                className="w-150 py-2 px-3 rounded border border-gray-300 placeholder:text-base"
              />
            </div>
            <div>
              <label htmlFor="curso">
                {" "}
                <p className="text-black mt-0"> Curso: </p>{" "}
              </label>
              <input
                id="curso"
                type="text"
                name="curso"
                onChange={formik.handleChange}
                value={formik.values.curso}
                placeholder="Digite seu curso"
                className="w-150 py-2 px-3 rounded border border-gray-300 placeholder:text-base"
              />
            </div>
            <div>
              <label htmlFor="departamento">
                {" "}
                <p className="text-black mt-0"> Departamento: </p>{" "}
              </label>
              <input
                id="departamento"
                type="text"
                name="departamento"
                onChange={formik.handleChange}
                value={formik.values.departamento}
                placeholder="Digite seu departamento"
                className="w-150 py-2 px-3 rounded border border-gray-300 placeholder:text-base"
              />
            </div>
            <div className="buttons-wrapper">
              <button type="submit">Entrar</button>
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
