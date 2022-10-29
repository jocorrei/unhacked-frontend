<template>
  <div>
    <li class="py-4 flex">
      <div class="ml-3">
        <p class="text-sm font-medium text-gray-900">Name</p>
        <p class="text-sm text-gray-500">City</p>
      </div>
    </li>
  </div>
</template>

<script>
  export default {
    name: "HomeView",
    props: {
      msg: String,
    },
  };
</script>

<style scoped>
</style>
