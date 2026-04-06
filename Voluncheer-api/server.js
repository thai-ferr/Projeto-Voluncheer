import express from 'express'
import cors from 'cors' // Importe o cors
import basicRoutes from './routes/basicRoutes.js' 
import userRoutes from './routes/userRoutes.js'

const app = express()

app.use(cors()) // Libera o acesso para o seu front-end
app.use(express.json())

const PORT = process.env.PORT || 3000 // Garante que rode na 3000 se não houver .env

app.use(basicRoutes)
app.use(userRoutes)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
