import {BookOpen, Building} from "lucide-react";
import Navbar from "../components/navbar";
import AvaliationBox from '../components/evaluationbox'

const mockAvaliacoes = [
  {
    title: "Avaliação 1",
    description: "Descrição da avaliação 1",
    rating: 5,
  },
  {
    title: "Avaliação 2",
    description: "Descrição da avaliação 2",
    rating: 4,
  },
  // Adicione mais avaliações conforme necessário
];

export default function Professor() {

  return(
    <div className="min-h-screen">
        <Navbar/>
        <main>
            <div className="relative">
                <div className="w-full max-w-4xl mx-auto px-4 relative">
                    <div className="bg-[#15589A] h-40 shadow-md"></div>
                    <div className="bg-white min-h-[calc(100vh)]">
                        <img src="/images/logo.png" 
                        className="absolute left-16 top-20 w-40 h-40 rounded-full"
                        alt="User Profile" />
                        <div className="pl-20 pt-23">
                            <h1 className="text-2xl font-semibold">Nome do Professor</h1>
                            <p className="flex text-gray-600 items-center pt-6"><Building className="mr-1"/>Departemento</p>
                            <p className="flex text-gray-600 items-center pt-3"><BookOpen className="mr-1"/>Materias</p>
                        </div>
                        <hr className="border-[#595652] my-6"/>
                        <h1 className="text-2xl pl-6 pb-6 font-medium">Avaliações</h1>
                        <div className="flex justify-center">
                            <div className="flex flex-col gap-6">
                                {mockAvaliacoes.map((av, i) => (
                                    <AvaliationBox studentName={''} date={''} time={''} discipline={''} teacherName={''} text={''} commentsCount={0} key={i} {...av} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
}