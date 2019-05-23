<template>
  <nav>
     <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
      temporary
      id="nav"
    >
      <v-list dense>
        <v-list-tile active-class="green--text" v-for="cuenta in cuentas" :key="cuenta.nombre"
        :id="cuenta.nombre"
         @click="drawer = false"
         router :to="'/cuentas/' + cuenta.nombre">
          <v-list-tile-action active-class="green--text">
            <v-icon >{{ cuenta.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile>{{ cuenta.nombre }}</v-list-tile>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-btn
      color="#64C195"
      dark
      round
      id="crearCuentaNav"
      router to="/crear"
      >+cuenta
      </v-btn>
    </v-navigation-drawer>
    <v-toolbar dark app fixed clipped-left color="#64C195">
      <v-toolbar-side-icon class="drawerbutton" @click="openDrawer" id="openDrawer"></v-toolbar-side-icon>
      <v-toolbar-title>WALL-ET</v-toolbar-title>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  data: function() {
    return {
      drawer: false,
    }
  },
  watch: {
    '$route'(to, from) {
    }
  },
  methods: {
    openDrawer() {
      if (this.drawer === false) {
        this.drawer = true
      } else {
        this.drawer = false
      }
    }
  },
  computed: {
    cuentas() {
      return this.$store.state.cuentas
    }
  }

}
</script>
