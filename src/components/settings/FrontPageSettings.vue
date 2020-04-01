<template>
  <b-container id="FPSettings">
    <b-alert
      variant="success"
      dismissible
      @dismissed="dismissCoutdown=0"
      @dismiss-count-down="countDownChange"
      :show="dismissCountDown"
      class="mt-3"
    >
      <strong>Inställningarna är sparade</strong>
      <b-progress variant="success" :max="5" :value="dismissCountDown" height="4px" class="mt-1" />
    </b-alert>

    <h2>
      Framsidan
      <router-link class="mt-2 float-right btn btn-sm btn-primary" to="/admin">&laquo; Tillbaka</router-link>
    </h2>

    <b-form @submit.prevent="submitFpSettings">
      <b-form-group
        label="Välj bild till Jumbotronen"
        label-for="image"
        description="Rekommenderad storlek 1500x500 pixlar"
      >
        <b-form-file
          id="image"
          v-model="file"
          placeholder="Välj en bild eller släpp den här..."
          drop-placeholder="Släpp bilden här..."
        />
      </b-form-group>

      <b-form-group
        label="Namn på butik"
        label-for="brand"
        description="Ange namn på butik, visas i navigations fältet"
      >
        <b-form-input id="brand" v-model="brand"></b-form-input>
      </b-form-group>

      <b-form-group
        label="Välkomstmeddelande"
        label-for="textarea-rows"
        description="Ange text som skall visas under Jumbotronen"
      >
        <b-form-textarea v-if="text" v-model="text.value" id="textarea-rows" rows="8"></b-form-textarea>
      </b-form-group>
      <b-form-group></b-form-group>

      <b-button type="submit" variant="outline-primary">Spara</b-button>
    </b-form>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      text: null,
      brand: null,
      dismissCountDown: 0
    };
  },
  created() {
    fetch("/api/settings?name=frontPageText")
      .then(response => response.json())
      .then(result => {
        this.text = result;
      });

    fetch("/api/settings?name=brandName")
      .then(response => response.json())
      .then(result => {
        this.brand = result.value;
      });
  },
  methods: {
    submitFpSettings() {
      const formData = new FormData();

      formData.append("file", this.file);
      formData.append("text", this.text.value);
      formData.append("brand", this.brand);

      fetch("/api/settings/frontpage", {
        body: formData,
        method: "POST"
      })
        .then(response => response.json())
        .then(result => {
          console.log(result);
        });
      this.dismissCountDown = 5;
    },
    countDownChange(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    }
  },

  name: "FrontPageSettings"
};
</script>

<style>
</style>