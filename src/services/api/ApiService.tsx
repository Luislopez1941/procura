// apiService.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string = 'https://bnprocura.onrender.com') {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private async request<T>(method: string, url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.request({
      method,
      url,
      data,
    });
    return response.data;
  }

  public get<T>(path: string): Promise<T> {
    const url = `/${path}`;
    return this.request<T>('GET', url);
  }

  public post<T>(path: string, data: any): Promise<T> {
    const url = `/${path}`;
    return this.request<T>('POST', url, data);
  }
}

export default new ApiService();
