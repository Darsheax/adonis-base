import {CustomException} from "App/Exceptions/CustomException";

export default class NotFoundException extends CustomException {

  status: number = 404
  code: string = "E_NOT_FOUND"

}
