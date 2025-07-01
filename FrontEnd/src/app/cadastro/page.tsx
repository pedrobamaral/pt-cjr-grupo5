"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import api from "../services/api";
import { useEffect, useRef, useState } from "react";

export default function Home() {

    const [users, setUsers] = useState([])
  
    const inputName = useRef<HTMLInputElement>(null) /*useRef()*/
  
    async function getUsers() {
      const usersFromApi = await api.get('/cadastro')
  
      setUsers(usersFromApi.data)
    }

    async function createUsers() { 
      if (inputName.current) {
        await api.post('/cadastro', {
          nome: inputName.current.value
        })
      }

      /*await api.post('/cadastro', {
      nome: inputName.current.value
      }*/

      getUsers()
    }

    /*async function deleteUsers(id) {
      await api.delete(`/cadastro/${id}`)
      getUsers()
    }*/
  
    useEffect(() => {
      getUsers()
    }, [])

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      password: "",
      curso: "",
      departamento: "",
    },
    onSubmit: (values) => {
      console.log("Form values:", values);
    },
  });

  return (
    <main className="h-screen flex">
      {/* Lado da imagem */}
      <div className="w-3/7 h-full">
        <img
          src="/images/logo.png"
          alt="Imagem"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Lado do formulário */}
      <div className="w-4/7 h-full flex justify-center items-center bg-[#15589A]">
        <div className="form-container">
          <div className="mb-6">
            <h1>Cadastro do Edu-Ranking</h1>
            <h2>Cadastro</h2>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="nome">Nome: </label>
              <br></br>
              <input
                id="nome"
                type="nome"
                name="nome"
                //onChange={formik.handleChange}
                //value={formik.values.nome}
                ref={inputName}
                placeholder="Digite seu nome"
              />
            </div>
              <div>
              <label htmlFor="email">Email: </label>
              <br></br>
              <input
                id="email"
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Digite seu email"
              />
            </div>

            <div>
              <label htmlFor="password">Senha: </label>
              <br></br>
              <input
                id="password"
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Digite sua senha"
              />
            </div>
             <div>
              <label htmlFor="password">Curso: </label>
              <br></br>
              <input
                id="password"
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Digite sua senha"
              />
            </div>
            <div>
              <label htmlFor="curso">Departamento: </label>
              <br></br>
              <input
                id="curso"
                type="text"
                name="curso"
                onChange={formik.handleChange}
                value={formik.values.curso}
                placeholder="Digite seu curso"
              />
            </div>

            <div className="buttons-wrapper">
              <button type="submit">
                Entrar
              </button>
              <button type="button" onClick={() => router.push("/cadastro")}> {/*onClick={createUsers}*/}
                Criar Conta
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
