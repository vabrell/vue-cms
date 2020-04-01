<template>
	<b-container>
		<b-row>
			<b-col lg="2" md="0" v-if="categories.length > 0">
				<div class="filter">
					<h5>Filter <b-icon icon="funnel" /></h5>
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
      
      if (this.hasFilter()) {
        products = products.filter( product => this.applyFilter(product) )
      }

			this.filteredProducts = products

      }, 50)
    },
    
    applyFilter(product){
      let exists = [] 
      Object.entries(this.filters).forEach(filter => {
        if (filter[1].length > 0) {
          if ( this.flatCategories( product.categories ).includes( filter[0] ) ) {
            product.categories.forEach( category => {
              if (category.name === filter[0] ) {
                filter[1].forEach( value => {
                  if ( category.options.includes(value) ){
                    exists.push(true)
                  }
                  else {
                    exists.push(false)
                  }
                })
              }
            })
          }
          else {
            exists.push(false)
          }
        }
      })
      return exists.every(filter => filter)
    },

    hasFilter() {
      let has = false
      Object.entries(this.filters).forEach(filter => {
        if (filter[1].length > 0) {
          has = true
          return
        }
      })
      return has
    },

    flatCategories(categories) {
      const arr = []

      categories.forEach( category => {
        arr.push(category.name)
      })

      return arr
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
    categories.forEach(category => {
      category.options.sort()
    })
    products.map(obj => (obj.categories = JSON.parse(obj.categories)))

		products.forEach(product => {
			product.categories.forEach(category => {
				category.options = category.options.filter(
					option => option.value === true
        )

        // Create empty options array
        const options = []

        // Set all options as tex only
        category.options.forEach(option => {
          options.push(option.text)
        })

        // Update category options
        category.options = options

				// Setup filter
				this.filters[category.name] = []
      })
    })

		this.categories = categories
    this.products = products
    
    this.filterProducts()
  }
}
</script>

<style lang="scss" scoped>

.filter {
	box-shadow: 3px 0 5px 0 rgba(156, 156, 156, 0.3);
	padding: 10px 0;
  
  @media screen and (max-width: 758px) {
		box-shadow: 0 3px 5px 0 rgba(156, 156, 156, 0.3);
    padding: 10px;
  }
	
}
</style>
