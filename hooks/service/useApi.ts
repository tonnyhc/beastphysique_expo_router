interface RequestInitWithBody extends RequestInit {
  body?: string | FormData;
}

export type RequestMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

const hostUrl = "http://192.168.100.5:8000/";

const useApi = (token: string | null) => {
  const requester = async (
    url: string,
    method: RequestMethod,
    body?: any
  ): Promise<any> => {
    let headers: Record<string, string> = {
      Authorization: `Token ${token}`,
    };

    let options: RequestInitWithBody = {
      method,
      headers,
    };

    // Checking if the request has a body to apply a content type to it and to stringify the body to JSON
    if (body) {
      if (body instanceof FormData) {
        // If body is FormData, set content type to undefined and use the body directly
        options.body = body;
        headers = {};
      } else {
        headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
      }
    }

    try {
      const response = await fetch(hostUrl + url, options);

      // Checking if the status is 204 (NO CONTENT) to return the response without parsing it to an object
      if (response.status === 204) {
        return response;
      }
      if (response.status === 401) {
        const data = response.json();
        throw data;
      }
      if (!response.ok) {
        // If the response is not OK (e.g., has an error) throw the error response
        const data = await response.json();
        throw data;
      }

      // If everything goes as expected, return the response as an object
      return response.json();
    } catch (e) {
      throw e;
    }
  };

  const post = async (url: string, body?: any) => {
    try {
      const data = await requester(url, "POST", body);
      return data;
    } catch (e) {
      throw e;
    }
  };

  const get = async (url: string) => {
    try {
      const data = await requester(url, "GET");
      return data;
    } catch (e) {
      throw e;
    }
  };

  const patch = async (url: string, body: any) => {
    try {
      const data = await requester(url, "PATCH", body);
      return data;
    } catch (e) {
      throw e;
    }
  };

  const put = async (url: string, body: any) => {
    try {
      const data = await requester(url, "PUT", body);
      return data;
    } catch (e) {
      throw e;
    }
  };

  const del = async (url: string, body?: any) => {
    try {
      const data = await requester(url, "DELETE", body);
      return data;
    } catch (e) {
      throw e;
    }
  };

  return { post, get, patch, put, del };
};

export default useApi;
