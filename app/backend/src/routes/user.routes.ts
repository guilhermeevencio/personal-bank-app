import { Router } from 'express'

const userRoutes = Router()

userRoutes.post('/login', (req, res) => res.status(201).json({ message: 'rota de login' }))

export { userRoutes }