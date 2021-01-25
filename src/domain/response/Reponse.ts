import ErrorDetailModel from './Error.detail';

interface ResponseModel{
    message?: string;
    errors: ErrorDetailModel[];
}

export default ResponseModel;