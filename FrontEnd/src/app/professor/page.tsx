'use client'
import {BookOpen, Building} from "lucide-react";
import Navbar from "../components/navbar";
import EvaluationBox from "../components/evaluationbox";
import { useEffect, useState } from "react";


export default function Professor() {

  const [professor, setProfessor] = useState<any>([]);

  useEffect(() => {
      getProfessor();
    }, []);

  async function getProfessor(){
    const profID = localStorage.getItem("profID");
    if(!profID){
      console.error("professor não encontrado");
      setProfessor([]);
      return;
    } 
    try {
      const resposta = await fetch(`http://localhost:3001/professor/${profID}`);
      if(resposta.ok){
        const data = await resposta.json();
        setProfessor(data);
        console.log(data);
      } else {
        console.error("Erro ao busca o professor: ${resposta.status}");
      }
    } catch {
      console.error("Erro ao buscar o professor:");
    }
  }
   
  return(
    <div className="min-h-screen">
        <Navbar foto={""}/>
        <main>
            <div className="relative">
                <div className="w-full max-w-4xl mx-auto px-4 relative">
                    <div className="bg-[#15589A] h-40 shadow-md"></div>
                    <div className="bg-white min-h-[calc(100vh)]">
                        <img src="/images/logo.png" 
                        className="absolute left-16 top-20 w-40 h-40 rounded-full"
                        alt="User Profile" />
                        <div className="pl-20 pt-23">
                            <h1 className="text-2xl font-semibold">{professor.nome}</h1>
                            <p className="flex text-gray-600 items-center pt-6"><Building className="mr-1"/>{professor.departamento}</p>
                            <p className="flex text-gray-600 items-center pt-3"><BookOpen className="mr-1"/>{professor.disciplinas}</p>
                        </div>
                        <hr className="border-[#595652] my-6"/>
                        <h1 className="text-2xl pl-6 pb-6 font-medium">Avaliações</h1>
                        <div className="flex justify-center">
                            <div className="flex flex-col gap-6">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
}