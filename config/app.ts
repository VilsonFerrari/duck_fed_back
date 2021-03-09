import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 8000

// Configs
app.set('port', PORT)

// Middleware
app.use(express.json())
app.use(cors())

export default app
