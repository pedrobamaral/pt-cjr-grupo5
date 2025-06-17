import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-[#4BA9D6] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image
            src="/images/logom.png"
            alt="logo"
            width={50}
            height={50}
          />
          <h1 className="text-xl font-bold">EduRanking</h1>
        </div>

        <Link href="/login">
          <button className="bg-white text-[#238BBE] px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 font-semibold">
            Entrar
          </button>
        </Link>
      </div>
    </nav>
  );
}