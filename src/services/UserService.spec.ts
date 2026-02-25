import { User, UserService } from "./UserService";

describe('UserService', () => {
    const mockDb: User[] = []
    const userService = new UserService(mockDb);

    it('Deve adicionar um novo usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser('nath', 'nath@test.com');
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb)
    })
    it('deve remover user', () => {
        const db = [
    {
        name: "Joana",
        email: "joana@dio.com",
    }
    ]
        const filteredDb = db.filter(
            user => user.email !== "joana@dio.com"
        );
        console.log('Usuário deletado', filteredDb)
    })
})
