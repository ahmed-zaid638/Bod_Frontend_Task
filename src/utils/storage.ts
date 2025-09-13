const TOKEN_KEY = "app_token";
const USER_KEY = "app_user";

export const storage = {
  // Save / get / remove token
  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  // Save / get / remove user object
  saveUser(user: unknown) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  getUser<T = unknown>(): T | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  },
  removeUser() {
    localStorage.removeItem(USER_KEY);
  },

  // Clear everything at once
  clear() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
