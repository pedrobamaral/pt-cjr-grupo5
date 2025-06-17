// components/Card.tsx
import Link from "next/link"

interface CardProps {
  imageSrc: string
  name: string
  discipline: string
  href?: string
}

export default function Card({ imageSrc, name, discipline, href }: CardProps) {
  const content = (
    <div className="w-full max-w-[220px] h-[280px] p-2 rounded-2xl shadow-md bg-[#FEFEFE] mx-auto">
      <img
        src={imageSrc}
        alt={name}
        className="w-[160px] h-[160px] object-cover mx-auto rounded-2xl"
      />
      <h2 className="w-full h-[30px] flex items-center justify-center font-semibold text-center mt-2">
        {name}
      </h2>
      <p className="w-full h-[30px] flex items-center justify-center text-sm text-center">
        {discipline}
      </p>
    </div>
  )
  return href ? <Link href={href}>{content}</Link> : content
}
