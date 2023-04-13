<template>
  <svg
    id="svg-turkey-map"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:amcharts="https://amcharts.com/ammap"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    viewBox="0 0 800 350"
  >
    <g>
      <path
        v-for="province in turkeyMap"
        :key="province.id"
        :class="`transition-transform cursor-pointer stroke-slate-400 stroke-[0.3] ${
          currentProvince?.id === province.id
            ? 'fill-blue-500 hover:fill-blue-500'
            : 'fill-slate-200 hover:fill-slate-300'
        }`"
        @click="setCurrentProvince(province.id)"
        :id="province.id"
        :d="province.d"
        ref="provincePaths"
      ></path>
    </g>
  </svg>
</template>

<script>
import turkeyMap from "@/assets/turkey-map";
import { mapGetters } from "vuex";

export default {
  name: "TurkeyMap",
  data() {
    return { turkeyMap };
  },
  computed: {
    ...mapGetters(["currentProvince"]),
  },
  methods: {
    setCurrentProvince(id) {
      this.$store.commit("SET_CURRENT_PROVINCE", id);
    },
  },
};
</script>
