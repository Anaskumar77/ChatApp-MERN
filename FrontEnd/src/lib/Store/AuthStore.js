import { create } from "zustand";

const AuthStore = create((set /* get */) => ({
  authUser: null,
  isLoggedIn: false,
  isAuthorized: false,

  setAuthUser: (userData) => set({ authUser: userData }),

  login: (userData) => set({ authUser: userData, isLoggedIn: true }),

  logOut: () => set({ authUser: null, isLoggedIn: false }),
}));

export default AuthStore;
