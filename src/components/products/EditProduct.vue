<template>
  <section>
    <b-button class="mt-3" size="sm" variant="primary" href="/admin/products">
      &laquo; Tillbaka
    </b-button>

    <b-alert
      variant="success"
      dismissible
      @dismissed="dismissCoutdown=0"
      @dismiss-count-down="countDownChange"
      :show="dismissCountDown"
      class="mt-3"
    >
      <strong>Produkten har uppdateras!</strong>
      <b-progress
        variant="success"
        :max="5"
        :value="dismissCountDown"
        height="4px"
        class="mt-1"
      />
    </b-alert>

    <b-form class="mt-3" @submit.prevent="updateProduct" v-if="product">
      <b-form-group
        id="name-group"
        label="Produkt namn"
        label-for="name"
      >
        <b-form-input
          id="name"
          v-model="product.name"
          required
          placeholder="Namnet på produkten"
        />
      </b-form-group>

      <b-form-group
        id="description-group"
        label="Produkt beskrivning"
        label-for="description"
      >
        <b-form-textarea
          id="description"
          v-model="product.description"
          placeholder="En kort beskrivning om produkten"
          rows="3"
          max-rows="6"
          required
        />
      </b-form-group>

      <b-form-group
        id="price-group"
        label="Produkt pris (kr)"
        label-for="price"
      >
        <b-input
          id="price"
          type="number"
          v-model="product.price"
          placeholder="Produktens pris"
          required
        />
      </b-form-group>

      <b-form-group
        id="stock-group"
        label="Produkt lagersaldo"
        label-for="stock"
      >
        <b-input
          id="stock"
          type="number"
          v-model="product.stock"
          placeholder="Produktens lagersaldo"
          required
        />
      </b-form-group>

      <b-button type="submit" variant="primary">Uppdatera</b-button> 
      <b-button class="ml-3" @click="removeProduct" variant="outline-danger">Ta bort</b-button>
    </b-form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      product: null,
      dismissCountDown: 0
    }
  },

  props: {
    id: {
      type: Number,
      required: true
    }
  },

  created() {
    fetch(`http://localhost:8080/api/products/${this.id}`)
      .then(response => response.json())
      .then(result => {
        this.product = result
      })
  },

  methods: {
    updateProduct() {
      fetch(`http://localhost:8080/api/products/${this.id}`, {
        body: JSON.stringify(this.product),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      }).then(response => response.json())
        .then(() => {
          this.dismissCountDown = 5
        })
    },

    removeProduct() {
      fetch(`http://localhost:8080/api/products/${this.id}`, {
        method: 'DELETE'
      }).then(response => response.json())
        .then(result => {
          if (!result.error) {
            this.$router.replace({
              name: 'Products'
            })
            this.$emit('product-deleted')
          }
        })
    },

    countDownChange(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    }
  }
}
</script>