<template>
    <section v-if="order" class="mb-3">
        <h2 class="mt-3">Ordrar</h2>
        <router-link class="my-3 btn btn-sm btn-primary" to="/admin/backoffice">
            &laquo; Tillbaka
        </router-link>

        <b-alert variant="success" dismissible @dismissed="dismissCoutdown = 0" @dismiss-count-down="countDownChange"
            :show="dismissCountDown" class="mt-3">
            <strong>Ordern har uppdateras!</strong>
            <b-progress variant="success" :max="5" :value="dismissCountDown" height="4px" class="mt-1" />
        </b-alert>

        <h5 class="my-3">Ordernummer: {{ order.id }}</h5>
        
        <h5 class="mb-3">Faktura: <a :href="`/invoices/${ order.invoice }`">Visa faktura</a></h5>

        <b-table stacked="sm" striped hover :fields="fields" :items="order.products"></b-table>

        <h5 class="mt-3">Betalningsmetod: <small>{{ order.payment }}</small></h5>

        <h5 class="mt-3">Leveranssätt: <small>{{ order.shipping }}</small></h5>

        <h5 class="mt-3">Leveransdetaljer:</h5>
				<p>{{ order.details.firstname }} {{ order.details.lastname }}</p>
				<p>{{ order.details.address }}</p>

        <h5 class="mt-3">Kontaktuppgifter: <small>{{ order.details.email }}, {{ order.details.telephone }}</small></h5>

        <b-form class="mt-3 w-75" @submit.prevent="updateStatus" v-if="order">
            <b-form-select class="my-3" v-model="selected" :options="status"></b-form-select>
            <b-button type="submit" variant="primary">Uppdatera</b-button>
        </b-form>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                order: null,
                dismissCountDown: 0,
                fields: [{
                        key: 'name',
                        label: 'Produktnamn',
                    },
                    {
                        key: 'amount',
                        label: 'Antal'
                    }
                ],
                selected: null,
                status: [{
                        value: 'Mottagen',
                        text: 'Mottagen'
                    },
                    {
                        value: 'Obehandlad',
                        text: 'Obehandlad'
                    },
                    {
                        value: 'Skickad',
                        text: 'Skickad'
                    },
                    {
                        value: 'Levererad',
                        text: 'Levererad'
                    }
                ]
            }
        },

        created() {
            this.getOrder()
        },

        methods: {
            getOrder() {
                fetch(`/api/orders/${this.$route.params.id}`)
                    .then(response => response.json())
                    .then(result => {
                        result.details = JSON.parse(result.details)
                        result.products = JSON.parse(result.products)
                        this.order = result
                        this.selected = result.status
                    })
            },

            updateStatus() {
                fetch(`/api/orders/${this.$route.params.id}`, {
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({status: this.selected}),
                        method: 'PUT'
                    })
                    .then(response => response.json())
                    .then(() => {
                        this.dismissCountDown = 5
                        this.getOrder()
                    })
            },

            countDownChange(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            }
        }
    }
</script>
