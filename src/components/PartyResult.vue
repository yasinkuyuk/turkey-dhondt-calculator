<template>
  <div
    class="border-1 text-center rounded-md shadow-md bg-white col-span-2 md:col-span-1 flex hover:shadow-lg"
  >
    <div
      class="w-20 m-auto pl-3 border-r-[1px] border-gray-100 shadow-xl h-full flex items-center"
    >
      <img :src="`${party}.png`" class="h-10" />
    </div>
    <vr></vr>
    <div class="w-full">
      <div class="text-4xl font-semibold">
        {{ result || 0 }}
        <span v-if="result < previousDeputyCount" class="text-red-600"
          ><font-awesome-icon icon="fa-caret-down" size="xs"></font-awesome-icon
        ></span>
        <span
          class="text-emerald-600"
          v-if="(result || 0) > (previousDeputyCount || 0)"
        >
          <font-awesome-icon icon="fa-caret-up" size="xs"></font-awesome-icon>
        </span>
      </div>

      <hr class="my-1" />
      <div class="mb-2">%{{ vote }}</div>
      <hr class="my-1" />
      <div class="mb-2 text-[10px] flex justify-center gap-x-1">
        <div class="text-gray-400">2018 Milletvekili:</div>
        <div class="text-gray-600">{{ previousDeputyCount || 0 }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["result", "party", "vote", "previousDeputyCount"],
};
</script>
