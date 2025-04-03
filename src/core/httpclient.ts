import axios, { AxiosInstance } from "axios";

class HttpClient {
  private axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:3000/",
    });
  }

  get(url:any, params = {}) {
    const config = {
      params: params,
    };
    return this.axiosInstance.get(url, config).then((response:any) => response.data);
  }

  post(url:any, body:any) {
    return this.axiosInstance.post(url, body).then((response:any) => response.data);
  }

  put(url:any, body:any) {
    return this.axiosInstance.put(url, body).then((response:any) => response.data);
  }

  delete(url:any) {
    return this.axiosInstance.delete(url).then((response:any) => response.data);
  }
}

export const httpClient = new HttpClient();
