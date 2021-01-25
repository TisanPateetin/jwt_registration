
import ResponseModel from './Reponse';

interface UserProfileResponse extends ResponseModel {
    data?: {
        username?: boolean;
        name?: string;
        surname?: string;
        email?:  string;
        address:  string;    
        phone:  string; 
        classify:  string;   
        salary: number;
    }
}

export {
    UserProfileResponse

};