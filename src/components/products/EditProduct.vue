<template>
	<section class="mb-3">
		<router-link class="mt-3 btn btn-sm btn-primary" to="/admin/products">
			&laquo; Tillbaka
		</router-link>

		<b-alert
			variant="success"
			dismissible
			@dismissed="dismissCoutdown = 0"
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
			<b-form-group id="name-group" label="Produkt namn" label-for="name">
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
					step="0.01"
					min="0"
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
					min="0"
					v-model="product.stock"
					placeholder="Produktens lagersaldo"
					required
				/>
			</b-form-group>

			<b-form-group
				id="image-group"
				label="Produkt bild"
				label-for="image"
			>
				<b-form-file
					v-model="product.file"
					placeholder="Välj en ny bild eller släpp här..."
					drop-placeholder="Släpp bilden här..."
					v-if="newImage"
				/>

				<b-img
					thumbnail
					fluid
					class="w-25"
					:src="product.image"
					v-if="!newImage"
				/>

				<div class="mt-2">
					<b-button 
						variant="secondary" 
						size="sm" 
						@click="showNewImage" 
						v-if="!newImage"
					>
						Ny bild
					</b-button>
				</div>
			</b-form-group>

      <b-form-group label="Kategorier">
        <b-form-group
          v-for="category in categories"
          :key="category.id"
          :label="category.name"
        >
          <b-button-group>
            <b-button
              v-for="option in category.options"
              :key="option.text"
              :pressed.sync="option.value"
              variant="outline-secondary"
            >
              {{ option.text }}
            </b-button>
          </b-button-group>
        </b-form-group>
      </b-form-group>

			<b-button type="submit" variant="primary">Uppdatera</b-button>
			<b-button class="ml-3" @click="removeProduct" variant="outline-danger"
				>Ta bort</b-button
			>
		</b-form>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				product: null,
				dismissCountDown: 0,
        newImage: false,
        categories: null
			}
		},

		props: {
			id: {
				type: Number,
        required: true
			}
		},

		created() {
      this.getCategories()
      this.getProduct()
		},

		methods: {
			getProduct() {
				fetch(`/api/products/${this.id}`)
					.then(response => response.json())
					.then(result => {
            result.categories = JSON.parse( result.categories )
            this.product = result
            
            this.product.categories.forEach( pCategory => {
              this.categories.map( category => {
                if ( category.name === pCategory.name ) {
                  category.options = pCategory.options
                }
              })
            })
					})
      },
      
      getCategories() {
        fetch( '/api/categories' )
          .then( response => response.json() )
          .then( result => {
            result.map( obj => obj.options = JSON.parse( obj.options ) )
            result.forEach( category => {
              const reformat = []
              category.options.forEach( option => {
                reformat.push( {
                  text: option,
                  value: false
                })
              })
              category.options = reformat
            })

            this.categories = result
          })
      },

			updateProduct() {
        const formData = new FormData(),
          categories = JSON.stringify(this.categories)
				Object.entries(this.product).forEach(data => {
					formData.append(data[0], data[1])
        })
        
        formData.append( 'categories', categories )

				fetch(`/api/products/${this.id}`, {
					body: formData,
					method: 'PUT'
				})
					.then(response => response.json())
					.then(() => {
						this.dismissCountDown = 5
						this.getProduct()
						this.newImage = false
					})
			},

			removeProduct() {
				fetch(`/api/products/${this.id}`, {
					method: 'DELETE'
				})
					.then(response => response.json())
					.then(result => {
						if (!result.error) {
							this.$router.replace({
								name: 'Products'
							})
							this.$emit('product-deleted')
						}
					})
			},

			showNewImage() {
				this.newImage = true
			},

			countDownChange(dismissCountDown) {
				this.dismissCountDown = dismissCountDown
			}
		}
	}
</script>
