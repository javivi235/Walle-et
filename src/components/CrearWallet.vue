<template>
  <v-container>
    <NavDrawer/>
    <form>
      <div class="Header">
        <h1>Crea tu Cuenta</h1>
      </div>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-text-field
            id="nombreCrearCuenta"
            v-model="nombre"
            size="large"
            color="green"
            label="Nombre de Cuenta"
            prepend-icon="account_balance"
          ></v-text-field>
          <v-btn
            color="success"
            :disabled="!NombreEsValido"
            dark
            large
            @click="addCuenta()
            snackbar = true"
            id="crearCuenta"
            >Crear Cuenta</v-btn>
        </v-flex>
        <v-btn round color="#64C195" router to="/cuentas/Global" id="volverHome">Volver</v-btn>
      </v-layout>
      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        :top="'top'"
        id="snackbarCrearCuenta"
      >
        {{snackbarText}}
        <v-btn
          color="#64C195"
          flat
          @click="snackbar = false"
          id="okSnackbar"
        >
          OK
        </v-btn>
      </v-snackbar>
    </form>
  </v-container>
</template>

<script>
import NavDrawer from '@/components/NavDrawer.vue'

export default {
  components: {
    NavDrawer
  },
  data() {
    return {
      nombre: '',
      nombreExiste: false,
      snackbar: false,
      timeout: 2500,
      snackbarText: ''
    }
  },
  computed: {
    cuentas() {
      return this.$store.state.cuentas
    },
    NombreEsValido() {
      return this.nombre !== ''
    }
  },
  methods: {
    addCuenta() {
      for (let i = 0; i < this.cuentas.length; i++) {
        if (this.nombre === this.cuentas[i].nombre) {
          this.snackbarText = 'Cuenta "' + this.nombre + '" ya Existe'
          this.nombreExiste = true
          break
        }
      }
      if (this.nombreExiste === false && this.nombre !== '') {
        this.$store.dispatch('addCuenta', {
          icon: 'account_balance', nombre: this.nombre, route: '/', fondos: 0 }
        )
        this.snackbarText = 'Cuenta "' + this.nombre + '" Creado'
        this.$router.push('/cuentas/' + this.nombre)
        this.nombre = ''
      }
      this.nombreExiste = false
    }
  }
}
</script>

<style>
 .Header {
  height: 0in;
  color: #64C195;
}
</style>
