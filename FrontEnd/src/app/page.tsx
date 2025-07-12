'use client'
import { useEffect, useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { ChevronLeft, ChevronRight } from "lucide-react"

import ModalAvaliacao from "./components/modalAvaliacao"
import Navbar from "./components/navbar"
import Card from "./components/card"
import Search from "./components/search"
import ModalProf from "./components/modalProf"
import { useRouter } from "next/navigation"

type AboutType = {
  id: number;
  nome: string;
  departamento: string;
  disciplinaId: string;
  avaliacoes: string;
}

export default function Page() {
  const [professores, setProfessores] = useState<AboutType[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showAvaliacao, setShowAvaliacao] = useState(false)
  const [ordenacao, setOrdenacao] = useState("Nome")
  const [mostrarOrdenacao, setMostrarOrdenacao] = useState(false)

  const router = useRouter();

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
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

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

  function ordenarProfessores(lista: AboutType[], criterio: string) {
    switch (criterio) {
      case "Nome":
        return [...lista].sort((a, b) => a.nome.localeCompare(b.nome));
      case "Matéria":
        return [...lista].sort((a, b) => a.departamento.localeCompare(b.departamento));
      case "Recentes":
        return [...lista].sort((a, b) => b.id - a.id);
      case "Antigas":
        return [...lista].sort((a, b) => a.id - b.id);
      default:
        return lista;
    }
  }

  function paginaProfessor(id: number) {
    localStorage.setItem('profID', id.toString());
    router.push('/professor');
  }

  return (
    <main className="pt-[120px] py-[32px] px-[64px] flex flex-col gap-8">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar foto={""} />
      </div>

      <div className="flex flex-row items-center justify-between">
        <h2 className="text-2xl font-semibold">Novos Professores</h2>
        <Search placeHolder="Buscar professor(a)" />
      </div>

      <div className="grid grid-cols-4 gap-6">
        {professores.slice(0, 4).map((prof) => (
          <div
            key={prof.id}
            className="w-full max-w-[220px] h-[280px] p-2 rounded-2xl shadow-md bg-[#FEFEFE] mx-auto cursor-pointer hover:shadow-lg hover:scale-105 transition transform duration-200"
            onClick={() => paginaProfessor(prof.id)}
          >
            <img
              src="https://i.pinimg.com/736x/05/6e/bd/056ebd21a16dde6a3f299e9443607598.jpg"
              alt={prof.nome}
              className="w-[160px] h-[160px] object-cover mx-auto rounded-2xl"
            />
            <h2 className="w-full h-[30px] flex items-center justify-center font-semibold text-center mt-2">
              {prof.nome}
            </h2>
            <p className="w-full h-[30px] flex items-center justify-center text-sm text-center">
              {prof.departamento}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-8">
        <h2 className="text-2xl font-semibold">Todos os Professores</h2>

        <div className="flex gap-4 items-center relative">
          {isLoggedIn && (
            <>
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#4BA9D6] text-white px-4 py-2 rounded-[20px] hover:bg-[#16589A] transition"
              >
                Novo Professor
              </button>

              <button
                onClick={() => setShowAvaliacao(true)}
                className="bg-[#4BA9D6] text-white px-4 py-2 rounded-[20px] hover:bg-[#16589A] transition"
              >
                Nova Publicação
              </button>
            </>
          )}

          <button
            onClick={() => setMostrarOrdenacao(!mostrarOrdenacao)}
            className="bg-[#4BA9D6] text-white px-4 py-2 rounded-[20px] hover:bg-[#16589A] transition"
          >
            Ordenar
          </button>

          {mostrarOrdenacao && (
            <div className="absolute top-full right-0 mt-2 w-[140px] bg-[#C2DCF2] shadow-md rounded-xl z-10">
              {['Nome', 'Matéria', 'Recentes', 'Antigas'].map(opcao => (
                <button
                  key={opcao}
                  onClick={() => { setOrdenacao(opcao); setMostrarOrdenacao(false); }}
                  className="w-full px-4 py-2 border-b border-gray-300 hover:bg-blue-100 text-left"
                >
                  {opcao}
                </button>
              ))}
            </div>
          )}

          {showModal && <ModalProf onClose={() => setShowModal(false)} />}
          {showAvaliacao && (
            <ModalAvaliacao
              onClose={() => setShowAvaliacao(false)}
              onSubmit={(dados: { professor: string; disciplina: string; texto: string }) => {
                setShowAvaliacao(false);
              }}
            />
          )}
        </div>
      </div>

      <div className="relative px-4 mt-4">
        <div ref={sliderRef} className="keen-slider">
          {ordenarProfessores(professores, ordenacao).map((prof) => (
            <button
              key={prof.id}
              className="keen-slider__slide"
              onClick={() => paginaProfessor(prof.id)}
            >
              <div className="w-full max-w-[220px] h-[280px] p-2 rounded-2xl shadow-md bg-[#FEFEFE] mx-auto cursor-pointer hover:shadow-lg hover:scale-105 transition transform duration-200">
                <img
                  src="https://i.pinimg.com/736x/05/6e/bd/056ebd21a16dde6a3f299e9443607598.jpg"
                  alt={prof.nome}
                  className="w-[160px] h-[160px] object-cover mx-auto rounded-2xl"
                />
                <h2 className="w-full h-[30px] flex items-center justify-center font-semibold text-center mt-2">
                  {prof.nome}
                </h2>
                <p className="w-full h-[30px] flex items-center justify-center text-sm text-center">
                  {prof.departamento}
                </p>
              </div>
            </button>
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
    </main>
  )
}
