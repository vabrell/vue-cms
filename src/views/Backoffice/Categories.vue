<template>
	<b-container>
		<h2 class="mb-4 mt-2">Kategorier</h2>
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

    <b-button
      variant="primary"
      size="sm"
      @click="newCategory = !newCategory"
      v-if="!newCategory"
    >
      Ny kategori
    </b-button>
    <AddCategory 
      v-if="newCategory"
      @category-created="categoryCreated"
    />

    <ShowCategories
      :categories="categories"
      v-if="categories"
      class="mt-4"
    />
		
	</b-container>
</template>

<script>
import AddCategory from '../components/categories/AddCategory.vue'
import ShowCategories from '../components/categories/ShowCategories.vue'

export default {
	data() {
		return {
			categories: null,
      dismissCountDown: 0,
      newCategory: false,
      successMessage: null
		}
	},

	created() {
    this.getCategories()
	},

	methods: {
    getCategories() {
      fetch('/api/categories')
        .then(response => response.json())
        .then(result => {
          result.map( obj => obj.options = JSON.parse( obj.options ) )
          this.categories = result
        })
    },

    categoryCreated() {
      this.successMessage = 'Kategorin har skapats!'
      this.dismissCountDown = 5
      this.newCategory = false
      this.getCategories()
    },

    countDownChange(dismissCountDown) {
			this.dismissCountDown = dismissCountDown
		}
  },
  
  components: {
    AddCategory,
    ShowCategories
  }
}
</script>

<style></style>

