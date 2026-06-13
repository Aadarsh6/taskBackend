import { Router } from "express"
import { login, signup } from "./controllers/auth.controller.js"
import { createTask, deleteTask, getTask, updateTask } from "./controllers/task.controller.js"

const route = Router()

route.post("/api/auth/signup", signup)
route.post("/api/auth/login", login)


route.post("/api/tasks", createTask)
route.get("/api/tasks", getTask)

route.put("/api/tasks/:id", updateTask)
route.delete("/api/tasks/:id", deleteTask)

export default route