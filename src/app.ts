import express from "express"
import route from "./routes/routes.js"
import cors from 'cors'
const app = express()


app.use(cors({
    origin: "http://localhost:5173"
}))


app.use(express.json())
app.use(route)

export default app