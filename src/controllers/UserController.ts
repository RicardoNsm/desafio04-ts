import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }

    createUser = (request: Request, response: Response): Response => {
        const user = request.body

        if(!user.name){
            return response.status(400).json({ message: 'Bad request! Name obrigatório'})
        }
        if(!user.email){
            return response.status(400).json({ message: 'Bad request! email obrigatório'})
        }

        this.userService.createUser(user.name, user.email)
        return response.status(201).json({ message: 'Usuário criado'})
    }

    getAllUsers = async (request: Request, response: Response) => {
        const users = await this.userService.getAllUsers()
        return response.status(200).json( users )
    } 
    deleteUser = async (request: Request, response: Response) => {
        const email = (request.body && (request.body.email || request.body)) || request.params?.email || request.query?.email

        if(!email){
            return response.status(400).json({ message: 'Bad request! email obrigatório'})
        }

        await this.userService.deleteUser(String(email))
        return response.status(200).json({ message: 'Usuário deletado'})
    }
}
