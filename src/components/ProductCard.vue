<template>
  <b-col lg="4" md="6">
    <b-card
      class="mb-2"
      title="Title"
      img-src="https://picsum.photos/300/300/?image=41"
      img-alt="Image"
      img-top
    >
      <b-card-text>
        This is a wider card with supporting text below as a natural lead-in to additional content.
        This content is a little bit longer.
      </b-card-text>
      <template v-slot:footer>
        <small class="text-muted">Last updated 3 mins ago</small>
      </template>
    </b-card>
  </b-col>
</template>

<script>
export default {
  name: "ProductCard"
};
</script>

<style>
</style>