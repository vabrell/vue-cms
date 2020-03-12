<template>
    <div>
        <Navbar />
        <b-container id="sign-in" class="w-75">
            <h1 class="title">Kundvagn</h1>
            <b-table striped hover :fields="fields" :items="items"> 
                <template v-slot:cell(image)="data">
                    <img thumbnail class="w-50" :src="'./' + (data.item.image || 'no-image.jpg')" alt="produkt bild">
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
                fields: ['image', 'name', 'description', 'price', 'amount'],
                items: JSON.parse(localStorage.getItem('cart')),
            }
        },
        methods: {}
    };
</script>
<style>

</style>