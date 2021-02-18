import { RegistrationService } from "../../services/Registration.service";;

describe('RegistrationService Service', () => {
    let registrationService: RegistrationService

    beforeEach(() => {
        jest.mock('../../db')
        registrationService = new RegistrationService()
    });

    it('registerSave',async () => {
        RegistrationService.prototype.registerSave = jest.fn().mockImplementationOnce(() => {
          return 123
        })
        const reqMock = {
                username: "tisanpa5",
                password: "Pass12345",
                name: "tisan5",
                surname: "pateetin",
                email: "5@gmail.com",
                address: "123/12 Bankok 10900",
                phone: "0849199321",
                salary: 15000.00
        }
        const result = await registrationService.registerSave(reqMock)
        expect(result).toStrictEqual(123)
    })

    it('checkDuplicateUsername',async () => {
        RegistrationService.prototype.checkDuplicateUsername = jest.fn().mockImplementationOnce(() => {
          return true
        })
        const username = 'tisan'
        const result = await registrationService.checkDuplicateUsername(username)
        expect(result).toStrictEqual(true)
    })

    it('checkDuplicateEmail',async () => {
        RegistrationService.prototype.checkDuplicateEmail = jest.fn().mockImplementationOnce(() => {
          return true
        })
        const requestMock = 'tisan@gmail.com'
        const result = await registrationService.checkDuplicateEmail(requestMock)
        expect(result).toStrictEqual(true)
    })

})