import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class ServiceNowAPI {
  private client: AxiosInstance;

  constructor(instanceUrl: string, username: string, password: string) {
    this.client = axios.create({
      baseURL: instanceUrl,
      auth: {
        username,
        password,
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  }

  async get<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get(endpoint, config);
    return response.data;
  }

  async post<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post(endpoint, data, config);
    return response.data;
  }

  async put<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put(endpoint, data, config);
    return response.data;
  }

  async delete<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete(endpoint, config);
    return response.data;
  }

  async query<T = any>(table: string, query?: Record<string, string>): Promise<T> {
    const params = new URLSearchParams(query as any);
    return this.get(`/api/x_12345/idp/${table}?${params.toString()}`);
  }
}
