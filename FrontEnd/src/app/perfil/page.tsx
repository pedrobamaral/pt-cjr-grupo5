"use client";
import { useEffect, useRef } from 'react';
import React from 'react';
import Navbar from '../components/navbar';
import { Mail, Building} from 'lucide-react';
import { useState } from 'react';
import EvaluationBox from '../components/evaluationbox';
import api from '../services/api'


// Mock data for avaliações
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

export default function Perfil() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="min-h-screen">
      <Navbar foto={''} />
      <main>
          <div className="relative">
            <div className="w-full max-w-4xl mx-auto px-4 relative">
                <div className="bg-[#15589A] h-40 shadow-md"></div>
                <div className="bg-white min-h-[calc(100vh)]">
                    {/* Foto de perfil */}
                    <img src="/images/logo.png" 
                    className="absolute left-16 top-20 w-40 h-40 rounded-full" 
                    alt="User Profile" />
                    {/* Informações do usuário */}
                    <div className="pl-20 pt-23">
                        <h1 className="text-2xl font-semibold">Nome do Usuário</h1>
                        <p className="flex text-gray-600 items-center pt-6"><Building className="mr-1"/>Matéria/Departamento</p>
                        <p className="flex text-gray-600 items-center pt-3"><Mail className="mr-1"/> Email do Usuário</p>
                    </div>
                    {/* Botões que só o usuário pode ver logado*/}
                    {isLoggedIn && (
                        <button className="absolute right-16 top-50 bg-green-400 text-white h-12 w-30 rounded">
                            Editar Perfil
                        </button>
                     )}
                     {isLoggedIn && (
                        <button className="absolute right-16 top-67 bg-red-400 text-white h-12 w-30 rounded">
                            Excluir Perfil
                        </button>

                     )}

                    {/* linha que separa as informações e publicações */}
                    <hr className="my-6 border-[#595652]"/>

                    <h1 className="text-2xl pl-6 pb-6 font-medium">Publicações</h1>

                    <div className='flex justify-center'>
                      {/* Lista de avaliações */}
                      <section className="flex flex-col gap-6">
                        {mockAvaliacoes.map((av, i) => (
                          <EvaluationBox foto={''} studentName={''} date={''} time={''} discipline={''} teacherName={''} text={''} commentsCount={0} key={i} {...av} />
                        ))}
                      </section>
                    </div>
                </div> 
            </div>
          </div>
      </main>
    </div>
  );
}
