// src/common/network/network.ts

interface PostRequestOptions {
  url: string;
  options?: RequestInit;
  retries?: number;
  timeout?: number;
}

const network = {
  postRequest: async ({
    url,
    options = {},
    retries = 3,
    timeout = 5000,
  }: PostRequestOptions): Promise<Response> => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await fetch(url, { ...options, method: 'POST', signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response;
      } catch (error) {
        console.error(`Network error on attempt ${attempt}:`, error);
        if (attempt === retries) throw error;
        await new Promise(res => setTimeout(res, 1000 * attempt));
      } finally {
        clearTimeout(id);
      }
    }
    throw new Error('All retry attempts failed');
  },
};

export default network;