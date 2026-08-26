import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const spotifyApi = (env) => {
  let accessToken = ''
  let expiresAt = 0

  return {
    name: 'spotify-search-api',
    configureServer(server) {
      server.middlewares.use('/api/spotify/search', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        const query = new URL(req.url, 'http://localhost').searchParams.get('q')?.trim()
        const clientId = env.SPOTIFY_CLIENT_ID
        const clientSecret = env.SPOTIFY_CLIENT_SECRET

        if (!clientId || !clientSecret) {
          res.statusCode = 503
          res.end(JSON.stringify({ error: 'Configura SPOTIFY_CLIENT_ID e SPOTIFY_CLIENT_SECRET nel file .env' }))
          return
        }
        if (!query) {
          res.end(JSON.stringify({ tracks: [] }))
          return
        }

        try {
          if (!accessToken || Date.now() >= expiresAt) {
            const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
              method: 'POST',
              headers: {
                Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: 'grant_type=client_credentials'
            })
            if (!tokenResponse.ok) throw new Error('Autenticazione Spotify non riuscita')
            const tokenData = await tokenResponse.json()
            accessToken = tokenData.access_token
            expiresAt = Date.now() + (tokenData.expires_in - 60) * 1000
          }

          const searchResponse = await fetch(`https://api.spotify.com/v1/search?type=track&limit=8&q=${encodeURIComponent(query)}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
          })
          if (!searchResponse.ok) throw new Error('Ricerca Spotify non riuscita')
          const data = await searchResponse.json()
          const tracks = data.tracks.items.map((track) => ({
            id: track.id,
            title: track.name,
            artist: track.artists.map((artist) => artist.name).join(', '),
            album: track.album.name,
            releaseDate: track.album.release_date,
            cover: track.album.images[0]?.url || '',
            spotifyUrl: track.external_urls.spotify,
            previewUrl: track.preview_url
          }))
          res.end(JSON.stringify({ tracks }))
        } catch (error) {
          res.statusCode = 502
          res.end(JSON.stringify({ error: error.message }))
        }
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue(), tailwindcss(), spotifyApi(env)],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    },
  }
})
