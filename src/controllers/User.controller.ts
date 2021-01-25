import { Controller, Security , Route, Get, Post, Body, Query, BodyProp, Delete, Header, Patch, Tags  , OperationId, Request} from 'tsoa';
import Message from '../error.message';
import { Inject } from "typescript-ioc";
var HttpStatus = require('http-status-codes');
import apiException from '../domain/response/ApiException';
import { decodeSession, checkExpirationStatus, DecodeResult } from "../jwtSession";
import env from '../env';

import {
    UserProfileResponse
} from '../domain/response/User.response';
import { UserService } from '../services/User.service';

@Route('user')
@Tags('User')
export class UserController extends Controller {

    @Inject
    private userService: UserService;

    constructor() {
        super()
    }

    @Get('profile')
    @OperationId('user_profile')
    public async getProfile(
        @Header('authorization') accessToken: string
    ): Promise<UserProfileResponse> {
        console.log("================= start profile ======================= ");
        console.log(' accessToken =', accessToken);
        let res: UserProfileResponse = { errors: [] };
        try {

                const decodedSession:DecodeResult = decodeSession(env.SECRET_KEY, accessToken);
                console.log('decodedSession=', decodedSession)
                // console.log('new datw=', moment().format())
                // console.log('issued=', moment(decodedSession['session']['issued']).format())
                // console.log('expires=', moment(decodedSession['session']['expires']).format())
                 if (decodedSession.type != 'valid') {
                    console.log(`['invalid_token'] invalid-token`)
                    //this.setStatus(HttpStatus.UNAUTHORIZED);
                    throw new apiException('invalid_token', `Invalid Token`,HttpStatus.UNAUTHORIZED)
                }else{
                    const expirationStatus:string = checkExpirationStatus(decodedSession.session) 
                    if(expirationStatus=='expired'){
                        console.log(`['expired_access_token'] expired-access-token`)
                        //this.setStatus(HttpStatus.UNAUTHORIZED);
                        throw new apiException('expired_access_token', `Expired access token`,HttpStatus.UNAUTHORIZED)
                    }
                }

                const userInfo = await this.userService.getUserInfoByToken(decodedSession.session.id);     
                console.log('userInfo=',userInfo)
                res.data = {
                    username: userInfo['username'],
                    name:  userInfo['name'],
                    surname:  userInfo['surname'],
                    email:  userInfo['email'],
                    address:  unescape(userInfo['address']), 
                    phone:   userInfo['phone'],
                    classify:   userInfo['classify'],  
                    salary:  userInfo['salary'],
                };
                res.message = Message.Init.success;
                this.setStatus(HttpStatus.OK);
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