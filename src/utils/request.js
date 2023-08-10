async function request(uri, method = "GET", bodyData = {}) {
  let base_url = "http://localhost:3000";
  alert(`${base_url}${uri}`);
  try {
    const response = await fetch(`${base_url}${uri}`, {
      method,
      headers: {
        authorization: window.localStorage.getItem("token"), //携带token
        'Content-Type': 'application/json'
      },
      ...(method !== "GET" ? { body: JSON.stringify(bodyData) } : {}),
    });

    if (!response.ok) {
      throw new Error("网络请求出错了");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default {
  async get(uri) {
    const data = await request(uri);
    return data;
  },
  async post(uri, bodyData = {}) {
    const data = await request(uri, "POST", bodyData);
    return data;
  },
  async put(uri, bodyData = {}) {
    const data = await request(uri, "PUT", bodyData);
    return data;
  },
  async delete(uri, bodyData = {}) {
    const data = await request(uri, "DELETE", bodyData);
    return data;
  },
};
