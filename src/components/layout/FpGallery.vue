<template>
  <div>
    <b-row>
      <b-card-group class="w-100">
        <b-col v-for="product in products" :key="product.id" lg="4" md="6">
        
          <b-card
            class="m-3"
            :title="product.name"
            img-top
          >
            <template v-slot:header class="p-0">
              <router-link
                :to="`/product/${ product.id }`"
                class="text-decoration-none"
              >
              <b-img :src="'./' + (product.image || 'no-image.jpg')" />
              </router-link>
            </template>
            <b-card-text>{{ product.description }}</b-card-text>
            <template v-slot:footer>
              <div class="d-inline-block w-50">Pris: {{ product.price }}Kr</div>
              <Stock class="d-inline-block text-right w-50" :stock="product.stock" />
              <b-button
                @click="addToCart(product)"
                class="mt-2"
                variant="primary"
              >Lägg till i kundvagn</b-button>
            </template>
          </b-card>
        </b-col>
      </b-card-group>
    </b-row>
  </div>
</template>

<script>
import Stock from "@/components/products/Stock";

export default {
  name: "FpGallery",
  data() {
    return {
      append: true,
      cartCount: 0,
      text: null
    };
  },
  components: {
    Stock
  },
  methods: {
    addToCart(product) {
      //Run addToCart mutations in store
      this.$store.commit("addToCart", product);

      //Make toast that dissapears after 5sec
      this.append = false;
      this.$bvToast.toast(`Du har lagt till produkten i kundvagnen.`, {
        title: "Notifikation",
        autoHideDelay: 1000,
        appendToast: this.append
      });
    }
  },

  props: {
    products: {
      type: Array,
      required: true
    }
  }
};
</script>


<style scoped>


img {
  height: 250px;
  width:100%
}

.card-header {
  padding: 0 !important;
}
</style>

