import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

app.post('/cadastro', async (req, res) => {

    await prisma.usuario.create({
        data: {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            departamento: req.body.departamento,
            curso: req.body.curso,
            foto_perfil: req.body.foto_perfil
        }
    })

    res.status(201).json(req.body)

})

app.get('/cadastro', async (req, res) => {

    const users = await prisma.usuario.findMany()

    res.status(200).json(users)
})

app.put('/cadastro/:id', async (req, res) => {

    const id = parseInt(req.params.id);

    await prisma.usuario.update({
        where: {
            id: id
        },
        data: {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            departamento: req.body.departamento,
            curso: req.body.curso,
            foto_perfil: req.body.foto_perfil
        }
    })
})

app.delete('/cadastro/:id', async (req, res) => {
    
    const id = parseInt(req.params.id);

    await prisma.usuario.delete({
        where: {
            id: id
        }
    })

    res.status(200).json({message: 'Usuario deletado com sucesso!'})
})


app.listen(3000)