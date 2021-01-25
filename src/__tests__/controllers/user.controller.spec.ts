import { UserController } from "../../controllers/User.controller";
import { UserService } from "../../services/User.service";
import Message from '../../error.message';

describe('User Controller', () => {

    let userController: UserController

    beforeEach(() => {
        jest.mock('../../services/User.service')
        userController = new UserController()
    })

})