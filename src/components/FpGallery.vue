<template>
  <b-row>
    <b-card-group>
      <b-col v-for="product in products" :key="product.id" lg="4" md="6">
        <b-card
          class="m-3"
          :title="product.name"
          img-src="https://picsum.photos/300/300/?image=41"
          img-alt="Image"
          img-top
        >
          <b-card-text>{{ product.description }}</b-card-text>
          <template v-slot:footer>
            <div>Pris: {{ product.price }}Kr</div>
            <small class="text-muted">Lagersaldo: {{ product.stock }}</small>
          </template>
        </b-card>
      </b-col>
    </b-card-group>
  </b-row>
</template>

<script>
export default {
  name: "FpGallery",
  data() {
    return {
      products: null
    };
  },

  created() {
    fetch("http://localhost:8080/api/products")
      .then(response => response.json())
      .then(result => {
        this.products = result;
      });
  }
};
</script>


<style>
</style>