<template>
	<small>
		<b-icon icon="grid-fill" rotate="45" :variant="variant" /> {{ status }}
	</small>
</template>

<script>
export default {
	data() {
		return {
			variant: null,
			status: null,
			qty: ''
		}
	},

	created() {

		fetch('http://localhost:8080/api/settings?name=show_stock')
			.then(response => response.json())
			.then(result => {
				result.value === 'true'
					? this.qty = ` (${this.stock})`
					: this.qty = ''

				if (this.stock < 1) {
					this.variant = 'danger'
					this.status = 'Ej i lager'
				}
				else if (this.stock > 1 && this.stock <= 5) {
					this.variant = 'warning'
					this.status = `Få i lager${this.qty}`
				}
				else {
					this.variant = 'success'
					this.status = `I lager${this.qty}`
				}
			})
	},
	props: {
		stock: {
			type: Number,
			required: true
		}
	}
}
</script>

<style></style>

