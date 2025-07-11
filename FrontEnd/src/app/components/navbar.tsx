"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export interface AlunoProps {
  foto: string;
}

export default function Navbar({ foto }: AlunoProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    router.push("/login");
  }

  return (
    <nav className="bg-[#4BA9D6] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo clicável com cursor-pointer */}
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer hover:opacity-90 transition">
            <Image
              src="/images/logom.png"
              alt="logo"
              width={50}
              height={50}
            />
            <h1 className="text-xl font-bold">EduRanking</h1>
          </div>
        </Link>

        {isLoggedIn ? (
          <div className="flex flex-row gap-10 items-center">
            {/* Imagem de perfil com link para /perfil */}
            <Link href="/perfil">
              <img
                src={
                  foto ||
                  "https://i.pinimg.com/736x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg"
                }
                className="w-10 h-10 rounded-full object-cover cursor-pointer hover:opacity-90 transition"
                alt="User Profile"
              />
            </Link>

            {/* Botão de logout */}
            <button
              onClick={handleLogout}
              className="hover:opacity-90 transition"
            >
              <LogOut size={30} />
            </button>
          </div>
        ) : (
          <Link href="/login">
            <button className="bg-white text-[#238BBE] px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 font-semibold">
              Entrar
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
