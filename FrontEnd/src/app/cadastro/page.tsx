export default function Cadastro() {
  return (
    <main className="h-screen flex items-center justify-center bg-[#ffffff]">
      <div className="w-full max-w-[700px] bg-white rounded-xl p-100 shadow-lg">
        <div className="flex flex-col items-center justify-center mb-8">
          <img src="/images/logo_main.jpeg" alt="Logo" className="w-1/2 mb-2" />
          <h1 className="text-3xl font-bold text-[#90CAF9] text-center">
            Criar Conta
          </h1>
        </div>
        <form className="flex flex-col gap-6"> 
          <input
            type="text"
            placeholder="Nome"
            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button
            type="submit"
            className="w-full bg-[#9DCFD8] text-black py-3 rounded-lg border border-[#073f46] 
                      shadow-md hover:bg-[#7cf0d3] transition-all font-bold"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </main>
  );
}
