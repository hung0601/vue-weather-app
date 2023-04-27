import { createStore } from "vuex";
import getWeatherData from "@/api/weather";
import languageData from "@/language/language.json";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase";
export default createStore({
  state: {
    info: null,
    searchLst: [],
    user: {
      loggedIn: false,
      data: null,
    },
    language: "vn",
    lang: languageData,
    leftbarview: true,
  },
  getters: {
    user(state) {
      return state.user;
    },
    getLangData: (state) => (payload) => {
      return state.lang[state.language][payload];
    },
  },
  mutations: {
    addToSearchLst(state, payload) {
      state.searchLst.push({ value: payload });
    },
    setLanguage(state, payload) {
      state.language = payload;
    },
    toggleLeftbar(state) {
      state.leftbarview = !state.leftbarview;
    },
    setData(state, payload) {
      state.info = null;
      state.info = payload;
      //console.log(state.info);
    },
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
  },
  actions: {
    setDataAsync({ commit }, payload) {
      commit("setData", null);
      getWeatherData(payload).then(function (val) {
        commit("setData", val);
        // console.log(val);
      });
    },

    async register(context, { email, password, name }) {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (response) {
        context.commit("SET_USER", response.user);
        // response.user.updateProfile({ displayName: name });
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then(() => {
            console.log("Update username");
            console.log(auth.currentUser);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        throw new Error("Unable to register user");
      }
    },

    async logIn(context, { email, password }) {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response) {
        context.commit("SET_USER", response.user);
        context.commit("SET_LOGGED_IN", true);
      } else {
        throw new Error("login failed");
      }
    },

    async logOut(context) {
      await signOut(auth);
      context.commit("SET_USER", null);
      context.commit("SET_LOGGED_IN", false);
    },
  },
  modules: {},
});
