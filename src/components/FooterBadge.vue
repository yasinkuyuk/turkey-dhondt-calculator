<template>
  <div
    class="bg-slate-300 text-slate-700 w-full h-12 p-4 font-semibold text-xs"
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
      >Source Code</a
    >
  </div>
</template>

<script>
export default {
  name: "FooterBadge",
};
</script>
