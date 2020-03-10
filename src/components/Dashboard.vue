<template>
    <b-container>
      <h2>Dashboard</h2>
        <AddProduct />
    </b-container>
</template>

<script>
    // @ is an alias to /src
    import AddProduct from '@/components/products/AddProduct.vue'

    export default {
        name: 'Dashboard',
        components: {
            AddProduct
        },
    }
</script>