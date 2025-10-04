import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

class Api {
  /**
   * Join URL segments
   */
  join(...segments: string[]): string {
    return segments
      .map(segment => segment.replace(/^\/|\/$/g, ''))
      .filter(segment => segment.length > 0)
      .join('/');
  }

  /**
   * GET request
   */
  async get<T = any>(
    url: string,
    params: Record<string, any> = {},
    allowedCodes: number[] = []
  ): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        params,
        validateStatus: (status) => {
          return status === 200 || allowedCodes.includes(status * 100 + (status % 100));
        },
      };

      const response: AxiosResponse<T> = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  }

  /**
   * POST request
   */
  async post<T = any>(
    url: string,
    data: Record<string, any> = {},
    allowedCodes: number[] = []
  ): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        validateStatus: (status) => {
          return status === 200 || status === 201 || allowedCodes.includes(status * 100 + (status % 100));
        },
      };

      const response: AxiosResponse<T> = await axios.post(url, data, config);
      return response.data;
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  }
}

export const api = new Api();
export default api;
