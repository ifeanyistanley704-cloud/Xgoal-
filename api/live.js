export default async function handler(req, res) {
  try {
    const r = await fetch("https://v3.football.api-sports.io/fixtures?live=all", {
      headers: { "x-apisports-key": process.env.APIFOOTBALL_KEY }
    });
    const data = await r.json();
    const games = (data.response || []).map(g => ({
      home: g.teams.home.name,
      away: g.teams.away.name,
      score: `${g.goals.home ?? 0} - ${g.goals.away ?? 0}`,
      minute: g.fixture.status.elapsed
    }));
    res.setHeader("Cache-Control", "s-maxage=900");
    res.status(200).json(games);
  } catch (e) {
    res.status(200).json([]);
  }
}
