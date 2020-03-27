<template>
  <b-container>
    <!-- Row 1 -->
    <b-row class="mb-5">
      <!-- Button 1 -->
      <b-col cols="4">
        <router-link to="/admin/frontpagesettings" class="nav-link">
          <b-icon class="zoom" v-b-tooltip.hover title="Framsidan" font-scale="7.5" icon="brush" />
          <div>Framsidan</div>
        </router-link>
      </b-col>
      <!-- Button 2 -->
      <b-col cols="4">
        <router-link to="/admin/backoffice" class="nav-link">
          <b-icon class="zoom" v-b-tooltip.hover title="Ordrar" font-scale="7.5" icon="archive" />
        </router-link>
      </b-col>
      <!-- Button 3 -->
      <b-col cols="4">
        <router-link to="/admin/statistics" class="nav-link">
          <b-icon
            class="zoom"
            v-b-tooltip.hover
            title="Statistik"
            font-scale="7.5"
            icon="graph-up"
          />
        </router-link>
      </b-col>
    </b-row>
    <!-- Row 2 -->
    <b-row>
      <!-- Button 4 -->
      <b-col cols="4">
        <router-link class="nav-link" to="/admin/products">
          <b-icon
            class="zoom"
            v-b-tooltip.hover
            title="Produkter"
            font-scale="7.5"
            icon="document-richtext"
          />
        </router-link>
      </b-col>
      <!-- Button 5 -->
      <b-col cols="4">
        <router-link class="nav-link" to="/admin/categories">
          <b-icon
            class="zoom"
            v-b-tooltip.hover
            title="Kategorier"
            font-scale="7.5"
            icon="inboxes"
          />
        </router-link>
      </b-col>
      <!-- Button 6 -->
      <b-col cols="4">
        <router-link class="nav-link" to="/admin/settings">
          <b-icon
            class="zoom"
            v-b-tooltip.hover
            title="Inställningar"
            font-scale="7.5"
            icon="gear-fill"
          />
        </router-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Interface"
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