<template>
  <b-container>
    <h2>Dashboard</h2>

    <Interface class="mt-5" />
  </b-container>
</template>

<script>
import Interface from "./layout/Interface.vue";
export default {
  name: "Dashboard",
  components: {
    Interface
  }
};
</script>