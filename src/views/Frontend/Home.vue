<template>
  <div class="home">
    <!-- I b-container så skall ett standard galleri med 6 produkter ligga.  -->
    <b-container>
      <b-row v-if="text" class="bg-light">
        <pre class="mx-auto">{{ text.value }}</pre>
      </b-row>
      <b-row>
        <SearchProducts />
      </b-row>
      <h2 class="text-center mt-2">Mest populära produkter</h2>
      <gallery :products="products" v-if="products"></gallery>
    </b-container>
  </div>
</template>

<script>
import SearchProducts from "../../components/products/SearchProducts";
import gallery from "../../components/layout/FpGallery";

export default {
  name: "Home",

  data() {
    return {
      text: null,
      products: null
    };
  },

  created() {
    fetch("/api/settings?name=frontPageText")
      .then(response => response.json())
      .then(result => {
        this.text = result;
      });
    fetch("/api/products/visitedclicks")
      .then(response => response.json())
      .then(result => {
        this.products = result;
      });
  },

  components: {
    SearchProducts,
    gallery
  }
};
</script>

<style scoped>
pre {
  font-family: var(--font-family-sans-serif);
  font-size: 16px;
  white-space: pre-wrap;
}
</style>
