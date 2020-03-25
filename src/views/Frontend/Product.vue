<template>
	<b-container v-if="product">
		<b-row>
			<b-col cols="8">
				<h3 class="">{{ product.name }}</h3>
				<p class="text-muted">{{ product.description }}</p>

				<p v-for="category in categories" :key="category.name">
					<strong>{{ category.name }}:</strong>
					{{ category.options.join(', ') }}
				</p>

				<h3>
          {{ product.price }} SEK
          <small>
            <Stock 
              class="d-inline-block text-right w-50"
              :stock="product.stock"
            />
          </small>
        </h3>
        

        <b-button
          @click="addToCart(product)"
          class="mt-2"
          variant="primary"
        >Lägg till i kundvagn</b-button>
			</b-col>

			<b-col cols="4">
				<b-img :src="product.image" class="img-thumbnail rounded" />
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import Stock from '../../components/products/Stock'

export default {
	data() {
		return {
			product: null
		}
	},

	created() {
		fetch(`/api/products/${this.$route.params.id}`)
			.then(response => response.json())
			.then(result => {
				result.categories = JSON.parse(result.categories)
				this.product = result
			})
	},

	computed: {
		categories() {
			const categories = []
			this.product.categories.forEach(category => {
				const _cats = []
				category.options.forEach(option => {
					if (option.value) {
						_cats.push(option.text)
					}
				})

				categories.push({
					name: category.name,
					options: _cats
				})
			})

			return categories
		}
  },
  
  components: {
    Stock
  },

	methods: {
		addToCart(product) {
			//Run addToCart mutations in store
			this.$store.commit('addToCart', product)

			//Make toast that dissapears after 5sec
			this.append = false
			this.$bvToast.toast(`Du har lagt till produkten i kundvagnen.`, {
				title: 'Notifikation',
				autoHideDelay: 1000,
				appendToast: this.append
			})
		}
	}
}
</script>

<style scoped></style>
