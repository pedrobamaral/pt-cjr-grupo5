'use client'

import { useEffect, useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { ChevronLeft, ChevronRight } from "lucide-react"

import Navbar from "./components/navbar"
import Card from "./components/card"
import Search from "./components/search"
import Modal from "./components/modal"

type AboutType = {
  id: number;
  nome: string;
  departamento: string;
  disciplinaId: string;
  avaliacoes: string;
}

export default function Page() {
  const [professores, setProfessores] = useState<AboutType[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false) 
  const [selectedProfessor, setSelectedProfessor] = useState<AboutType | null>(null)
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    slides: {
      perView: 4,
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 3, spacing: 15 },
      },
      "(max-width: 768px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(max-width: 640px)": {
        slides: { perView: 1, spacing: 5 },
      },
    },
  })

  useEffect(() => {
    async function fetchProfessores() {
      try {
        const response = await fetch("http://localhost:3001/professor")
        if (!response.ok) throw new Error("Erro na resposta");
        const data = await response.json()
        setProfessores(data)
      } catch (error) {
        console.error("Erro ao buscar professores:", error)
      }
    }
    fetchProfessores()
  }, [])

  // Função para abrir o modal com os dados do professor
  const handleOpenModal = (professor: AboutType) => {
    setSelectedProfessor(professor)
    setIsModalOpen(true)
  }

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProfessor(null) // Limpa o professor selecionado ao fechar
  }

  return (
    <main className="pt-[120px] py-[32px] px-[64px] flex flex-col gap-8">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="flex flex-row items-center justify-between">
        <h2 className="text-2xl font-semibold">Novos Professores</h2>
        <Search placeHolder="Buscar professor(a)" />
      </div>

      <div className="grid grid-cols-4 gap-6">
        {professores.slice(0, 4).map((prof) => (
          <div
            key={prof.id}
            onClick={() => handleOpenModal(prof)}
            className="cursor-pointer"
          >
            <Card
              name={prof.nome}
              departament={prof.departamento}
              imageSrc="https://i.pinimg.com/736x/05/6e/bd/056ebd21a16dde6a3f299e9443607598.jpg"
              href="#"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-row items-center justify-between mt-8">
        <h2 className="text-2xl font-semibold">Todos os Professores</h2>
      </div>

      <div className="relative px-4 mt-4">
        <div ref={sliderRef} className="keen-slider">
          {professores.map((prof) => (
            <div
              key={prof.id}
              className="keen-slider__slide cursor-pointer" 
              onClick={() => handleOpenModal(prof)} 
            >
              <Card
                imageSrc="https://i.pinimg.com/736x/05/6e/bd/056ebd21a16dde6a3f299e9443607598.jpg"
                name={prof.nome}
                departament={prof.departamento}
                href="#"
              />
            </div>
          ))}
        </div>

        {professores.length > 4 && (
          <>
            <button
              onClick={() => instanceRef.current?.prev()}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => instanceRef.current?.next()}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
            >
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedProfessor ? (
          <div>
            <h3 className="text-xl font-bold mb-2">{selectedProfessor.nome}</h3>
            <p className="text-gray-700">Departamento: {selectedProfessor.departamento}</p>
            {/* adicionar mais detalhes aqui, como avaliações, etc. */}
            {selectedProfessor.avaliacoes && (
                <p className="mt-2 text-gray-600">Avaliações: {selectedProfessor.avaliacoes}</p>
            )}
            {/* Adicione outras informações do professor conforme necessário */}
          </div>
        ) : (
          <p>Nenhum professor selecionado.</p>
        )}
      </Modal>
    </main>
  )
}
