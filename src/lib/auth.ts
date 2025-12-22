export const auth = {
  getToken: () => localStorage.getItem("token"),

  isAuthenticated: () => {
    return Boolean(localStorage.getItem("token"));
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};
