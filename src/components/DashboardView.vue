<template>
  <div class="py-1">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="font-semibold text-sm">Oy Oranları</h3>
      </div>
      <div><province-dropdown></province-dropdown></div>
    </div>
    <div class="text-left" v-if="currentProvince.distincts">
      <el-tabs v-model="activeDistinct" @tab-click="handleDistinctClick">
        <el-tab-pane
          v-for="(distinct, index) in currentProvince.distincts"
          :key="index"
          :name="distinct.name"
          :label="distinct.name"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <div class="grid grid-cols-6 text-left gap-x-4">
      <div
        class="col-span-6 md:col-span-3 lg:col-span-2 my-2 flex flex-col items-center bg-white p-4 rounded-md shadow-lg"
        v-for="party in parties"
        :key="party.keyword"
      >
        <div class="text-sm text-gray-400 font-semibold flex text-left items-center gap-x-4">
          <div><img :src="`${party.keyword}.png`" class="h-12"/></div>
          <div>
            {{ party.name }}
          </div>
        </div>
        <el-divider></el-divider>
        <div class="flex flex-col gap-y-4 justify-center items-center">
          <div class="w-56">
            <vue-slider
              v-model="votes[party.keyword]"
              :enable-cross="false"
              tooltip-formatter="%{value}"
              :interval="0.01"
            ></vue-slider>
          </div>
          <div class="font-semibold">
            <el-input-number
              v-model="votes[party.keyword]"
              :min="0"
              :max="100"
              :step="0.1"
              size="small"
              :precision="2"
            ></el-input-number>
          </div>
        </div>
      </div>
      <div
        class="col-span-6 md:col-span-3 lg:col-span-2 my-2 flex flex-col items-center bg-white p-4 rounded-md shadow-lg"
      >
        <div class="text-sm text-gray-400 font-semibold">Diğer</div>
        <el-divider></el-divider>
        <div class="flex flex-col gap-y-4 justify-center items-center">
          <div class="w-56">
            <vue-slider
              v-model="otherVotes"
              :enable-cross="false"
              tooltip-formatter="%{value}"
              :interval="0.01"
              :disabled="true"
            ></vue-slider>
          </div>
          <div class="font-semibold">
            <el-input-number
              v-model="otherVotes"
              :min="0"
              :max="100"
              size="small"
              :precision="2"
              :disabled="true"
            ></el-input-number>
          </div>
        </div>
      </div>
      <el-dialog
        :title="`${currentProvince.name}${
          currentProvince.distincts ? ` - ${activeDistinct}` : ''
        }`"
        :visible.sync="isResultsVisible"
        :width="dialogWidth"
        class="rounded-md"
        id="results"
      >
        <div class="text-center">
          <div class="w-full grid grid-col-1 md:grid-cols-2 my-4">
            <div class="flex items-center gap-1 mb-1">
              <div class="text-sm text-gray-400">Seçmen Sayısı:</div>
              <div class="text-sm font-semibold">-</div>
            </div>
            <div class="flex items-center gap-1">
              <div class="text-sm text-gray-400">
                Toplam Milletvekili Sayısı:
              </div>
              <div class="text-sm font-semibold">
                {{ provinceData.deputyCount }}
              </div>
            </div>
          </div>
          <div class="grid grid-cols-4 gap-2">
            <div
              v-for="party in Object.keys(votes)"
              :key="party"
              class="border-1 text-center rounded-md shadow-lg bg-white col-span-2 md:col-span-1"
            >
              <div class="text-2xl font-semibold">
                {{ results[party] }}
              </div>
              <div class="text-gray-400 mt-1">{{ party }}</div>

              <hr class="my-1" />
              <div class="">%{{ votes[party] }}</div>
            </div>
          </div>
          <div class="w-full my-4" id="download-wrapper">
            <el-button
              @click="exportResultsAsImage"
              type="primary"
              class="font-semibold"
              ><font-awesome-icon
                icon="fa-download"
                class="mr-2"
              ></font-awesome-icon
              >Sonuçları İndir</el-button
            >
          </div>
          <div
            class="hidden text-md font-semibold text-gray-500 my-8"
            id="link-wrapper"
          >
            <div>
              <vue-qr
                text="https://www.secimrehberim.com"
                :size="100"
                backgroundColor="#fafafa"
              ></vue-qr>
            </div>
            www.secimrehberim.com
          </div>
        </div>
      </el-dialog>
    </div>
    <div
      class="px-4 py-2 text-left mt-2 mb-4 bg-red-50 rounded-md border-l-4 border-l-red-600 shadow-lg text-sm font-semibold fixed bottom-2 z-50 mr-3"
      v-if="!isValid"
    >
      <font-awesome-icon
        icon="fa-circle-exclamation"
        class="text-red-600 mr-1"
      ></font-awesome-icon>

      Toplam oy oranı %100'den fazla olamaz. Lütfen oy oranlarını tekrar gözden
      geçirin.
    </div>
    <div class="my-2 flex items-center justify-end py-4">
      <el-button @click="resetVotes" class="w-full" style="width: 100%"
        >SIFIRLA</el-button
      >
      <el-button
        @click="calculateDeputies"
        class="w-full"
        :disabled="!isValid"
        :loading="loading"
        type="primary"
        >HESAPLA</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProvinceDropdown from "./ProvinceDropdown.vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import { DhondtCalculator } from "@/utils";
import { toJpeg } from "html-to-image";
import { saveAs } from "file-saver";
import VueQr from "vue-qr";

export default {
  name: "DashboardView",
  components: {
    ProvinceDropdown,
    VueSlider,
    VueQr,
  },
  data() {
    return {
      votes: {},
      activeDistinct: "",
      provinceData: {},
      isResultsVisible: false,
      loading: false,
      results: {},
    };
  },
  methods: {
    resetVotes() {
      this.createVotes();
    },
    calculateDeputies() {
      this.loading = true;

      setTimeout(() => {
        this.results = DhondtCalculator(
          this.votes,
          this.provinceData.deputyCount
        );
        this.loading = false;
        this.isResultsVisible = true;
      }, 750);
    },
    handleDistinctClick() {
      let index = this.currentProvince.distincts.findIndex(
        (distinct) => distinct.name === this.activeDistinct
      );
      this.createVotes(index);
    },
    createVotes(index = 0) {
      this.provinceData = this.currentProvince;

      if (this.provinceData.distincts) {
        this.activeDistinct = this.currentProvince.distincts[index].name;
        this.provinceData = this.currentProvince.distincts[index];
      }
      this.parties.forEach((party) => {
        this.$set(
          this.votes,
          party.keyword,
          this.provinceData.results[party.keyword]
            ? this.provinceData.results[party.keyword]
            : 0
        );
      });
    },
    exportResultsAsImage() {
      let buttonWrapper = document.getElementById("download-wrapper");
      let linkWrapper = document.getElementById("link-wrapper");
      buttonWrapper.setAttribute("style", "display:none;");
      linkWrapper.setAttribute("style", "display:block;");
      toJpeg(document.getElementById("results"))
        .then((url) => {
          saveAs(url, this.filename);
          buttonWrapper.setAttribute("style", "display:block;");
          linkWrapper.setAttribute("style", "display:none;");
        })
        .catch((error) => {
          console.error("Resim indirilirken bir hata oluştu:", error);
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
    dialogWidth() {
      return window.innerWidth > 768 ? "50%" : "90%";
    },
    filename() {
      return `${this.currentProvince.name} ${
        this.currentProvince.distincts ? this.provinceData.name : ""
      } Sonuçları.jpeg`;
    },
    otherVotes() {
      let votes = 0;

      Object.keys(this.votes).forEach((party) => {
        votes += this.votes[party];
      });

      return 100 - votes;
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
.el-dialog {
  border-radius: 12px;
}

.el-dialog__body {
  background-color: #fafafa;
}

.el-button--primary {
  background-color: #66b1ff;
}
</style>
