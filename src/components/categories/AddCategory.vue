<template>
  <b-container>
    <b-form @submit.prevent="createCategory">
      <b-form-group
        label="Kategorinamn"
        label-for="categoryName"
        description="Namnet på kategorin som skall läggas till"
      >
        <b-form-input
          id="categoryName"
          v-model="name"
          :state="nameState"
        />

        <small
          class="form-text text-danger"
          v-if="!nameState"
        >
          {{ errors.name }}
        </small>
      </b-form-group>

      <b-button
        variant="outline-primary"
        type="submit"
      >
        Lägg till kategori
      </b-button>
    </b-form>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      error: null,
      errors: {}
    }
  },

  computed: {
    nameState() {
      if ( this.error === null) return null
      
      if ( this.name.length > 3 ) {
        return true
      }

      return false
    }
  },

  methods: {
    createCategory() {
      fetch( '/api/categories', {
        body: JSON.stringify( {
          name: this.name
        }),

        headers: {
          'Content-Type': 'application/json'
        },

        method: 'POST'
      })
      .then( response => response.json() )
      .then( result => {
        // Check if there was an error
        if ( result.error ) {
          this.error = true
          this.errors = result.errors
        }

        else {
          this.error = false
          this.errors = null

          this.$emit( 'category-created' )
        }
      })
    }
  }

}
</script>

<style>

</style>