let tokenAccesso = null
let scadenzaToken = 0

// recupera token di accesso temporaneo da spotify
export const ottieniTokenSpotify = async () => {
  const adesso = Date.now()
  if (tokenAccesso && adesso < scadenzaToken) {
    return tokenAccesso
  }

  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    console.error('Credenziali mancanti nel file .env!')
    return null
  }

  try {
    const credenziali = btoa(`${clientId}:${clientSecret}`)
    const risposta = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credenziali}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    })

    const dati = await risposta.json()
    if (dati.access_token) {
      tokenAccesso = dati.access_token
      scadenzaToken = adesso + (dati.expires_in - 60) * 1000
      return tokenAccesso
    }
  } catch (errore) {
    console.error('Errore recupero token Spotify:', errore)
  }
  return null
}

// cerca brani nel catalogo spotify
export const cercaBraniSpotify = async (testoRicerca, limite = 5) => {
  if (!testoRicerca || testoRicerca.trim().length < 2) return []

  const token = await ottieniTokenSpotify()
  if (!token) return []

  try {
    const query = encodeURIComponent(testoRicerca.trim())
    const url = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=${limite}`

    const risposta = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const dati = await risposta.json()
    if (dati.tracks && dati.tracks.items) {
      return dati.tracks.items.map(brano => ({
        id: brano.id,
        titolo: brano.name,
        artista: brano.artists.map(a => a.name).join(', '),
        cover: brano.album.images[0]?.url || '',
        linkSpotify: brano.external_urls.spotify
      }))
    }
  } catch (errore) {
    console.error('Errore ricerca Spotify:', errore)
  }
  return []
}
