<template>
  <div class="bg-slate-100 min-h-screen text-center">
    <div class="px-3 md:px-10 pt-4">
      <div class="grid grid-cols-3">
        <div class="col-span-3 md:col-span-1 justify-end md:pr-8 md:pt-10">
          <div
            class="px-4 mb-4 py-2 text-left mt-2 bg-amber-50 rounded-md border-l-4 border-l-yellow-600 shadow-lg text-xs"
          >
            <font-awesome-icon
              icon="fa-circle-exclamation"
              class="text-yellow-600 mr-1"
            ></font-awesome-icon>
            Millet İttifakı içerisinde yer alan
            <strong
              >Demokrasi ve Atılım Partisi(DEVA), Gelecek Partisi, Saadet
              Partisi ve Demokrat Parti;</strong
            >
            <br /><br />
            Cumhur İttifakı içerisinde yer alan
            <strong>Hür Dava Partisi(HÜDAPAR)</strong>
            seçimlere kendi listelerinden katılmadıkları için
            gösterilmemektedir.
          </div>
          <div
            class="px-4 py-2 text-left mt-2 mb-4 bg-amber-50 rounded-md border-l-4 border-l-yellow-600 shadow-lg text-xs"
          >
            <font-awesome-icon
              icon="fa-circle-exclamation"
              class="text-yellow-600 mr-1"
            ></font-awesome-icon>

            Bir il seçildiğinde, varsayılan olarak gelen veriler
            <strong>2018 Milletvekili Seçimleri </strong> doğrultusunda
            hazırlanmıştır.
          </div>

          <div
            class="px-4 py-2 text-left mt-2 mb-4 bg-amber-50 rounded-md border-l-4 border-l-yellow-600 shadow-lg text-xs"
          >
            <font-awesome-icon
              icon="fa-circle-exclamation"
              class="text-yellow-600 mr-1"
            ></font-awesome-icon>

            Kullanılan bütün veriler
            <strong>https://acikveri.ysk.gov.tr/ </strong> adresinden
            alınmıştır.
          </div>
          <div
            class="px-4 py-2 text-left mt-2 mb-4 bg-amber-50 rounded-md border-l-4 border-l-yellow-600 shadow-lg text-xs"
          >
            <font-awesome-icon
              icon="fa-circle-exclamation"
              class="text-yellow-600 mr-1"
            ></font-awesome-icon>

            <strong>Halkların Demokratik Partisi(HDP),</strong> seçimlere
            <strong>Yeşil Sol Partisi</strong> listelerinden katılacaktır. 2018
            seçim verilerinin korunabilmesi adına
            <span class="italic">Oy Oranları</span> bölümünde yer almaktadır.
          </div>
        </div>
        <div class="col-span-3 md:col-span-2">
          <h2 class="text-2xl font-semibold text-gray-400">
            Seçim 2023 - D'Hondt Simülatörü
          </h2>
          <h3 class="text-xl font-bold">{{ currentProvince.name }}</h3>

          <turkey-map></turkey-map>
        </div>
      </div>
      <div class="">
        <dashboard-view></dashboard-view>
      </div>
    </div>
    <footer-badge></footer-badge>
  </div>
</template>

<script>
import { DashboardView, FooterBadge, TurkeyMap } from "@/components";
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: { DashboardView, TurkeyMap, FooterBadge },
  computed: {
    ...mapGetters(["currentProvince"]),
  },
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

  --el-color-primary: red;
}
</style>
