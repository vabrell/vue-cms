<template>
    <b-row>
        <b-table class="mt-3" :fields="fields" :items="orders">
            <template v-slot:cell(invoice)="data">
                <a :href="`/invoices/${data.item.invoice}`">{{ data.item.invoice }}</a>
            </template>
        </b-table>
    </b-row>
</template>

<script>
    export default {
        data() {
            return {
                orders: null,
                fields: [{
                        id: 'Ordernummer'
                    },
                    {
                        shipping: 'Leveranssätt'
                    },
                    {
                        status: 'Status'
                    },
                    {
                        invoice: 'Faktura'
                    }
                ]
            }
        },
        methods: {
            getOrders() {
                fetch(`/api/orders/users/${ this.$store.state.cookie.id }`)
                    .then(response => response.json())
                    .then(result => {
                        this.orders = result
                    })
            }
        },
        created(){
            this.getOrders()
        }
    }
</script>

<style>

</style>