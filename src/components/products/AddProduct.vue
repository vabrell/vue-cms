<template>
  <section>
    <b-alert
      variant="success"
      dismissible
      @dismissed="dismissCoutdown=0"
      @dismiss-count-down="countDownChange"
      :show="dismissCountDown"
      class="mt-3"
    >
      <strong>Produkten har lagts till!</strong>
      <b-progress variant="success" :max="5" :value="dismissCountDown" height="4px" class="mt-1" />
    </b-alert>
    <b-form class="mt-4" @submit.prevent="createProduct" v-if="show">
      <b-form-group id="input-group-1" label="Namn:" label-for="input-1">
        <b-form-input id="input-1" v-model="form.name" required placeholder="Namn på produkten"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Beskrivning:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.description"
          required
          placeholder="Beskrivning av produkten"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Pris:" label-for="input-3">
        <b-form-input
          type="number"
          min="0"
          step="0.01"
          id="input-3"
          v-model="form.price"
          required
          placeholder="Pris på produkten"
        />
      </b-form-group>

      <b-form-group id="input-group-4" label="Lager:" label-for="input-4">
        <b-form-input
          type="number"
          min="0"
          id="input-4"
          v-model="form.stock"
          required
          placeholder="Antal kvar på lager"
        />
      </b-form-group>

      <b-form-group id="image-group" label="Produkt bild" label-for="image">
        <b-form-file
          id="image"
          v-model="form.file"
          placeholder="Välj en bild eller släpp den här..."
          drop-placeholder="Släpp bilden här..."
        />
      </b-form-group>

      <b-form-group label="Kategorier">
        <b-form-group
          v-for="category in categories"
          :key="category.id"
          :label="category.name"
        >
          <b-button-group>
            <b-button
              v-for="option in category.options"
              :key="option.text"
              :pressed.sync="option.value"
              variant="outline-secondary"
            >
              {{ option.text }}
            </b-button>
          </b-button-group>
        </b-form-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Lägg till produkt</b-button>
    </b-form>
  </section>
</template>

<script>
export default {
  name: "AddProduct",
  components: {},
  data() {
    return {
      form: {
        name: "",
        description: "",
        price: null,
        stock: null,
        file: null
      },
      show: true,
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      categories: []
    };
  },

  created() {
    this.getCategories()
  },

  methods: {
    createProduct() {
      const formData = new FormData(),
          categories = JSON.stringify(this.categories)

      Object.entries(this.form).forEach(data => {
        formData.append(data[0], data[1]);
      });

      formData.append( 'categories', categories )

      fetch("/api/products", {
        body: formData,
        method: "POST"
      })
        .then(response => response.json())
        .then(result => {
          console.log(result);
        });
      this.form = {};
      this.dismissCountDown = 5;
    },
      
    getCategories() {
      fetch( '/api/categories' )
        .then( response => response.json() )
        .then( result => {
          result.map( obj => obj.options = JSON.parse( obj.options ) )
          result.forEach( category => {
            const reformat = []
            category.options.forEach( option => {
              reformat.push( {
                text: option,
                value: false
              })
            })
            category.options = reformat
          })

          this.categories = result
        })
    },

    countDownChange(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    }
  }
};
</script>
