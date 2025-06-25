"use client";
import React from 'react';
import Navbar from '../components/navbar';
import { Mail, Building} from 'lucide-react';

export default function Perfil() {

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
          <div className="relative">
            <div className="w-[50%] mx-auto relative">
                <div className="bg-[#15589A] h-40">
                
                </div>
                <div className="bg-white min-h-[calc(100vh)]">
                    <img src="/images/logo.png" 
                    className="absolute left-16 top-20 w-40 h-40 rounded-full border-" 
                    alt="User Profile" />
                    <div className="pl-20 pt-23">
                        <h1 className="text-2xl font-semibold">Nome do Usuário</h1>
                        <p className="flex text-gray-600 items-center pt-6"><Building className="mr-1"/>Departamento</p>
                        <p className="flex text-gray-600 items-center pt-3"><Mail className="mr-1"/> Email do Usuário</p>
                    </div>
                </div>    
                
            </div>
          </div>
      </main>
    </div>
  );
}
