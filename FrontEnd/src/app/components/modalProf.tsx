import React, { useState, ChangeEvent, FormEvent } from "react"

type ModalProfProps = {
  onClose: () => void
}

export default function ModalProf({ onClose }: ModalProfProps) {
  const [nome, setNome] = useState("")
  const [disciplina, setDisciplina] = useState("")
  const [foto, setFoto] = useState<File | null>(null)

  const handleFotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFoto(e.target.files[0])
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!nome || !disciplina) {
      alert("Preencha todos os campos obrigatórios.")
      return
    }

    // Aqui você pode montar o FormData e fazer uma chamada à API
    console.log("Criando professor:", { nome, disciplina, foto })

    // Fechar modal depois de enviar (ou após resposta da API)
    onClose()
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl mx-4 p-8 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">Criar Novo Professor</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome do Professor"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-2"
          />

          <input
            type="text"
            placeholder="Disciplina"
            value={disciplina}
            onChange={(e) => setDisciplina(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-2"
          />

          <label className="block text-sm font-medium text-gray-700">URL foto do professor</label>
            <input
              type="url"
              name="imageSrc"
              placeholder="https://exemplo.com/foto.jpg"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />

          {foto && (
            <div className="text-sm text-gray-600">
              Foto selecionada: <span className="font-medium">{foto.name}</span>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#4BA9D6] text-white rounded-full hover:bg-[#16589A]"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}