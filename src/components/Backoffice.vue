<template>
    <section class="mt-3">
        <h2>Ordrar</h2>
        <b-table class="mt-3" :fields="fields" :items="orders">
            <template v-slot:cell(id)="data">
                <router-link :to="`/admin/orders/edit/${data.item.id}`">{{ data.item.id }}</router-link>
            </template>
        </b-table>
    </section>
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
                    }
                ]
            }
        },
        created() {
            fetch('http://localhost:8080/api/orders')
                .then(response => response.json())
                .then(result => {
                    this.orders = result
                })
        }
    }
</script>

<style>

</style>