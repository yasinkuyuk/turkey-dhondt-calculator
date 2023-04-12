<template>
  <div class="py-1">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="font-semibold text-sm">Oy Oranları</h3>
      </div>
      <div><province-dropdown></province-dropdown></div>
    </div>
    <div class="grid grid-cols-6 text-left gap-x-4">
      <div
        class="col-span-6 md:col-span-3 lg:col-span-2 my-2 flex items-center justify-between bg-white p-4 rounded-md shadow-lg"
        v-for="party in parties"
        :key="party.keyword"
      >
        <div class="text-sm text-gray-600">{{ party.name }}:</div>
        <div class="w-48">
          <vue-slider
            v-model="votes[party.keyword]"
            :enable-cross="false"
            tooltip-formatter="%{value}"
            :interval="0.01"
          ></vue-slider>
        </div>
        <div class="font-semibold">%{{ votes[party.keyword] }}</div>
      </div>
      <div
        class="col-span-6 md:col-span-3 lg:col-span-2 my-2 flex items-center justify-end py-4"
      >
        <el-button @click="resetVotes" class="w-full" style="width: 100%"
          >Sıfırla</el-button
        >
        <el-button
          @click="calculateDeputies"
          class="w-full"
          :disabled="!isValid"
          :loading="loading"
          type="primary"
          >Hesapla</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProvinceDropdown from "./ProvinceDropdown.vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import { DhondtCalculator } from "@/utils";

export default {
  name: "DashboardView",
  components: {
    ProvinceDropdown,
    VueSlider,
  },
  data() {
    return {
      votes: {},
      loading: false,
    };
  },
  methods: {
    resetVotes() {
      this.createVotes();
    },
    calculateDeputies() {
      this.loading = true;

      setTimeout(() => {
        let result = DhondtCalculator(
          this.votes,
          this.currentProvince.deputyCount
        );
        console.log(result);
        this.loading = false;
      }, 1000);
    },
    createVotes() {
      this.parties.forEach((party) => {
        this.$set(
          this.votes,
          party.keyword,
          this.currentProvince.results[party.keyword]
            ? this.currentProvince.results[party.keyword]
            : 0
        );
      });
    },
  },
  computed: {
    ...mapGetters(["parties", "provinces", "currentProvince"]),
    isValid() {
      let total = 0;
      Object.keys(this.votes).forEach((party) => {
        total += this.votes[party];
      });
      return total <= 100;
    },
  },
  mounted() {
    this.createVotes();
  },
  watch: {
    currentProvince: {
      deep: true,
      handler() {
        this.createVotes();
      },
    },
  },
};
</script>

<style>
.el-tooltip__popper.is-light {
  width: 300px;
}
</style>
