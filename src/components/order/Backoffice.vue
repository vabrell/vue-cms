<template>
  <b-container>
    <section class="mt-3">
      <h2>
        Ordrar
        <router-link class="mt-2 float-right btn btn-sm btn-primary" to="/admin">&laquo; Tillbaka</router-link>
      </h2>
      <b-table class="mt-3" :fields="fields" :items="orders">
        <template v-slot:cell(id)="data">
          <router-link :to="`/admin/backoffice/edit/${data.item.id}`">{{ data.item.id }}</router-link>
        </template>
      </b-table>
    </section>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      orders: null,
      fields: [
        {
          id: "Ordernummer"
        },
        {
          shipping: "Leveranssätt"
        },
        {
          status: "Status"
        }
      ]
    };
  },
  created() {
    fetch("/api/orders")
      .then(response => response.json())
      .then(result => {
        this.orders = result;
      });
  }
};
</script>

<style>
</style>
