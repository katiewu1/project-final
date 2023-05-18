const BASE_URL_API = 'https://project-final-iz4xutcdmq-lz.a.run.app'
const BASE_URL_FE = 'https://openme-team.netlify.app'

export const API_URL = (slug) => `${BASE_URL_API}/${slug}`

export const API_URL_USER = (slug, id) => `${BASE_URL_API}/${slug}?id=${id}`

export const API_URL_COLLECTION = (slug, id) =>
  `${BASE_URL_API}/${slug}/collections?collection=${id}`

export const API_URL_OPEN = (id) => `${BASE_URL_API}/open/${id}`

export const API_URL_OPENME = (id) => `${BASE_URL_FE}/open/${id}`
