const BASE_URL = 'http://localhost:8080' //Heroku
const BASE_URL_NETLIFY = 'http://localhost:3000'

export const API_URL = (slug) => `${BASE_URL}/${slug}`

export const API_URL_USER = (slug, id) => `${BASE_URL}/${slug}?id=${id}`

export const API_URL_COLLECTION = (slug, id) =>
  `${BASE_URL}/${slug}/collections?collection=${id}`

export const API_URL_OPEN = (id) => `${BASE_URL}/open/${id}`

export const API_URL_OPENME = (id) => `${BASE_URL_NETLIFY}/open/${id}`
