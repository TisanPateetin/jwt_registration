import { Controller, Route, Get, Post, Body, Query, BodyProp, Delete, Header, Patch, Tags, OperationId, Request } from 'tsoa';
import Message from '../error.message';
import { Inject } from "typescript-ioc";
import apiException from '../domain/response/ApiException';
import bcrypt from 'bcryptjs';
import { pick, toString, toNumber } from "lodash";
import { encodeSession } from "../jwtSession";
import { RegistrationService } from '../services/Registration.service';
import * as express from "express";
import moment from "moment";
import env from '../env';

var HttpStatus = require('http-status-codes');

import {
    RegistrationRegisterRequest
} from '../domain/request/Registration.request';
import {
    RegistrationRegisterResponse
} from '../domain/response/Registration.response';


@Route('registration')
@Tags('Registration')
export class RegistrationController extends Controller {

    @Inject
    private registrationService: RegistrationService;

    constructor() {
        super()
        this.registrationService = new RegistrationService();
    }

    @Post()
    @OperationId('registration_register')
    public async postRegister(
        @Request() request: express.Request,
        @Body() registerRequest: RegistrationRegisterRequest
    ): Promise<RegistrationRegisterResponse> {
        console.log(`['Register'] request : ${JSON.stringify(pick(registerRequest, ['name', 'register_code', 'surname', 'email', 'mobile', 'username', 'token']))}`)
        console.log("================= start register ======================= ");
        console.log(JSON.stringify(registerRequest));
        let res: RegistrationRegisterResponse = { errors: [] };
        try {

            //console.log(' ip =',request.ip)

            //Check Request not emtry
            if ((!registerRequest.username)||
                (!registerRequest.name)||
                (!registerRequest.surname)||
                (!registerRequest.email)||
                (!registerRequest.phone)||
                (!registerRequest.address)||
                (!registerRequest.salary)){
                console.log(`['registration_register'] Invalid data when register save`)
                throw new apiException("invalid_data", "Invalid data when register save", HttpStatus.BAD_REQUEST);
            }

            //Check Request Escaping: : Decrease the chance of XSS (Cross-Site Scripting) being exploited.
            registerRequest.address = escape(registerRequest.address)

            //check username pattern
            // Alphanumeric string that may include _ and – having a length of 3 to 16 characters
            console.log('(registerRequest.username =',(registerRequest.username))
            const reguUsername = /^[a-z0-9_-]{3,16}$/g;
            if (!reguUsername.test(registerRequest.username)) {
                throw new apiException('username_failed', 'Registration save rejected not match  alphanumeric string that may include _ and – having a length of 3 to 16 characters ', HttpStatus.BAD_REQUEST)
            }

            //check name pattern
            // Alphanumeric string a length of 3 to 200 characters
            const reguName = /^[a-z0-9]{3,200}$/g;
            if (!reguName.test(registerRequest.name)) {
                throw new apiException('name_failed', 'Registration save rejected not match alphanumeric string a length of 3 to 200 characters ', HttpStatus.BAD_REQUEST)
            }

            //check surname pattern
            // Alphanumeric string a length of 3 to 200 characters
            const reguSurname = /^[a-z0-9]{3,200}$/g;
            if (!reguSurname.test(registerRequest.surname)) {
                throw new apiException('surname_failed', 'Registration save rejected not match alphanumeric string a length of 3 to 200 characters ', HttpStatus.BAD_REQUEST)
            }

            //check Phone pattern
            const regPhone = /^[0-9]{10}$/g;
            if (!regPhone.test(registerRequest.phone)) {
                throw new apiException('phone_failed', 'Registration save rejected not match 10 digit phone number', HttpStatus.BAD_REQUEST)
            }

            //check Email pattern
            const regEmail =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
            if (!regEmail.test(registerRequest.email)) {
                throw new apiException('email_failed', 'Registration save rejected not match email pattern', HttpStatus.BAD_REQUEST)
            }

            //check Password insecurity
                // Password between 6 to 20 characters,
                // which contain at least one numeric digit,
                // One uppercase and one lowercase letter
            const regPassword = /^[A-Za-z]\w{7,14}$/g;
            if (!regPassword.test(registerRequest.password)) {
                throw new apiException('password_failed', 'Registration save rejected To check a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter', HttpStatus.BAD_REQUEST)
            }

            //Check duplicate username
            if (await this.registrationService.checkDuplicateUsername(registerRequest['username'])) {
                console.log(`['registration_register'] Registration save rejected due to duplicate  username`)
                throw new apiException('username_failed', `Registration save rejected due to duplicate username`,HttpStatus.BAD_REQUEST)
            }

            //Check duplicate email
            if (await this.registrationService.checkDuplicateEmail(registerRequest['email'])) {
                console.log(`['registration_register'] Registration save rejected due to duplicate email`)
                throw new apiException('email_failed', `Registration save rejected due to duplicate email`,HttpStatus.BAD_REQUEST)
            }

            // Encrypt Password
            registerRequest['password'] = bcrypt.hashSync(registerRequest['password']);

            // Generate reference code 
            const phone:string = registerRequest.phone
            registerRequest['reference_code'] = moment().format('YYYYMMDD')  +phone.substring( phone.length - 5, phone.length);
            console.log(' reference_code =',registerRequest['reference_code'])
            
            // Member type classify from salary
            const salary:number = toNumber(registerRequest.salary)
            if(salary >  50000 ){
                registerRequest['classify']= 'Platinum'
            }else if(salary >= 30000 && salary <= 50000 ){
                registerRequest['classify']= 'Gold '
            }else if(salary >= 15000 && salary < 30000 ){
                registerRequest['classify']= 'Silver'
            }else{
                throw new apiException('classify_failed', 'Registration save rejected member type classify from salary less than 15,000 ', HttpStatus.BAD_REQUEST)
            }
            console.log('classify =',registerRequest['classify'])
            
            // Save to db
            let userId = await this.registrationService.registerSave(registerRequest)

            // Genarate access token (JWT)
            const session = encodeSession(env.SECRET_KEY, {
                id: userId
            });

            res.token = 'Bearer ' + session.token;
            res.message = Message.Init.success;
            this.setStatus(HttpStatus.CREATED);
            console.log(`[registration_register] Registration saved`)
            return res
        } catch (error) {
            const httpStatus = error.httpStatus ? error.httpStatus : HttpStatus.INTERNAL_SERVER_ERROR
            this.setStatus(httpStatus);
            res.errors.push({
                error: error.name,
                error_message: error.message
            });
            console.log(error)
            console.log(JSON.stringify(error));
            return res;
        }
    }


}
