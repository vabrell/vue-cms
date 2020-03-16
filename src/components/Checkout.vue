<template>
    <div>
        <Navbar />
        <b-container class="w-50">
                        <h1 class="title">Din Order</h1>
            <b-list-group v-for="item in items" :key="item.id">
                <b-list-group-item>{{ item.name }} x {{ item.amount }}</b-list-group-item>
            </b-list-group>
            <b-list-group-item>Total summa: {{ totalPrice }} kr</b-list-group-item>
            <h1 class="title mt-4">Kontaktuppgifter</h1>
            <b-form class="mt-4" v-if="show">
                <b-form-group label="Namn:" label-for="input-1">
                    <b-form-input v-model="form.name" required placeholder="Ditt Förnamn">
                    </b-form-input>
                </b-form-group>

                <b-form-group label="Efternamn:" label-for="input-2">
                    <b-form-input required placeholder="Ditt Efternamn">
                    </b-form-input>
                </b-form-group>

                <b-form-group label="Telefonnummer:" label-for="input-3">
                    <b-form-input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required
                        placeholder="Ditt Telefonnummer">
                    </b-form-input>
                </b-form-group>

                <b-form-group label="Mailaddress:" label-for="input-4">
                    <b-form-input type="email" required placeholder="Din mailaddress">
                    </b-form-input>
                </b-form-group>
            </b-form>
            <router-link to="/">
                <b-button class="m-2" variant="success">Godkänn</b-button>
            </router-link>
            <router-link to="/">
                <b-button class="m-2" variant="danger">Avbryt</b-button>
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
                items: JSON.parse(localStorage.getItem('cart')),
                total: 0,
                form: {
                    firstName: '',
                    lastName: '',
                    mail: '',
                    telNumber: '',
                },
                show: true
            }
        },
        computed: {
            totalPrice() {
                this.items.forEach(item => {
                    this.total += item.price * item.amount
                })
                return this.total
            }
        }
    };
</script>
<style>

</style>