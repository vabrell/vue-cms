<template>
    <section>
        <AddProduct />
    </section>
</template>

<script>
    // @ is an alias to /src
    import AddProduct from '@/components/AddProduct.vue'

    export default {
        name: 'Dashboard',
        components: {
            AddProduct
        },
    }
</script>