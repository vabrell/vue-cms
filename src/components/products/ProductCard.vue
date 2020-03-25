<template>
  <div>
    <b-col v-for="product in products" :key="product.id" lg="4" md="6">
      <b-card
        class="m-3"
        title="Title"
        img-src="https://picsum.photos/300/300/?image=41"
        img-alt="Image"
        img-top
      >
        <b-card-text>
          This is a wider card with supporting text below as a natural lead-in to additional content.
          This content is a little bit longer.
        </b-card-text>
        <template v-slot:footer>
          <small class="text-muted">Last updated 3 mins ago</small>
        </template>
      </b-card>
    </b-col>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  data() {
    return {
      products: null,
      fields: [
        { name: "Namn" },
        { description: "Beskrivning" },
        { price: "Pris (kr)" },
        { stock: "Lagersaldo" }
      ]
    };
  },

  created() {
    fetch("/api/products")
      .then(response => response.json())
      .then(result => {
        this.products = result;
      });
  }
};
</script>

<style>
</style>