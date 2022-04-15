import decode from 'jwt-decode';

const authToken = 'auth_token';
const userEmail = 'user_email';
const userName = 'user_name';

class AuthService {
  login(auth) {
    const { token, user } = auth;
    localStorage.setItem(authToken, token);
    localStorage.setItem(userEmail, user.email);
    localStorage.setItem(userName, user.name);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem(authToken);
    localStorage.removeItem(userEmail);
    localStorage.removeItem(userName);
    window.location.assign('/');
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  getToken() {
    return localStorage.getItem(authToken);
  }

  getEmail() {
    return localStorage.getItem(userEmail);
  }

  getName() {
    return localStorage.getItem(userName);
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
