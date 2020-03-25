<template>
  <div class="hero mb-0">
    <b-jumbotron
      v-if="image"
      :style="`background-image: url('./${image.value}')`"
      bg-variant="primary"
      fluid
      id="hero"
    ></b-jumbotron>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: null
    };
  },
  created() {
    fetch("/api/settings?name=frontPageHero")
      .then(response => response.json())
      .then(resault => {
        this.image = resault;
      });
  },

  name: "Hero"
};
</script>

<style scoped>
.jumbotron {
  color: #fff;

  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 500px;
  margin-bottom: 0;
}
</style>