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
          return status === 200 || (status >= 400 && status < 600);
        },
      };

      const response: AxiosResponse<T> = await axios.get(url, config);

      // Check if response has a code property and if it's in allowedCodes
      const responseData = response.data as any;
      if (response.status !== 200 && responseData?.code && !allowedCodes.includes(responseData.code)) {
        throw new Error(`Unexpected response code: ${responseData.code}`);
      }

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
          return status === 200 || status === 201 || (status >= 400 && status < 600);
        },
      };

      const response: AxiosResponse<T> = await axios.post(url, data, config);

      // Check if response has a code property and if it's in allowedCodes
      const responseData = response.data as any;
      if (response.status !== 200 && response.status !== 201 && responseData?.code && !allowedCodes.includes(responseData.code)) {
        throw new Error(`Unexpected response code: ${responseData.code}`);
      }

      return response.data;
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  }
}

export const api = new Api();
export default api;
