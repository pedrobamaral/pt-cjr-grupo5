"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect  } from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export interface AlunoProps{
  foto: string;
}

export default function Navbar({
  foto,
}: AlunoProps) {

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router = useRouter();

  // Verifica se o token existe no localStorage ao carregar o componente
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Logout
  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <nav className="bg-[#4BA9D6] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/app">
          <button>
            <div className="flex items-center space-x-2">
              <Image
                src="/images/logom.png"
                alt="logo"
                width={50}
                height={50}
              />
              <h1 className="text-xl font-bold">EduRanking</h1>
            </div>
          </button>
        </Link>
        {isLoggedIn ? (
          <div className="flex flex-row gap-10">
            <Link href="/perfil">
              <img src={foto || "https://i.pinimg.com/736x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg"}
              className="w-17 h-17 rounded-full" 
              alt="User Profile" />
            </Link>
            <button onClick={handleLogout}>
              <LogOut size={30}/>
            </button>
          </div>
        ):(
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