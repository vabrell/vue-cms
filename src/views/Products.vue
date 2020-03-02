<template>
  <b-container>

    <AddProduct v-if="action === 'new'" />

    <EditProduct v-if="action === 'edit' && id" :id="id" />

    <ShowProducts v-if="!action" />

  </b-container>
</template>

<script>
import AddProduct from '@/components/products/AddProduct.vue'
import ShowProducts from '@/components/products/ShowProducts.vue'
import EditProduct from '@/components/products/EditProduct.vue'

export default {
  data() {
    return {
      action: this.$route.params.action,
      id: Number(this.$route.params.id)
    }
  },

  components: {
    AddProduct,
    EditProduct,
    ShowProducts
  }
}
</script>