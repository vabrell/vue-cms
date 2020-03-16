<template>
    <div>
        <Navbar />
        <b-container class="w-75">
            <h1 class="title">Kundvagn</h1>
            <b-table striped hover :fields="fields" :items="items"> 
                <template v-slot:cell(image)="data">
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
            <router-link to="/">
                <b-button class="m-2" type="reset" variant="danger">Avbryt</b-button>
            </router-link>
        </b-container>
    </div>
</template>

<script>
    import Navbar from "@/components/Navbar.vue";
    export default {
        components: {
            Navbar
        },
        data() {
            return {
							fields: [
								{
									key: 'image',
									label: ''
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
