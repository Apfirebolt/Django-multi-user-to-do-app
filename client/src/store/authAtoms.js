
import { atom } from 'jotai';
import Cookies from 'js-cookie';
import httpClient from '../plugins/interceptor';

// Helper to safely read from storage/cookies
const getStoredToken = () => Cookies.get('token') || null;
const getStoredUser = () => {
  const user = localStorage.getItem('user_data');
  return user ? JSON.parse(user) : null;
};

// 1. Base Atoms
export const tokenAtom = atom(getStoredToken());
export const userAtom = atom(getStoredUser());

// 2. Derived Atom
export const isAuthenticatedAtom = atom((get) => {
  return Boolean(get(tokenAtom) && get(userAtom));
});

// 3. Action Atom for Login
export const loginAtom = atom(
  null,
  async (get, set, credentials) => {
    try {
      const response = await httpClient.post('login', credentials);
      const { access, refresh, userData } = response.data;

      // Save token to cookies (which httpClient expects)
      Cookies.set('token', access, { expires: 1 });
      if (refresh) {
        Cookies.set('refreshToken', refresh, { expires: 7 });
      }
      
      // Save user data to localStorage
      localStorage.setItem('user_data', JSON.stringify(userData));

      // Update Jotai state
      set(tokenAtom, access);
      set(userAtom, userData);

      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.response?.data || 'Login failed.';
      return { success: false, error: errorMsg };
    }
  }
);

// 4. Action Atom for Register
export const registerAtom = atom(
  null,
  async (get, set, registrationData) => {
    try {
      await httpClient.post('register', registrationData);
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data || 'Registration failed.';
      return { success: false, error: errorMsg };
    }
  }
);

// 5. Action Atom for Logout
export const logoutAtom = atom(
  null,
  (get, set) => {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    localStorage.removeItem('user_data');
    
    set(tokenAtom, null);
    set(userAtom, null);
  }
);