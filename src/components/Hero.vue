<template>
  <div class="hero mb-0">
    <b-jumbotron bg-variant="primary" fluid id="hero">
      <!-- <p>För mer information klicka nedan</p>
      <b-button variant="success" href="#">Klicka här</b-button>-->
      <!-- placeholder inte säkert vi skall använda --->
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "Hero"
};
</script>

<style scoped>
.jumbotron {
  /* background-color: #232323; */
  color: #fff;
  /* background-image: url(""); */
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 400px;
  margin-bottom: 0;
}
</style>