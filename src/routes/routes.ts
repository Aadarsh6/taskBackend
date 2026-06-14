import { Router } from "express"
import { login, signup } from "./controllers/auth.controller.js"
import { createTask, deleteTask, getTask, updateTask } from "./controllers/task.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const route = Router()

route.post("/api/auth/signup", signup)
route.post("/api/auth/login", login)


route.post("/api/tasks", authMiddleware, createTask)
route.get("/api/tasks", authMiddleware, getTask)

route.put("/api/tasks/:id", authMiddleware, updateTask)
route.delete("/api/tasks/:id", authMiddleware, deleteTask)

export default route