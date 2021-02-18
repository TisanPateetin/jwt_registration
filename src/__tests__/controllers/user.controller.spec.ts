import { UserController } from "../../controllers/User.controller";
import { UserService } from "../../services/User.service";
import env from '../../env';
import { encodeSession } from "../../jwtSession";

describe('User Controller', () => {
  let userController: UserController
  const mockService = {
    username: "tisanpa5",
    name: "tisan5",
    surname: "pateetin",
    email: "5@gmail.com",
    address: "123/12 Bankok 10900",
    phone: "0849199321",
    classify: "Silver",
    salary: 15000
  }

   
    const session = encodeSession(')}i43/Z_X:<CE?G', {
        id: 123
    });
   const requestMock = 'Bearer ' + session.token;


  beforeEach(() => {
    jest.mock('../../services/User.service')
    jest.mock('../../jwtSession')
    userController = new UserController()
    env.SECRET_KEY = ')}i43/Z_X:<CE?G'
     
   })

  it(`Request get user_profile : Success `, async () => {
    const responseMock = {
      "errors": [],
      "data": {
        username: "tisanpa5",
        name: "tisan5",
        surname: "pateetin",
        email: "5@gmail.com",
        address: "123/12 Bankok 10900",
        phone: "0849199321",
        classify: "Silver",
        salary: 15000
      },
      "message": "success"
    }

    UserService.prototype.getUserInfoByToken = jest.fn().mockImplementationOnce(() => {
      return mockService
    })
    const result = await userController.getProfile(requestMock);
    expect(result).toStrictEqual(responseMock)
  })

  it(`Request get user_profile : Failed error invalid token`, async () => {
    const responseMock = {
      errors: [{ error: 'invalid_token', error_message: 'Invalid Token' }]
    }
    UserService.prototype.getUserInfoByToken = jest.fn().mockImplementationOnce(() => {
      return mockService
    })
    const requestMock = 'Bearer eyJ0eXAiOiJKV'
    const result = await userController.getProfile(requestMock);
    console.log(result)
    expect(result).toStrictEqual(responseMock)
  })

})
