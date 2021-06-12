import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { getToken } from '../common/helpers/tokenHelper';
import { getHash } from '../common/helpers/hashHelper';

const BASE_URL = process.env.REACT_APP_API_URL || '';

class Api {
  baseUrl: string;
  instance: AxiosInstance;
  constructor() {
    this.baseUrl = BASE_URL;
    this.instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: true,
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken',
    });
  }

  async get(url: string, params?: any) {
    await this.checkAuthToken();
    return await this.instance
      .get(url, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Hash-Project': await getHash(),
        },
        params,
      })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  async post(url: string, data: any) {
    return await this.instance
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Hash-Project': await getHash(),
        },
      })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  async patchh(url: string, data: any) {
    return await this.instance
      .patch(url, data, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Hash-Project': await getHash(),
        },
      })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  async image(url: string, image: Blob) {
    const data = new FormData();
    data.append('image', image);
    return await this.instance
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Hash-Project': await getHash(),
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  async formPost(url: string, data: any) {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    return await this.instance
      .post(url, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Hash-Project': await getHash(),
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  async formPut(url: string, data: any) {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    return await this.instance
      .put(url, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Hash-Project': await getHash(),
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  async formPatch(url: string, data: any) {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    return await this.instance
      .patch(url, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Hash-Project': await getHash(),
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  async put(url: string, data: any) {
    return await this.instance
      .put(url, data, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Hash-Project': await getHash(),
        },
      })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  async delete(url: string, data?: any) {
    return await this.instance
      .delete(url, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Hash-Project': await getHash(),
        },
        data,
      })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  private handleResponse(response: AxiosResponse) {
    return response.data;
  }

  private handleError(error: AxiosError) {
    if (error.response) {
      const data = error.response?.data;
      const message = Object.values(data).flat().join(' ');
      return { error: { data, message } };
    } else {
      return { error: { data: {}, message: error?.message } };
    }
  }

  private async checkAuthToken() {
    try {
      // check auth token success
    } catch (error) {
      // on error
    }
  }
}

export default new Api();
