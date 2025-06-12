// WordPress Data Store Setup
// This file initializes the WordPress data stores for the application

import { createReduxStore, register } from '@wordpress/data'
import apiFetch from '@wordpress/api-fetch'

// Configure API Fetch for WordPress
if (typeof window !== 'undefined' && window.wpApiSettings) {
  apiFetch.use(apiFetch.createNonceMiddleware(window.wpApiSettings.nonce))
  apiFetch.use(apiFetch.createRootURLMiddleware(window.wpApiSettings.root))
}

// Global application store for shared state
const initialAppState = {
  loading: false,
  notifications: [],
  user: null,
  settings: {}
}

const appActions = {
  setLoading: (loading) => ({ type: 'SET_LOADING', loading }),
  addNotification: (notification) => ({ type: 'ADD_NOTIFICATION', notification }),
  removeNotification: (id) => ({ type: 'REMOVE_NOTIFICATION', id }),
  setUser: (user) => ({ type: 'SET_USER', user }),
  setSettings: (settings) => ({ type: 'SET_SETTINGS', settings })
}

const appSelectors = {
  getLoading: (state) => state.loading,
  getNotifications: (state) => state.notifications,
  getUser: (state) => state.user,
  getSettings: (state) => state.settings
}

const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.loading }
    case 'ADD_NOTIFICATION':
      return { 
        ...state, 
        notifications: [...state.notifications, { 
          id: Date.now(), 
          ...action.notification 
        }] 
      }
    case 'REMOVE_NOTIFICATION':
      return { 
        ...state, 
        notifications: state.notifications.filter(n => n.id !== action.id) 
      }
    case 'SET_USER':
      return { ...state, user: action.user }
    case 'SET_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.settings } }
    default:
      return state
  }
}

// Create and register the app store
const appStore = createReduxStore('radius-booking/app', {
  reducer: appReducer,
  actions: appActions,
  selectors: appSelectors
})

register(appStore)

export { appStore }