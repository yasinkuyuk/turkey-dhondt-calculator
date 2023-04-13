<template>
  <div
    class="bg-slate-700 text-slate-50 w-full h-12 p-4 font-semibold text-right text-xs"
  >
    <a
      href="https://www.linkedin.com/in/yasinkuyuk"
      target="_blank"
      class="hover:underline mx-4"
      ><font-awesome-icon
        class="mr-1"
        :icon="{ prefix: 'fab', iconName: 'linkedin' }"
      ></font-awesome-icon
      >Yasin Küyük</a
    >

    <a
      href="https://github.com/yasinkuyuk/turkey-dhondt-calculator"
      target="_blank"
      class="hover:underline mx-4"
      ><font-awesome-icon
        class="mr-1"
        :icon="{ prefix: 'fab', iconName: 'github' }"
      ></font-awesome-icon
      >Kaynak Kodu</a
    >
  </div>
</template>

<script>
export default {
  name: "FooterBadge",
};
</script>
