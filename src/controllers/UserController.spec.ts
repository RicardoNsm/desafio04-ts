import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn()
    }
    
    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })

    it('Verificar se a função getAllusers está sendo chamada', async () => {
        interface User { 
            name: string,
            email: string
        }
        const mockUsers: User[] = [
            {
                name : "Joana",
                email: "joana@dio.com"
            }
        ];
        
        
        (mockUserService.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);
        

           const mockRequest = {} as Request
        const mockResponse = makeMockResponse<User[]>()
        await userController.getAllUsers(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject(mockUsers)
    })

    it('verifica se email esta preebchido', () => {
         const mockRequest = {
            body: {
                name: 'Nath',
                email: ''
            }
        } as Request
        const mockResponse = makeMockResponse()
          userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! email obrigatório'})
    })
})
