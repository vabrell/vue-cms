<template>
  <b-container id="sign-in" class="w-75">
    <b-form @submit="onSubmit">
      <b-form-group label="Användarnamn" label-for="input-2">
        <b-form-input required placeholder="Skriv in användarnamn"></b-form-input>
      </b-form-group>

      <b-form-group label="Lösenord" label-for="input-2">
        <b-form-input type="password" required placeholder="Skriv in lösenord"></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Logga in</b-button>
      <router-link to="/">
        <b-button class="m-2" type="reset" variant="danger">Avbryt</b-button>
      </router-link>
    </b-form>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      //Check if the loggin values are strictly equal
    }
  }
};
</script>
<style>
#sign-in {
  margin-top: 25vh;
}

@media screen and (min-width: 768px) {
  #sign-in {
    max-width: 50%;
  }
}
</style>
