<template>
	<b-navbar id="controlpanel" toggleable="sm">
		<b-nav-toggle target="nav-collapse"></b-nav-toggle>

		<b-collapse id="nav-collapse" is-nav>
			<b-nav pills vertical>
				<b-nav-text>Kontrollpanel</b-nav-text>
				<router-link to="/" class="nav-link text-secondary"
					><b-icon icon="eye" /> Visa affären</router-link
				>
				<b-dropdown-divider />
				<router-link to="/admin" class="nav-link">Dashboard</router-link>
				<router-link to="/admin/products" class="nav-link"
					><b-icon icon="document-richtext" /> Produkter</router-link
				>
				<!-- <b-nav-item href="http://google.com">Link</b-nav-item>
          <b-nav-item href="http://google.com">Link2</b-nav-item>
          <b-nav-item href="http://google.com">Link3</b-nav-item>
          <b-dropdown id="dropdown-left" text="Link4" variant="outline-primary">
            <b-dropdown-item href="http://google.com">Link5</b-dropdown-item>
            <b-dropdown-item href="http://google.com">Link6</b-dropdown-item>
          </b-dropdown> -->
			</b-nav>
		</b-collapse>
	</b-navbar>
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

<style lang="scss">
	/* #nav-collapse {
  padding: 0.5em;
  background-color: lightgrey !important;
} */

	@media screen and (min-width: 576px) {
		#controlpanel {
			height: 100vh;
			width: 200px;
			position: absolute;
			top: 0;
			left: 0;

			ul.nav {
				position: absolute;
				top: 0;
			}
		}
	}
</style>
