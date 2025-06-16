'use client'

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import Navbar from "./components/navbar";
import Card from "./components/card";
import Search from "./components/search";

function CarouselWithArrows() {
  const [currentSlide, setCurrentSlide] = useState(0)
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
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
  })

  const cards = [
    {
      name: "Mayara Marques",
      imageSrc: "https://i.pinimg.com/736x/05/6e/bd/056ebd21a16dde6a3f299e9443607598.jpg",
      discipline: "Software.",
    },
    {
      name: "Arthur Mendes",
      imageSrc: "https://i.pinimg.com/736x/05/6e/bd/056ebd21a16dde6a3f299e9443607598.jpg",
      discipline: "Software.",
    },
    {
      name: "Arthur Fernandes",
      imageSrc: "https://i.pinimg.com/736x/05/6e/bd/056ebd21a16dde6a3f299e9443607598.jpg",
      discipline: "Software.",
    },
    {
      name: "Pedro Amaral",
      imageSrc: "https://i.pinimg.com/736x/05/6e/bd/056ebd21a16dde6a3f299e9443607598.jpg",
      discipline: "Software.",
    },
    {
      name: "Mais um exemplo",
      imageSrc: "https://i.pinimg.com/736x/05/6e/bd/056ebd21a16dde6a3f299e9443607598.jpg",
      discipline: "Outra disciplina",
    },
    {
      name: "Mais um exemplo",
      imageSrc: "https://i.pinimg.com/736x/05/6e/bd/056ebd21a16dde6a3f299e9443607598.jpg",
      discipline: "Outra disciplina",
    },
    {
      name: "Mais um exemplo",
      imageSrc: "https://i.pinimg.com/736x/05/6e/bd/056ebd21a16dde6a3f299e9443607598.jpg",
      discipline: "Outra disciplina",
    },
    {
      name: "Mais um exemplo",
      imageSrc: "https://i.pinimg.com/736x/05/6e/bd/056ebd21a16dde6a3f299e9443607598.jpg",
      discipline: "Outra disciplina",
    },
    {
      name: "Mais um exemplo",
      imageSrc: "https://i.pinimg.com/736x/05/6e/bd/056ebd21a16dde6a3f299e9443607598.jpg",
      discipline: "Outra disciplina",
    },
    {
      name: "Mais um exemplo",
      imageSrc: "https://i.pinimg.com/736x/05/6e/bd/056ebd21a16dde6a3f299e9443607598.jpg",
      discipline: "Outra disciplina",
    },
  ]

  return (
    <div className="relative px-4">

      <div ref={sliderRef} className="keen-slider pl">
        {cards.map((card, index) => (
          <div key={index} className="keen-slider__slide">
            <Card
              imageSrc={card.imageSrc}
              name={card.name}
              discipline={card.discipline}
              href="/#"
            />
          </div>
        ))}
      </div>

      {cards.length > 4 && (
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
  )
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="relative">
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        <main className="pt-[120px] py-[32px] px-[64px] flex flex-col gap-8">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold">Novos Professores</h2>
            <Search placeHolder="Buscar professor(a)" />
          </div>

          <div className="grid grid-cols-4 gap-6">
            <Card
              name="Mais Atual"
              discipline="matema"
              imageSrc="https://i.pinimg.com/736x/05/6e/bd/056ebd21a16dde6a3f299e9443607598.jpg"
              href="/#"
            />
            <Card
              name="Ante-penúltimo"
              discipline="matema"
              imageSrc="https://i.pinimg.com/736x/05/6e/bd/056ebd21a16dde6a3f299e9443607598.jpg"
              href="/#"
            />
            <Card
              name="Penultimo"
              discipline="matema"
              imageSrc="https://i.pinimg.com/736x/05/6e/bd/056ebd21a16dde6a3f299e9443607598.jpg"
              href="/#"
            />
            <Card
              name="Último"
              discipline="matema"
              imageSrc="https://i.pinimg.com/736x/05/6e/bd/056ebd21a16dde6a3f299e9443607598.jpg"
              href="/#"
            />
          </div>

          <div className="flex flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold">Todos os Professores</h2>
          </div>

          <CarouselWithArrows />
          {children}
        </main>
      </body>
    </html>
  );
}
