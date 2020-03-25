<template>
  <div class="home">
    <!-- I b-container så skall ett standard galleri med 6 produkter ligga.  -->
    <b-container>
      <FpGallery></FpGallery>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import FpGallery from "@/components/layout/FpGallery.vue";
export default {
  name: "Home",
  components: {
    FpGallery
  }
};
</script>
