<template>
	<b-container>
		<b-alert
			variant="success"
			dismissible
			@dismissed="dismissCoutdown = 0"
			@dismiss-count-down="countDownChange"
			:show="dismissCountDown"
			class="mt-3"
		>
			<strong>Produkten har tagits bort!</strong>
			<b-progress
				variant="success"
				:max="5"
				:value="dismissCountDown"
				height="4px"
				class="mt-1"
			/>
		</b-alert>

		<h2>Produkter</h2>

		<AddProduct v-if="$route.name === 'AddProduct'" />

		<EditProduct
			@product-deleted="productDeleted"
			v-else-if="
				$route.name === 'EditProduct' && !isNaN(Number($route.params.id))
			"
			:id="Number($route.params.id)"
		/>

		<ShowProducts v-else />
	</b-container>
</template>

<script>
	import AddProduct from '@/components/products/AddProduct.vue'
	import ShowProducts from '@/components/products/ShowProducts.vue'
	import EditProduct from '@/components/products/EditProduct.vue'

	export default {
		data() {
			return {
				dismissCountDown: 0
			}
		},

		methods: {
			countDownChange(dismissCountDown) {
				this.dismissCountDown = dismissCountDown
			},

			productDeleted() {
				this.dismissCountDown = 5
			}
		},

		components: {
			AddProduct,
			EditProduct,
			ShowProducts
		}
	}
</script>
