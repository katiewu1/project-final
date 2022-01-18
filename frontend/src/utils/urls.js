const BASE_URL = 'http://localhost:8080'

export const API_URL = (slug) => `${BASE_URL}/${slug}`

export const API_URL_USER = (slug, id) => `${BASE_URL}/${slug}?id=${id}`
