export const useFetch = async ({ body, url, method = "GET" }) => {
  const baseUrl = import.meta.env.VITE_API_BASE || "http://95.163.242.125";
  try {
    const data = await fetch(`${baseUrl}/${url}`, {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Username: "sergroznov",
      },
    }).then((response) => response.json());

    return data;
  } catch (error) {
    console.error(error);
  }
};
