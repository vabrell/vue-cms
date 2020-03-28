<template>
  <b-container>
    <h2>Dashboard</h2>
    <Interface />
    <b-row class="mx-3">
      <b-col class="shadow rounded p-3" lg="3" md="6" sm="12">
        <strong class="mb-2">
          Orderhantering
          <b-icon icon="archive" scale="1.5" />
        </strong>
        <b-row>
          <b-col>
            Ordrar att hantera:
            <b-badge :variant="variant">{{ unhandeled }}</b-badge>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Interface from "./layout/Interface.vue";
export default {
  name: "Dashboard",
  components: {
    Interface
  },

  data() {
    return {
      unhandeled: 0
    };
  },

  created() {
    // TODO: Fetch orders to be able to display all unhandeled orders
    fetch("/api/orders")
      .then(response => response.json())
      .then(result => {
        result.forEach(order => {
          if (order.status === "Mottagen") {
            this.unhandeled++;
          }
        });
      });
  },

  computed: {
    variant() {
      switch (this.unhandeled) {
        case 0:
          return "success";

        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          return "warning";

        default:
          return "danger";
      }
    }
  }
};
</script>