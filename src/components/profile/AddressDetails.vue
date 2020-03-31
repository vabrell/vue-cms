<template>
  <b-row>
    <b-col cols="12">
      <b-alert
        :show="dismissCountDown"
        dismissible
        variant="success"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
      >
        <p>{{ message }}</p>

        <b-progress
          variant="success"
          :max="3"
          :value="dismissCountDown"
          height="4px"
        ></b-progress>
      </b-alert>
    </b-col>

    <b-col cols="12">
      <b-form @submit.prevent="saveDetails">
        <b-row>
          <b-col md="6">
            <b-form-group label="Namn:" label-for="firstname">
              <b-form-input id="firstname" v-model="form.firstname" required placeholder="Ditt Förnamn">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Efternamn:" label-for="lastname">
              <b-form-input id="lastname" v-model="form.lastname" required placeholder="Ditt Efternamn">
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <b-form-group label="Telefonnummer:" label-for="telephone" description="Format: nnn-nnnnnnn">
              <b-form-input id="telephone" v-model="form.telephone" type="tel" pattern="[0-9]{3}-[0-9]{7}" required
                  placeholder="Ditt Telefonnummer">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Mailaddress:" label-for="email">
              <b-form-input id="email" v-model="form.email" type="email" required placeholder="Din mailaddress">
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group label="Adress:" label-for="address">
          <b-form-input id="address" v-model="form.address" required placeholder="Din adress">
          </b-form-input>
        </b-form-group>

        <b-button
          type="submit"
          variant="outline-primary"
        >
          Uppdatera
        </b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data() {
    return {
      form: {
        firstname: '',
        lastname: '',
        email: '',
        telephone: '',
        address: ''
      },
      message: null,
      dismissCountDown: 0
    }
  },

  created() {
    fetch(`/api/users/${ this.$store.state.cookie.id }`)
      .then( response => response.json() )
      .then( result => {
        if (result.address_details) {
          const details = JSON.parse( result.address_details )

          this.form.firstname = details.firstname
          this.form.lastname = details.lastname
          this.form.email = details.email
          this.form.telephone = details.telephone
          this.form.address = details.address
        }
      })
  },

  methods: {
    saveDetails() {
      fetch(`/api/users/address/${ this.$store.state.cookie.id }`, {
        body: JSON.stringify({
          details: JSON.stringify( this.form ),
          userId: this.$store.state.cookie.id
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      })
      .then( response => response.json() )
      .then( result => {
        this.message = result.message
        this.dismissCountDown = 3
      })
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    }
  }

}
</script>

<style>

</style>