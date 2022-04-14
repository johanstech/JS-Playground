import decode from 'jwt-decode';

const authToken = 'auth_token';

class AuthService {
  login(token) {
    localStorage.setItem(authToken, token);
  }

  logout() {
    localStorage.removeItem(authToken);
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  getToken() {
    return localStorage.getItem(authToken);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
}

export default new AuthService();
