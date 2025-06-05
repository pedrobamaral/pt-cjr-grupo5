"use client";
import { useFormik } from "formik";

export default function Home() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("Form values:", values);
    },
  });

  return (
    <main className="h-screen flex">
      {/* Lado da imagem */}
      <div className="w-3/7 h-full"> {/* diminuir a imagem de fundo */}
        <img
          src="/images/logo.png"
          alt="Imagem"
          className="object-cover w-full h-full"
        />
      </div>

     {/* Lado do formulário */}
<div className="w-4/7 h-full flex justify-center items-center bg-[#15589A]">
  <div className="w-full max-w-[500px] px-10">
    <h1 className="text-white text-4xl font-bold mb-12 text-center">
      Avaliação de Professores
    </h1>

    <form className="flex flex-col gap-8" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-3">
        <label htmlFor="email" className="text-white font-medium text-lg">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="w-full h-16 px-6 rounded-xl border border-gray-300 bg-white 
                     focus:outline-none focus:ring-2 focus:ring-emerald-400 text-lg"
          placeholder="Digite seu email"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="password" className="text-white font-medium text-lg">
          Senha
        </label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="w-full h-16 px-6 rounded-xl border border-gray-300 bg-white 
                     focus:outline-none focus:ring-2 focus:ring-emerald-400 text-lg"
          placeholder="Digite sua senha"
        />
      </div>

     <div className="flex flex-col gap-5 pt-4">
  <div className="flex gap-4">
    <button
      type="submit"
      className="w-1/2 bg-[#9DCFD8] text-black py-5 rounded-xl border border-[#073f46] 
                shadow-md hover:bg-[#7cf0d3] transition-all font-bold text-lg"
    >
      Entrar
    </button>
    <button
      type="button"
      className="w-1/2 bg-[#9DCFD8] text-black py-5 rounded-xl border border-[#073f46] 
                shadow-md hover:bg-[#7cf0d3] transition-all font-bold text-lg"
      onClick={() => alert("Criar conta")}
    >
      Criar Conta
    </button>
  </div>
</div>

    </form>
  </div>
</div>
    </main>
  );
}
