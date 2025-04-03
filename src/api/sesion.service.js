import { httpClient } from "../core/httpclient";

class SesionService {
  tokenValidationSuccess(token) {
    return httpClient.get("/tokenValidationSuccess", {
      token: token,
    });
  }


  tokenValidationError(token) {
    return httpClient.get("/tokenValidationError", {
      token: token,
    });
  }
}


export const sesionService = new SesionService();
