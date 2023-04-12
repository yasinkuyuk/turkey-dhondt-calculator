<template>
  <div class="flex items-center gap-2">
    <div class="text-xs font-semibold">Seçilen İl:</div>
    <el-select
      v-model="selectedProvince"
      placeholder="Lütfen şehir seçin"
      @change="setCurrentProvince"
      size="medium"
      filterable
    >
      <el-option
        v-for="province in provinces"
        :key="province.id"
        :label="province.name"
        :value="province.id"
        :aria-selected="province.id === currentProvince.id"
      ></el-option
    ></el-select>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ProvinceDropdown",
  data() {
    return {
      selectedProvince: "",
    };
  },
  computed: {
    ...mapGetters(["provinces", "currentProvince"]),
  },
  methods: {
    setCurrentProvince(id) {
      this.$store.commit("SET_CURRENT_PROVINCE", id);
    },
  },
  mounted() {
    this.selectedProvince = this.currentProvince.id;
  },
  watch: {
    currentProvince: {
      deep: true,
      handler() {
        this.selectedProvince = this.currentProvince.id;
      },
    },
  },
};
</script>
