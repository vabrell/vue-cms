<template>
  <div class="home">
    <Hero></Hero>
    <Navbar></Navbar>
    <!-- I b-container så skall ett standard galleri med 6 produkter ligga.  -->
    <b-container>
      <FpGallery></FpGallery>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import Navbar from "@/components/Navbar.vue";
import FpGallery from "@/components/FpGallery.vue";
export default {
  name: "Home",
  components: {
    Hero,
    Navbar,
    FpGallery
  }
};
</script>
