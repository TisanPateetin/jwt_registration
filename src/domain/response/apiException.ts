export default class ApiException extends Error {
  public httpStatus: string = '200';
    constructor(errorNmae, errorMessage, httpStatus : string = '200') {
      super(errorMessage)
      this.name = errorNmae
      this.httpStatus = httpStatus
    }
    // HttpStatus.BAD_REQUEST = 400
    // HttpStatus.CREATED = 201
    // HttpStatus.OK = 200 
    // HttpStatus.INTERNAL_SERVER_ERROR = 500
  }