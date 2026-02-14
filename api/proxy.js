export default async function handler(req, res) {
  const url = "https://api.groq.com/openai/v1/chat/completions";

  // Разрешаем запросы с любого домена (для теста)
  res.setHeader("Access-Control-Allow-Origin", "*"); // или конкретно "https://nyash-gram.vercel1.app"
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Обработка OPTIONS-запроса (preflight)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Bearer ${process.env.GROQ_API_KEY}
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    // Передаём статус и данные клиенту
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
