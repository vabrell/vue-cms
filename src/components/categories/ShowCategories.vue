<template>
  <b-container>
    <dl>
      <template
        v-for="category in categories"
      >
      <div :key="category.id">
        <dt>
          <router-link :to="`/admin/categories/${ category.id }`">
            {{ category.name }}
          </router-link>
        </dt>
        <dd> {{ category.options.join(', ') }} </dd>
      </div>
      </template>
    </dl>
  </b-container>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>

</style>