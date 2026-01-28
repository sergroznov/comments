export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Username");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { path } = req.query;
  const targetUrl = `http://95.163.242.125/${path}`;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        Username: req.headers.username || "sergroznov",
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
