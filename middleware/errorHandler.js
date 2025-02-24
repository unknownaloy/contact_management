import { constants } from "../constants.js";
import { response } from "../utils/response.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      // res.json({
      //   title: "Validation Failed",
      //   message: err.message,
      //   stackTrace: err.stack,
      // });

      // TODO(Ellis): Only show stackTrace in development mode
      return response(
        res,
        { status: false, message: err.message },
        constants.VALIDATION_ERROR
      );

    case constants.NOT_FOUND:
      return response(
        res,
        { status: false, message: err.message },
        constants.NOT_FOUND
      );

    case constants.UNAUTHORIZED:
      return response(
        res,
        { status: false, message: err.message },
        constants.UNAUTHORIZED
      );
    case constants.FORBIDDEN:
      return response(
        res,
        { status: false, message: err.message },
        constants.FORBIDDEN
      );
    case constants.SERVER_ERROR:
      return response(
        res,
        { status: false, message: err.message },
        constants.SERVER_ERROR
      );

    default:
      console.log("No error. All good!");
      break;
  }
};
