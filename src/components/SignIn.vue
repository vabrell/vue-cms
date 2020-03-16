<template>
  <b-container id="sign-in" class="w-75">
    <b-form @submit.prevent="onSubmit">
      <b-card title="Logga in">
        <b-form-group label="Användarnamn" label-for="input-2">
          <b-form-input required placeholder="Skriv in användarnamn" v-model="userName"></b-form-input>
        </b-form-group>

        <b-form-group label="Lösenord" label-for="input-2">
          <b-form-input type="password" required placeholder="Skriv in lösenord" v-model="password"></b-form-input>
        </b-form-group>
        <b-form-checkbox class="pb-2 mr-sm-2 mb-sm-0">Kom ihåg mig</b-form-checkbox>
        <b-button type="submit" variant="primary">Logga in</b-button>
        <router-link class="ml-2" to="/register">
          Inte registrerad?
        </router-link>
      </b-card>
    </b-form>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          userName: null,
          password: null
        }
      };
    },
    methods: {
      onSubmit() {
        console.log(this.userName, this.password);
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