<template>
    <div>
        <Navbar />
        <b-container class="w-75">
            <h1 class="title">Kundvagn</h1>
            <b-table striped hover :fields="fields" :items="items">
                <template v-slot:cell(image)="data">
                    <img thumbnail class="w-25" :src="'./' + (data.item.image || 'no-image.jpg')" alt="produkt bild">
                </template>
                <template v-slot:custom-foot>
                    <b-td><strong>Total summa</strong></b-td>
                    <b-td>{{ totalPrice }}kr</b-td>
                </template>
            </b-table>
            <router-link to="/checkout">
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
                fields: ['image', 'name', 'description', 'price', 'amount'],
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
        }
    };
</script>
<style>

</style>