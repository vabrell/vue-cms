<template>
	<b-container class="w-75">
		<h1 class="title">Kundvagn</h1>
		<b-table stacked="sm" striped hover :fields="fields" :items="items">
			<template class="text-center" v-slot:cell(image)="data">
					<img thumbnail class="img" :src="'./' + (data.item.image || 'no-image.jpg')" alt="produkt bild">
			</template>

			<template v-slot:cell(name)="data">
				<strong class="d-block">{{ data.item.name }}</strong>
				<small class="muted">{{ data.item.description }}</small>
			</template>

			<template v-slot:cell(price)="data">
				{{ data.item.price }}kr
			</template>

			<template v-slot:cell(amount)="data">
				<b-form-input
					type="number"
					class="qty"
					v-model="data.item.amount"
					@change="updateCart"
				>
					{{ data.item.amount }}
				</b-form-input>

				<b-button
					variant="link"
					size="sm"
					class="mt-2"
					@click="removeProduct(data.item)"
				>
					Ta bort
				</b-button>
			</template>
		</b-table>
		<router-link to="/checkout">
				<b-button class="m-2" variant="outline-primary">Gå till kassan</b-button>
		</router-link>
		<router-link to="/">
				<b-button class="m-2" variant="secondary">Fortsätt handla</b-button>
		</router-link>
	</b-container>
</template>

<script>
    export default {
        data() {
            return {
							fields: [
								{
									key: 'image',
									label: '',
									class: 'text-center'
								},
								{
									key: 'name',
									label: 'Produkt'
								},
								{
									key: 'price', 
									label: 'á Pris'
								},
								{
									key: 'amount',
									label: 'Antal'
								}
							],
                items: JSON.parse(localStorage.getItem('cart')),
                total: 0
            }
        },
        computed: {
            totalPrice (){
                if(this.items !== null){
                    this.items.forEach(item => {
                    this.total += item.price*item.amount
                    })
                }
                return this.total
            }
        },
        methods: {
					updateCart() {
						this.$store.commit( 'updateCart', this.items )
					},

					removeProduct( item ) {
						this.items[ this.items.indexOf( item ) ].amount = 0
						this.updateCart()
					}
				}
	}
</script>
<style scoped>

.img {
	width: 150px;
	height: 100px;
}

.qty {
	width: 75px;
}

</style>
