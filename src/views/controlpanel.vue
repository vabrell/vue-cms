<template>
  <div>
    <b-container>
      <b-navbar toggleable="lg">
        <b-nav-toggle target="nav-collapse"></b-nav-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-nav vertical class="w-25">
            <b-nav-text>Kontrollpanel</b-nav-text>
            <b-nav-item href="http://google.com">Link</b-nav-item>
            <b-nav-item href="http://google.com">Link2</b-nav-item>
            <b-nav-item href="http://google.com">Link3</b-nav-item>
            <b-dropdown id="dropdown-left" text="Link4" variant="outline-primary">
              <b-dropdown-item href="http://google.com">Link5</b-dropdown-item>
              <b-dropdown-item href="http://google.com">Link6</b-dropdown-item>
            </b-dropdown>
          </b-nav>
        </b-collapse>
      </b-navbar>
    </b-container>
  </div>
</template>

<script>
// import edit from "@/components/edit.vue";
// export default {
//   name: "controlpanel",
//   components: {
//     edit
//   }
// };
</script>

<style>
</style>