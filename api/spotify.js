export default async function handler(req, res) {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Query mancante' });
  }

  const clientId = process.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.VITE_SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: 'Credenziali Spotify non configurate su Vercel' });
  }

  try {
    // 1. Ottieni il token di accesso da Spotify
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
      },
      body: 'grant_type=client_credentials'
    });
    
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      return res.status(401).json({ error: 'Autenticazione Spotify fallita' });
    }

    // 2. Esegui la ricerca dei brani
    const searchRes = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&limit=5`, {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    });

    const searchData = await searchRes.json();

    // 3. Formatta i risultati come si aspetta il tuo componente Vue
    const tracks = (searchData.tracks?.items || []).map(track => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map(a => a.name).join(', '),
      cover: track.album.images[0]?.url || ''
    }));

    return res.status(200).json({ tracks });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}