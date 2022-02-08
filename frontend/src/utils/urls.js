const BASE_URL_API = 'http://localhost:8080' // Heroku
const BASE_URL_FE = 'http://localhost:3000' // Netlify

export const API_URL = (slug) => `${BASE_URL_API}/${slug}`

export const API_URL_USER = (slug, id) => `${BASE_URL_API}/${slug}?id=${id}`

export const API_URL_COLLECTION = (slug, id) =>
  `${BASE_URL_API}/${slug}/collections?collection=${id}`

export const API_URL_OPEN = (id) => `${BASE_URL_API}/open/${id}`

export const API_URL_OPENME = (id) => `${BASE_URL_FE}/open/${id}`
