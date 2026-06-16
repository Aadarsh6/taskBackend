import type { Request, Response } from "express";
import type { AuthRequest } from "../../types/types.js";
import prisma from "../../lib/prisma.js";

export const createTask = async (req:AuthRequest , res: Response)=>{
    const task= req.body.task
    const userId = req.userId

    if (!userId) {
    return res.status(401).json({ message: "Unauthorized" })
}

    try {
        const newTask = await prisma.task.create({
            data:{
                task: task,
                userId: userId,
                taskStatus: false
            }
        })
        console.log(newTask);
        
        res.json({newTask})
    } catch (error) {
        res.status(500).json({message: "Can't create the task"})
    }
}

export const getTask = async (req: AuthRequest, res: Response)=>{

    const userId = req.userId as string

    try {
        const userTask = await prisma.task.findMany({
            where: {userId: userId}
        })
        return res.json(userTask)
    } catch (error) {
        return res.status(500).json({message: "Could not fetch the task"})
    }
}

export const updateTask = async (req: AuthRequest, res: Response)=>{

    const taskId = req.params.id as string
    const newTask = req.body.task
    if(!newTask){
            return res.status(401).json({ message: "Can not get the task" })

    }
    
    try {
        const task = await prisma.task.findUnique({
            where: { id: taskId }
        })

        if(!task){
            return res.status(404).json({message: "Task not found"})
        }

        if(task.userId !== req.userId){
            return res.status(403).json({message: "Not authorized to update this task"})
        }

        const updateTask = await prisma.task.update({
            where: {id: taskId},
            data:{task: newTask}
        }) 
        res.json(updateTask)
    } catch (error) {
        return res.status(500).json({message: "Can't update the message"})
    }

}


export const deleteTask = async (req: AuthRequest, res: Response)=>{
    const taskId = req.params.id as string

    try {
        const verifyUser = await prisma.task.findUnique({
            where: { id:taskId }
        })
        if(!verifyUser) return res.status(404).json({message: "cant't get the task"})

        if(verifyUser.id !== req.userId){
            return res.status(403).json({message: "Not authorized to delete this task"})
        }
            
            const deleteTask = await prisma.task.delete({
                where: {id: taskId}
            })

            res.status(200).json({deleteTask, message: "Task deleted successfully"})
    } catch (error) {
        return res.status(500).json({message: "Can't delete the task"})        
    }
}

