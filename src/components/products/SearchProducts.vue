<template>
  <b-form inline @submit.prevent="search" class="w-100 d-flex justify-content-center">
    <b-input 
      v-model="searchText"
      placeholder="Sök bland våra produkter"
      class="w-75"
    />

    <b-button
      type="submit"
      variant="primary"
    >
      Sök
    </b-button>
  </b-form>
</template>

<script>
export default {
  data() {
    return {
      searchText: this.query 
    }
  },

  methods: {
    search() {
      this.$router.push(`/search?s=${ this.searchText }`)
    }
  },

  props: {
    query: {
      type: String,
      required: false,
      default: ''
    }
  }

}
</script>

<style lang="scss" scoped>

form {
  button {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }

  input {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
}

</style>