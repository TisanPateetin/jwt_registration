import { RegistrationController } from '../../controllers/Registration.controller'
import { RegistrationService } from '../../services/Registration.service'
import Message from '../../error.message';
import env from '../../env';

describe('Registration Controller', () => {
    let registrationController: RegistrationController;
 

    beforeEach(() => {
        jest.mock('../../services/Registration.service.ts')
        jest.mock('../../jwtSession')
        registrationController = new RegistrationController();
        env.SECRET_KEY = ')}i43/Z_X:<CE?G'
    });

    it(`Request user registration : Failed Invalid data when register save`, async () => {
        const result = await registrationController.postRegister({
            username: "", // incorrect data
            password: "", // incorrect data
            name: "", // incorrect data
            surname: "pateetin",
            email: "5@gmail.com",
            address: "123/12 Bankok 10900",
            phone: "0849199321",
            salary: 15000.00
       });
        expect(result.errors[0].error).toEqual('invalid_data')
    })

    it(`Request user registration : Failed Registration save rejected not match  alphanumeric string that may include _ and – having a length of 3 to 16 characters`, async () => {
        const result = await registrationController.postRegister({
            username: "tisanpa@5",
            password: "Pass12345",
            name: "tisan5",
            surname: "pateetin", // incorrect data
            email: "5@gmail.com",
            address: "123/12 Bankok 10900",
            phone: "0849199321",
            salary: 15000.00
       });
        expect(result.errors[0].error).toEqual('username_failed')
    })

   it(`Request user registration : Failed Registration save rejected not match alphanumeric string a length of 3 to 200 characters`, async () => {
        const result = await registrationController.postRegister({
            username: "tisanpa",
            password: "Pass12345",
            name: "ti", // incorrect data
            surname: "pateetin",
            email: "5@gmail.com",
            address: "123/12 Bankok 10900",
            phone: "0849199321",
            salary: 15000.00
       });
        expect(result.errors[0].error).toEqual('name_failed')
    })

    it(`Request user registration : Failed Registration save rejected not match alphanumeric string a length of 3 to 200 characters`, async () => {
        const result = await registrationController.postRegister({
            username: "tisanpa5",
            password: "Pass12345",
            name: "tisan5",
            surname: "pa", // incorrect data
            email: "5@gmail.com",
            address: "123/12 Bankok 10900",
            phone: "0849199321",
            salary: 15000.00
       });
        expect(result.errors[0].error).toEqual('surname_failed')
    })

    it(`Request user registration : Registration save rejected not match 10 digit phone number`, async () => {
        const result = await registrationController.postRegister({
            username: "tisanpa",
            password: "Pass12345",
            name: "tisan",
            surname: "pateetin",
            email: "gmail.com",
            address: "123/12 Bankok 10900",
            phone: "08491", // incorrect data
            salary: 15000.00
       });
        expect(result.errors[0].error).toEqual('phone_failed')
    })

    it(`Request user registration : Failed Registration save rejected not match email pattern`, async () => {
        const result = await registrationController.postRegister({
            username: "tisanpa",
            password: "Pass12345",
            name: "tisan",
            surname: "pateetin",
            email: "gmail.com",  // incorrect data
            address: "123/12 Bankok 10900",
            phone: "0849199321",
            salary: 15000.00
       });
        expect(result.errors[0].error).toEqual('email_failed')
    })

    it(`Request user registration : Registration save rejected To check a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter`, async () => {
        const result = await registrationController.postRegister({
            username: "tisanpa",
            password: "12345", // incorrect data
            name: "tisan",
            surname: "pateetin", 
            email: "tisa@gmail.com",
            address: "123/12 Bankok 10900",
            phone: "0849199321",
            salary: 15000.00
       });
        expect(result.errors[0].error).toEqual('password_failed')
    })


     it(`Request user registration : Failed Registration save rejected due to duplicate username`, async () => {
        
        RegistrationService.prototype.checkDuplicateUsername = jest.fn().mockImplementationOnce(() => {
            return true
        })
        const result = await registrationController.postRegister({
            username: "tisanpa",
            password: "Pass12345",
            name: "tisan",
            surname: "pateetin",
            email: "tisa@gmail.com",
            address: "123/12 Bankok 10900",
            phone: "0849199321",
            salary: 15000.00
       });

        expect(result.errors[0].error).toEqual('username_failed')
    })

    it(`Request user registration : Registration save rejected due to duplicate email`, async () => {
         RegistrationService.prototype.checkDuplicateEmail = jest.fn().mockImplementationOnce(() => {
            return false
          })
         RegistrationService.prototype.checkDuplicateEmail = jest.fn().mockImplementationOnce(() => {
            return true // incorrect data
          })
        const result = await registrationController.postRegister({
            username: "tisanpa",
            password: "Pass12345",
            name: "tisan5",
            surname: "pateetin",
            email: "123@gmail.com",
            address: "123/12 Bankok 10900",
            phone: "0849199321",
            salary: 15000.00
       });
        expect(result.errors[0].error).toEqual('email_failed')
    })

    it(`Request user registration : Registration save rejected member type classify from salary less than 15,000`, async () => {
         RegistrationService.prototype.checkDuplicateEmail = jest.fn().mockImplementationOnce(() => {
            return false
          })
         RegistrationService.prototype.checkDuplicateEmail = jest.fn().mockImplementationOnce(() => {
            return false
          })
        const result = await registrationController.postRegister({
            username: "tisanpa",
            password: "Pass12345",
            name: "tisan5",
            surname: "pateetin",
            email: "123@gmail.com",
            address: "123/12 Bankok 10900",
            phone: "0849199321",
            salary: 130.00 // incorrect data
       });
        expect(result.errors[0].error).toEqual('classify_failed')
    })
    

    it(`Request user registration : success `, async () => {
        RegistrationService.prototype.checkDuplicateUsername = jest.fn().mockImplementationOnce(() => {
            return false
        })

        RegistrationService.prototype.checkDuplicateEmail = jest.fn().mockImplementationOnce(() => {
            return false
          })

        RegistrationService.prototype.registerSave = jest.fn().mockImplementationOnce(() => {
            return 12
        })

        const result = await registrationController.postRegister({
            username: "tisanpa5",
            password: "Pass12345",
            name: "tisan5",
            surname: "pateetin",
            email: "5@gmail.com",
            address: "123/12 Bankok 10900",
            phone: "0849199321",
            salary: 15000.00
       });
        expect(result.token.length).toEqual(206)
    })

})
