<template>
	<section class="mt-3">
    <router-link class="btn btn-sm btn-primary" to="/admin/products/new">Lägg till produkt</router-link>
		<b-table class="mt-3" :fields="fields" :items="products">
      <template v-slot:cell(name)="data">
        <router-link :to="`/admin/products/edit/${data.item.id}`">{{ data.item.name }}</router-link>
      </template>
		</b-table>
	</section>
</template>

<script>
export default {
	data() {
		return {
			products: null,
			fields: [
				{ name: 'Namn' },
        { description: 'Beskrivning' },
        { price: 'Pris (kr)' },
        { stock: 'Lagersaldo' }
			]
		}
	},

	created() {
		fetch('/api/products')
			.then(response => response.json())
			.then(result => {
				this.products = result
			})
	}
}
</script>
