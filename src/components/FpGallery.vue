<template>
  <b-row>
    <b-card-group deck>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </b-card-group>
  </b-row>
</template>

<script>
import ProductCard from "./ProductCard";
export default {
  name: "FpGallery",
  components: {
    ProductCard
  }
};
</script>

<style>
</style>