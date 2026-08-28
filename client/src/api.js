// Base URL for the API. In development this defaults to "/api", which Vite
// proxies to the Express server (see vite.config.js). In production, set
// VITE_API_URL to your deployed backend, e.g. https://api.example.com/api
const BASE_URL = import.meta.env.VITE_API_URL || '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  const body = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(body.message || `Request failed (${res.status})`)
  }

  return body
}

export const itemsApi = {
  list: () => request('/items'),
  create: (data) => request('/items', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) =>
    request(`/items/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  remove: (id) => request(`/items/${id}`, { method: 'DELETE' }),
}
