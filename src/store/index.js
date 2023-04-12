import Vue from "vue";
import Vuex from "vuex";
import provinces from "@/assets/provinces.json";
import parties from "@/assets/parties.json";

Vue.use(Vuex);

const defaultProvince = provinces.filter((province) => province.id === "34")[0];

const state = {
  provinces: provinces,
  currentProvince: localStorage.getItem("currentProvince")
    ? JSON.parse(localStorage.getItem("currentProvince"))
    : defaultProvince,
  parties: localStorage.getItem("parties")
    ? JSON.parse(localStorage.getItem("parties"))
    : parties,
};

const getters = {
  provinces: (state) => {
    return state.provinces;
  },
  currentProvince: (state) => {
    return state.currentProvince;
  },
  parties: (state) => {
    return state.parties;
  },
};

const mutations = {
  SET_CURRENT_PROVINCE: (state, provinceId) => {
    state.currentProvince = state.provinces.filter(
      (province) => province.id === provinceId
    )[0];

    localStorage.setItem(
      "currentProvince",
      JSON.stringify(state.currentProvince)
    );
  },
};

const actions = {};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});

export default store;
