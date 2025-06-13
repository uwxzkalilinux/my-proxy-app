export default async function handler(req, res) {
  const unique = req.query.unique;

  if (!unique) {
    return res.status(400).json({ error: "unique ID مطلوب" });
  }

  try {
    const response = await fetch(`http://176.241.95.201:8092/id?unique=${unique}`, {
      method: "GET",
      headers: {
        "Authorization": "Basic YWRtaW46MjQxMDY3ODkw"
      },
      redirect: "follow"
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "فشل في جلب البيانات من API" });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "حدث خطأ داخلي" });
  }
}
