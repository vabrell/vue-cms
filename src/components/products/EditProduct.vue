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
				newImage: false
			}
		},

		props: {
			id: {
				type: Number,
				required: true
			}
		},

		created() {
			this.getProduct()
		},

		methods: {
			getProduct() {
				fetch(`/api/products/${this.id}`)
					.then(response => response.json())
					.then(result => {
						this.product = result
					})
			},

			updateProduct() {
				const formData = new FormData()
				Object.entries(this.product).forEach(data => {
					formData.append(data[0], data[1])
				})

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
