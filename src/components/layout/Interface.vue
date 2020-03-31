<template>
  <b-container class="text-center">
    <!-- Row 1 -->
    <b-row>
      <!-- Button 1 -->
      <b-col lg="4" md="6" xs="6" class="zoom mb-5">
        <router-link to="/admin/frontpagesettings" class="nav-link">
          <b-icon v-b-tooltip.hover title="Framsidan" font-scale="7.5" icon="brush" />
          <div>Framsidan</div>
        </router-link>
      </b-col>
      <!-- Button 2 -->
      <b-col lg="4" md="6" xs="6" class="zoom">
        <router-link to="/admin/backoffice" class="nav-link">
          <b-icon v-b-tooltip.hover title="Ordrar" font-scale="7.5" icon="archive" />
          <div>Ordrar <b-badge :variant="variant">{{ unhandeled }}</b-badge></div>
        </router-link>
      </b-col>
      <!-- Button 3 -->
      <b-col lg="4" md="6" xs="6" class="zoom">
        <router-link to="/admin/statistics" class="nav-link">
          <b-icon v-b-tooltip.hover title="Statistik" font-scale="7.5" icon="graph-up" />
          <div>Statistik</div>
        </router-link>
      </b-col>
      <!-- Button 4 -->
      <b-col lg="4" md="6" xs="6" class="zoom">
        <router-link class="nav-link" to="/admin/products">
          <b-icon v-b-tooltip.hover title="Produkter" font-scale="7.5" icon="file-richtext" />
          <div>Produkter</div>
        </router-link>
      </b-col>
      <!-- Button 5 -->
      <b-col lg="4" md="6" xs="6" class="zoom">
        <router-link class="nav-link" to="/admin/categories">
          <b-icon v-b-tooltip.hover title="Kategorier" font-scale="7.5" icon="inboxes" />
          <div>Kategorier</div>
        </router-link>
      </b-col>
      <!-- Button 6 -->
      <b-col lg="4" md="6" xs="6" class="zoom">
        <router-link class="nav-link" to="/admin/settings">
          <b-icon v-b-tooltip.hover title="Inställningar" font-scale="7.5" icon="gear-fill" />
          <div>Inställningar</div>
        </router-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Interface",

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

<style scoped>
.zoom {
  transition: transform 0.2s;
}
.zoom:hover {
  transform: scale(1.5);
}
</style>