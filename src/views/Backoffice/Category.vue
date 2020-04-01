<template>
  <b-container>
    <div v-if="error" class="text-danger">
      {{ error.message }}
    </div>

    <div v-if="!error && category">
      <h2 class="mt-1 mb-3">Kategori: {{ category.name }}</h2>
      <h4>Värden</h4>
      
      <b-alert
        variant="success"
        dismissible
        @dismissed="dismissCoutdown = 0"
        @dismiss-count-down="countDownChange"
        :show="dismissCountDown"
        class="mt-3"
      >
        <strong>{{ successMessage }}</strong>
        <b-progress
          variant="success"
          :max="5"
          :value="dismissCountDown"
          height="4px"
          class="mt-1"
        />
      </b-alert>
      <ul>
        <li v-for="option in category.options" :key="option">
          {{ option }}
          <b-form @submit.prevent="removeOption( option )" inline class="d-inline remove">
            <b-button
              variant="link"
              type="submit"
              class="text-danger"
              size="sm"
            >
              <b-icon icon="x" />
            </b-button>
          </b-form>
        </li>
      </ul>
      <b-form @submit.prevent="addOption" inline>
        <b-form-input 
          placeholder="Värde..."
          v-model="option"
          :state="optionState"
          size="sm"
          class="mb-2 mr-sm-2 mb-sm-0"
        />

        <b-button 
          :disabled="!optionState"
          type="submit"
          variant="outline-primary"
          size="sm"
        >
          Lägg till
        </b-button>
      </b-form>

      <b-button
        variant="outline-danger"
        @click="deleteCategory"
        size="sm"
        class="mt-5"
      >
        Ta bort kategori
      </b-button>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      category: null,
      error: null,
      option: '',
      dismissCountDown: 0,
      successMessage: null
    }
  },

  created() {
    this.getCategory()
  },

  computed: {
    optionState() {
      return this.option === ''
        ? null
        : this.option.length > 1
    }
  },

  methods: {
    getCategory() {
      fetch( `/api/categories/${ this.$route.params.id }`)
        .then( response => response.json() )
        .then( result => {
          if ( result.error ) {
            this.error = result
          }

          else {
            result.options = JSON.parse( result.options )
            result.options.sort()
            this.category = result
          }
        })
    },

    addOption() {
      if ( !this.optionState ) return

      const options = this.category.options
      options.push( this.option )

      fetch( `/api/categories/${ this.$route.params.id }`, {
        body: JSON.stringify( { options: options, delete: false } ),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      })
      .then( response => response.json() )
      .then( result => {
        this.option = ''
        this.successMessage = result.message
        this.dismissCountDown = 3
        this.getCategory()
      })
    },

    removeOption( option ) {
      const options = this.category.options
      options.pop( option )

      fetch( `/api/categories/${ this.$route.params.id }`, {
        body: JSON.stringify( { options: options, delete: true } ),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      })
      .then( response => response.json() )
      .then( result => {
        this.option = ''
        this.successMessage = result.message
        this.dismissCountDown = 3
      })
    },

    deleteCategory() {
      fetch( `/api/categories/${ this.$route.params.id }`, {
        method: 'DELETE'
      })
      .then( () => {
        this.$router.push( '/admin/categories' )
      })
    },

    countDownChange(dismissCountDown) {
			this.dismissCountDown = dismissCountDown
		}
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}

.remove {
  position: relative;
  top: -2px;
}
</style>