export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "gccf123";

export function loginAdmin(username: string, password: string) {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    localStorage.setItem("isAdmin", "true");
    return true;
  }
  return false;
}

export function isAdminLoggedIn() {
  return localStorage.getItem("isAdmin") === "true";
}

export function logoutAdmin() {
  localStorage.removeItem("isAdmin");
}
