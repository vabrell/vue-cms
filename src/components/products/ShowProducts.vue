<template>
	<section class="mt-3">
    <b-button size="sm" variant="primary" href="/admin/products/new">
      <strong>Lägg till produkt</strong>
    </b-button>
		<b-table class="mt-3" :fields="fields" :items="products">
      <template v-slot:cell(name)="data">
        <a :href="`/admin/products/edit/${data.item.id}`">{{ data.item.name }}</a>
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
		fetch('http://localhost:8080/api/products')
			.then(response => response.json())
			.then(result => {
				this.products = result
			})
	}
}
</script>
