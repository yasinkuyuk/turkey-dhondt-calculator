<template>
  <div class="bg-slate-100 min-h-screen text-center">
    <div class="p-10">
      <div class="mb-8">
        <h2 class="text-2xl font-semi bold">Seçim 2023 - D'Hondt Simülatörü</h2>
      </div>
      <div class="lg:px-72">
        <turkey-map></turkey-map>
      </div>
      {{ currentProvince }}
    </div>
  </div>
</template>

<script>
import { TurkeyMap } from "@/components";
import { mapGetters } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapGetters(["currentProvince", "provinces"]),
  },
  components: { TurkeyMap },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
