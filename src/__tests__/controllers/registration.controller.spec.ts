import { RegistrationController } from '../../controllers/Registration.controller'
import { RegistrationService } from '../../services/Registration.service'
import Message from '../../error.message';
import { String } from 'typescript-string-operations';

describe('Registration Controller', () => {
    let registrationController: RegistrationController;

    beforeEach(() => {
        jest.mock('../../services/Registration.service.ts')
        jest.mock('../../services/User.service.ts')
        registrationController = new RegistrationController();
    });

})