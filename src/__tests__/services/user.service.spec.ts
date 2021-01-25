import { UserService } from "../../services/User.service";;

describe('User Service',() => {
    let userService: UserService

    beforeEach(() => {
        jest.mock('../../db')
        userService = new UserService()
    });

    const resultMock = {
        id: '4',
        username: 'staff_1',
        password: '$2y$11$lEkmjlIztPYZH7hqEH3gq.CWxOyNHMP4nNsh8RMdtguSfAX9uAi1K',
        name: 'unitName',
        surname: 'unitSurnsme',
        fullname: 'unitName unitSurnsme',
        email: 'unitEmail@gmail.com',
        mobile: '099999999',
        position: 'unitPosition',
        role: 'staff',
        super_user: 0,
        viewer_user: 0,
        site_permission: 'all',
        flag_enable: 1,
        first_login: '2017-08-24T00:00:00.000Z',
        created_date: '2017-07-15T14:21:01.000Z',
        updated_date: '2020-04-23T07:28:03.000Z',
        customer_id: '1',
        'ssma$rowid': 'D9C0E009-E895-416C-A7C1-438626D86308',
        customer_name: 'บริษัท กรีน รับเบอร์ เอ็นเนอร์ยี่ จำกัด'
    }
        

    // it('getUserInfoByToken',async () => {
    //     const accessToken = '001d9728714b454fb4a60037698e7af338801653'
    //     const result = await userService.getUserInfoByToken(accessToken)
    //     expect(result).toStrictEqual(resultMock)
    // })

    it('createActivityLog',async () => {
        const activityLog: object = {
            action: 'update',
            section: 'api_user',
            target_id: 4,
            by_user_id: 4,
            session_id: '1234',//session_id(), // To Do >>> Created session node
            message: 'Change mobile application language to th.',
            ip_address: 'Test 0.0.0',//$this->input->ip_address(),  // To Do  >> Get API from Request
            user_full_name: 'unitName unitSurnsme'
        }
    })

    it('updatePushToken',async () => {
        const accessToken = '001d9728714b454fb4a60037698e7af338801653'
        const objPushUpdateToken = {
            push_token: '001d9728714b454fb4a60037698e7af338801653',
            push_failed: 0
        }
       
    })

})