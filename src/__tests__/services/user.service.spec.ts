import { UserService } from "../../services/User.service";;
const { sql, poolPromise, executeSql } = require('../../db');
describe('User Service', () => {
    let userService: UserService

    beforeEach(() => {
        jest.mock('../../db')
        userService = new UserService()
    });

    const resultMock = {
        username: "tisanpa5",
        name: "tisan5",
        surname: "pateetin",
        email: "5@gmail.com",
        address: "123/12 Bankok 10900",
        phone: "0849199321",
        classify: "Silver",
        salary: 15000
    }

    it('getUserInfoByToken',async () => {
        
        UserService.prototype.getUserInfoByToken = jest.fn().mockImplementationOnce(() => {
          return {  username: "tisanpa5",
            name: "tisan5",
            surname: "pateetin",
            email: "5@gmail.com",
            address: "123/12 Bankok 10900",
            phone: "0849199321",
            classify: "Silver",
            salary: 15000
          }
        })
        const requestMock = 1234
        const result = await userService.getUserInfoByToken(requestMock)
        expect(result).toStrictEqual(resultMock)
    })

})
