import axios from 'axios'

/**
 * Axios instance for future ECI / booth lookup APIs.
 * Base URL can be set via VITE_API_BASE_URL.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

export default api
