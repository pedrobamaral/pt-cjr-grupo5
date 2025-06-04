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
      alert(`Email: ${values.email}\nSenha: ${values.password}`);
    },
  });

  return (
    <main className="h-screen flex">
      {/* Lado da imagem */}
      <div className="w-2/5 h-full">
        <img
          src="/images/logo.png"
          alt="Imagem"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Lado do formulário */}
      <div className="w-3/5 h-full flex justify-center items-center bg-[#15589A]">
        <div className="w-[350px]">
         { /*<img
            src="/images/logo.png"
            alt="Logo"
            className="mx-auto mb-6 max-w-[96px] h-auto object-contain"
          />
         */}
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 mb-4"
            />

            <input
              type="password"
              name="password"
              placeholder="Senha"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-[#9DCFD8] text-black py-2 rounded-xl border border-[#073f46] shadow-md hover:bg-[#7cf0d3] transition-all"
              >
                Entrar
              </button>

              <button
                type="button"
                className="flex-1 bg-[#9DCFD8] text-black py-2 rounded-xl border border-[#073f46] shadow-md hover:bg-[#7cf0d3] transition-all"
                onClick={() => alert("Criar conta")}
              >
                Criar Conta
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
