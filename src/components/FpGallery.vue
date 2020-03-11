<template>
  <b-row>
    <b-card-group class="w-100">
      <b-col v-for="product in products" :key="product.id" lg="4" md="6">
        <b-card
          class="m-3"
          :title="product.name"
          :img-src="'./' + product.image"
          img-alt="Image"
          img-top
        >
          <b-card-text>{{ product.description }}</b-card-text>
          <template v-slot:footer>
            <div>Pris: {{ product.price }}Kr</div>
						<Stock :stock="product.stock" />
          </template>
        </b-card>
      </b-col>
    </b-card-group>
  </b-row>
</template>

<script>
import Stock from '@/components/products/Stock'

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
  },

	components: {
		Stock
	}
};
</script>


<style>
</style>
