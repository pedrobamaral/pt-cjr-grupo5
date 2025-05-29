export default function Home() {
  return (
    <main className="overflow-hidden">
      <div className="h-screen flex">
        {/* Lado da imagem */}
        <div className="w-[58%] h-full">
          <img
            src="images/foto-teste.jpg"
            alt="Foto-teste"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Lado do formulário */}
        <div className="w-[42%] h-full flex justify-center items-center bg-neutral-100">
          <div className="p-10 rounded-lg w-96 max-w-full">
            <h1 className="text-3xl font-semibold text-center mb-10">
              Edu <br /> Ranking
            </h1>
    <form className="form-container space-y-6">
  <div>
    <input
      type="email"
      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder-gray-400"
      placeholder="Email"
    />
  </div>

  <div>
    <input
      type="password"
      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder-gray-400"
      placeholder="Senha"
    />
  </div>

  <div className="flex gap-4">
    <button
      type="button"
      className="flex-1 bg-emerald-200 text-black py-2 rounded-xl border border-blue-900 shadow-md hover:bg-emerald-300 transition-all"
    >
      Entrar
    </button>

    <button
      type="button"
      className="flex-1 bg-emerald-200 text-black py-2 rounded-xl border border-blue-900 shadow-md hover:bg-emerald-300 transition-all"
    >
      Criar Conta
    </button>
  </div>
</form>
         
          </div>
        </div>
      </div>
    </main>
  );
}
