// WordPress REST API integration
// This file can be used for WordPress REST API calls when integrating with WordPress

export const wordPressApi = {
  // Base URL for WordPress REST API
  baseUrl: '/wp-json/wp/v2',
  
  // Generic GET request
  async get(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('API GET error:', error)
      throw error
    }
  },
  
  // Generic POST request
  async post(endpoint, data) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': window.wpApiSettings?.nonce || ''
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('API POST error:', error)
      throw error
    }
  },
  
  // Generic PUT request
  async put(endpoint, data) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': window.wpApiSettings?.nonce || ''
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('API PUT error:', error)
      throw error
    }
  },
  
  // Generic DELETE request
  async delete(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'X-WP-Nonce': window.wpApiSettings?.nonce || ''
        }
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('API DELETE error:', error)
      throw error
    }
  }
}

// Local storage utilities for data persistence
export const localStorage = {
  get(key) {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('LocalStorage get error:', error)
      return null
    }
  },
  
  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('LocalStorage set error:', error)
    }
  },
  
  remove(key) {
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      console.error('LocalStorage remove error:', error)
    }
  }
}