import Vue from "vue";
import Vuex from "vuex";
import provinces from "@/assets/provinces.json";

Vue.use(Vuex);

const state = {
  provinces: provinces,
  currentProvince: null,
};

const getters = {
  provinces: (state) => {
    return state.provinces;
  },
  currentProvince: (state) => {
    return state.currentProvince;
  },
};

const mutations = {
  SET_CURRENT_PROVINCE: (state, provinceId) => {
    state.currentProvince = state.provinces.filter(
      (province) => province.cityCode === provinceId
    )[0];
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
