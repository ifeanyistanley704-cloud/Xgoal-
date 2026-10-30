export default async function handler(req, res) {
  if (!process.env.APIFOOTBALL_KEY) {
    return res.status(200).json({ keyFound: false });
  }
  const r = await fetch("https://v3.football.api-sports.io/status", {
    headers: { "x-apisports-key": process.env.APIFOOTBALL_KEY }
  });
  const d = await r.json();
  res.status(200).json({
    keyFound: true,
    errors: d.errors,
    requests: d.response && d.response.requests
  });
}
