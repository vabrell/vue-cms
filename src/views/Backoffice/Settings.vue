<template>
  <b-container>
    <h2 class="mb-4 mt-2">
      Inställningar
      <router-link class="mt-2 float-right btn btn-sm btn-primary" to="/admin">&laquo; Tillbaka</router-link>
    </h2>
    <b-alert
      variant="success"
      dismissible
      @dismissed="dismissCoutdown = 0"
      @dismiss-count-down="countDownChange"
      :show="dismissCountDown"
      class="mt-3"
    >
      <strong>Inställningar sparade!</strong>
      <b-progress variant="success" :max="5" :value="dismissCountDown" height="4px" class="mt-1" />
    </b-alert>

    <b-form @submit.prevent="saveSettings" v-if="settings">
      <b-form-group
        label="Visa produkt saldo"
        label-for="show-stock"
        description="Om du vill att antal produkter som finns kvar skall synas på varje produkt"
      >
        <b-form-checkbox id="show-stock" v-model="settings.show_stock" />
      </b-form-group>

      <h4 class="my-3">Företagsinformation</h4>
      <b-form-group
        label="Företagsnamn"
        label-for="companyName"
        description="Ert företagsnamn, detta kommer att synas i fakturorna"
      >
        <b-form-input id="companyName" v-model="settings.companyName" />
      </b-form-group>

      <b-form-group
        label="Företags adress"
        label-for="companyAddress"
        description="Ert företags address, detta kommer att synas i fakturorna"
      >
        <b-form-input id="companyAddress" v-model="settings.companyAddress" />
      </b-form-group>

      <b-form-group
        label="Företags telefonnummer"
        label-for="companyPhone"
        description="Ert företags telefonnummer, detta kommer att synas i fakturorna"
      >
        <b-form-input id="companyPhone" v-model="settings.companyPhone" />
      </b-form-group>

      <b-form-group
        label="Företags e-post"
        label-for="companyEmail"
        description="Ert företags e-post, detta kommer att synas i fakturorna"
      >
        <b-form-input id="companyEmail" v-model="settings.companyEmail" />
      </b-form-group>

      <b-button type="submit" variant="outline-primary">Spara</b-button>
    </b-form>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      settings: null,
      dismissCountDown: 0
    };
  },

  created() {
    fetch("/api/settings/all")
      .then(response => response.json())
      .then(result => {
        this.settings = result;
      });
  },

  methods: {
    saveSettings() {
      fetch("/api/settings", {
        body: JSON.stringify([
          {
            key: "show_stock",
            value: String(Boolean(this.settings.show_stock))
          },
          {
            key: "companyName",
            value: this.settings.companyName
          },
          {
            key: "companyAddress",
            value: this.settings.companyAddress
          },
          {
            key: "companyEmail",
            value: this.settings.companyEmail
          },
          {
            key: "companyPhone",
            value: this.settings.companyPhone
          }
        ]),
        headers: {
          "Content-Type": "application/json"
        },
        method: "PUT"
      }).then(() => {
        this.dismissCountDown = 5;
      });
    },

    countDownChange(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    }
  }
};
</script>

<style></style>

