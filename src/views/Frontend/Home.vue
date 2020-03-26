<template>
	<div class="home">
		<!-- I b-container så skall ett standard galleri med 6 produkter ligga.  -->
		<b-container>
			<b-row v-if="text" class="bg-light">
				<pre class="mx-auto">{{ text.value }}</pre>
			</b-row>
		</b-container>
	</div>
</template>

<script>
export default {
	name: 'Home',

	data() {
		return {
			text: null
		}
	},

	created() {
		fetch('/api/settings?name=frontPageText')
			.then(response => response.json())
			.then(result => {
				this.text = result
			})
	}
}
</script>

<style scoped>
pre {
  font-family: var(--font-family-sans-serif);
  font-size: 16px;
  white-space: pre-wrap;
}
</style>
