import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

app.post('/professor', async (req, res) => {

    await prisma.professor.create({
        data: {
            nome: req.body.nome,
            departamento: req.body.departamento,
            disciplinas: req.body.disciplinas
        }
    })

    res.status(201).json(req.body)

})

app.get('/professor', async (req, res) => {

    const users = await prisma.professor.findMany()

    res.status(200).json(users)
})

app.put('/professor/:id', async (req, res) => {

    const id = parseInt(req.params.id);

    await prisma.professor.update({
        where: {
            id: id
        },
        data: {
            nome: req.body.nome,
            departamento: req.body.departamento,
            disciplinas: req.body.disciplinas
        }
    })
})

app.delete('/professor/:id', async (req, res) => {
    
    const id = parseInt(req.params.id);

    await prisma.professor.delete({
        where: {
            id: id
        }
    })

    res.status(200).json({message: 'Usuario deletado com sucesso!'})
})


app.listen(3000)