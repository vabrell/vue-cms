<template>
        <b-container class="w-75">
					<template v-if="!orderPlaced">
						<h1 class="title">Din Order</h1>
						<b-list-group v-for="item in items" :key="item.id" class="w-25">
								<b-list-group-item class="d-flex justify-content-between align-items-center">
									{{ item.name }} 
									<b-badge variant="secondary" class="p-2">{{ item.amount }}x {{ item.price }}kr</b-badge>
								</b-list-group-item>
						</b-list-group>
						<strong>Total summa: {{ totalPrice }} kr</strong>
						<h1 class="title mt-4">Kontaktuppgifter</h1>
						
						<b-form @submit.prevent="placeOrder" class="mt-4">
							<b-form-group label="Välj hur din order skall skickas">
								<b-form-radio v-model="form.postal" value="Postnord">Postnord</b-form-radio>
							</b-form-group>

							<b-form-group v-if="form.postal">
								<b-form-group label="Namn:" label-for="firstname">
									<b-form-input id="firstname" v-model="form.firstName" required placeholder="Ditt Förnamn">
									</b-form-input>
								</b-form-group>

								<b-form-group label="Efternamn:" label-for="lastname">
									<b-form-input id="lastname" v-model="form.lastName" required placeholder="Ditt Efternamn">
									</b-form-input>
								</b-form-group>

								<b-form-group label="Telefonnummer:" label-for="telephone" description="Format: nnn-nnnnnnn">
									<b-form-input id="telephone" v-model="form.telNumber" type="tel" pattern="[0-9]{3}-[0-9]{7}" required
											placeholder="Ditt Telefonnummer">
									</b-form-input>
								</b-form-group>

								<b-form-group label="Mailaddress:" label-for="email">
									<b-form-input id="email" v-model="form.mail" type="email" required placeholder="Din mailaddress">
									</b-form-input>
								</b-form-group>
							</b-form-group>

							<b-form-group label="Betalningsmetod" v-if="contactComplete">
								<b-form-radio v-model="form.payment" value="Faktura">Faktura</b-form-radio>
							</b-form-group>

							<b-button :disabled="!formComplete" :class="{ 'disabled': !formComplete }" class="m-2" type="submit" variant="outline-success">Köp</b-button>
							<router-link to="/">
								<b-button class="m-2" variant="secondary">Avbryt</b-button>
							</router-link>
						</b-form>
					</template>

					<template v-if="orderPlaced">
						<h2>Din beställning är nu mottagen!</h2>
						<p>Tack för din beställning. Vi kommer att hantera din beställning så snart vi kan.</p>
						<p><strong>Ordernummer:</strong> {{ orderNumber }}</p>
					</template>

			</b-container>
</template>

<script>
    export default {
        data() {
            return {
                items: JSON.parse(localStorage.getItem('cart')),
                total: 0,
                form: {
										postal: '',
                    firstName: '',
                    lastName: '',
                    mail: '',
                    telNumber: '',
										payment: ''
                },
							orderPlaced: false,
							orderNumber: null
            }
        },
        computed: {
            totalPrice() {
                this.items.forEach(item => {
                    this.total += item.price * item.amount
                })
                return this.total
            },
					
					contactComplete() {
						return this.form.postal.length > 1 
							&& this.form.firstName.length > 1 
							&& this.form.lastName.length > 1 
							&& this.form.mail.length > 1 
							&& this.form.telNumber.length > 1
					},

					formComplete() {
						return this.form.postal.length > 1 
							&& this.form.firstName.length > 1 
							&& this.form.lastName.length > 1 
							&& this.form.mail.length > 1 
							&& this.form.telNumber.length > 1 
							&& this.form.payment.length > 1
					}
        },

			methods: {
				placeOrder() {
					// TODO: Place order to database

					this.$store.commit( 'clearCart' )
					this.orderPlaced = !this.orderPlaced
					this.orderNumber = '0004358'
				}
			}
    };
</script>
<style>

</style>
