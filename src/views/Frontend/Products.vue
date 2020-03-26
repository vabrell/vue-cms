<template>
	<b-container>
		<b-row>
			<b-button class="toggle-filter">
				<b-icon icon="filter" />
			</b-button>
			<b-col lg="2" md="0">
				<div class="filter">
					<h5>Filter</h5>
					<div v-for="category in categories" :key="category.id" class="mt-3">
						<strong>{{ category.name }}</strong>
						<b-checkbox-group
							:options="category.options"
							v-model="filters[category.name]"
              @change="filterProducts"
						/>
					</div>
				</div>
			</b-col>
			<b-col>
				<Gallery :products="filteredProducts" />
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import Gallery from '../../components/layout/FpGallery'

export default {
	components: {
		Gallery
	},

	methods: {
		filterProducts() {
      setTimeout( () => {
			let products = this.products
			Object.entries(this.filters).forEach(filter => {
				if (filter[1].length > 0) {
          filter[ 1 ].forEach( value => {
            products = products.filter( product => product.categories[ filter[ 0 ] ].includes( value ) )
          })
				}
			})

			this.filteredProducts = products

      }, 10)
		}
	},

	data() {
		return {
			categories: [],
      products: [],
      filteredProducts: [],
			filters: {}
		}
	},

	async created() {
		const getCategories = await fetch('/api/categories'),
			getProducts = await fetch('/api/products'),
			categories = await getCategories.json(),
			products = await getProducts.json()

		categories.map(obj => (obj.options = JSON.parse(obj.options)))
		products.map(obj => (obj.categories = JSON.parse(obj.categories)))
		products.forEach(product => {
			// Create new empty cateories array
			const categories = []

			product.categories.forEach(category => {
				category.options = category.options.filter(
					option => option.value === true
				)
				// Create new empty options array
				const options = []
				// Put all option.text in the options array
				category.options.forEach(option => {
					options.push(option.text)
				})
				// Set the new array
				category.options = options

				// Add new object key value pair
				categories[category.name] = category.options

				// Setup filter
				this.filters[category.name] = []
			})

			// Set the new categories
			product.categories = categories
		})

		this.categories = categories
    this.products = products
    
    this.filterProducts()
  }
}
</script>

<style lang="scss" scoped>
.toggle-filter {
	position: absolute;
	left: 5%;
	display: none;
	z-index: 999 !important;

	@media screen and (max-width: 758px) {
		display: block;
	}
}

.filter {
	box-shadow: 3px 0px 2px 0 rgba(156, 156, 156, 0.3);
	padding: 10px 0;
}
</style>
