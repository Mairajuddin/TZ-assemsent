export const baseURL='http://localhost:3000/api'

export const FireApi = async (
  endpoint,
  method,
  data = null,
  Headers = null
) => {
  const headers = {
    // "Content-Type": "multipart/formdata",
    "ngrok-skip-browser-warning": "true",
    // Authorization: `Bearer ${token}`,
  };

  const options = {
    method: method,
    headers: Headers ? Headers : headers,
    body: data ? data : null,
    // body: data ? JSON.stringify(data) : null,
  };

  const response = await fetch(`${baseURL}/${endpoint}`, options);
  if (response.ok && response.status >= 200 && response.status <= 301) {
    return response.json();
  } else {
    const json = await response.json();
    return json;
    
  }
};