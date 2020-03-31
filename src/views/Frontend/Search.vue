<template>
  <b-container>
    <SearchProducts :query="$route.query.s" />
    <Gallery :products="products" />
  </b-container>
</template>

<script>
import SearchProducts from '@/components/products/SearchProducts'
import Gallery from '@/components/layout/FpGallery'

export default {
  data() {
    return {
      products: null
    }
  },

  created() {
    this.getProducts()
  },
  
  updated() {
    this.getProducts()
  },

  methods: {
    async getProducts() {
      const search = await fetch(`/api/products?search=${ this.$route.query.s }`),
        products = await search.json()

      this.products = products
    }
  },

  components: {
    SearchProducts,
    Gallery
  }

}
</script>

<style>

</style>