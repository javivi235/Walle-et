<template>
  <v-hover>
    <v-container fluid>
      <v-layout column>
        <v-flex xs12>
          <div>
            <v-layout>
              <BotonTransacciones
                v-if="cuenta.nombre !== 'Global'"
                tipo="Ingreso"
                id="herramientaIngreso"
                :cuenta="cuenta"
                :categorias="categoriaIngresos"
                @setAlerta = "setAlerta"/>
              <BotonTransacciones
                v-if="cuenta.nombre !== 'Global'"
                tipo="Egreso"
                id="herramientaEgreso"
                :cuenta="cuenta"
                :categorias="categoriaEgresos"
                @setAlerta = "setAlerta"/>
              <BotonTransferencia
              :cuenta="cuenta"
              @setAlerta = "setAlerta"
              id="herramientaTransferencia"
              v-if="cuenta.nombre !== 'Global'"/>
              <BotonCategorias
                :categoriaIngresos="categoriaIngresos"
                :categoriaEgresos="categoriaEgresos"
                id="herramientaCategorias"
                @setAlerta = "setAlerta"/>
              <v-btn
                color="#64C195"
                dark
                round
                id="botonReporte"
                @click="$router.push({ path: '/reporte/' + cuenta.nombre })"
              >
                Reporte
              </v-btn>
              <v-spacer></v-spacer>
              <v-expand-transition>
                <div
                  :v-if= "alerta.visible"
                  class="d-flex transition-fast-in-fast- v-card--reveal display-3 white--text"
                >
                  <v-alert
                    :value="alerta.visible"
                    :type="alerta.tipo"
                    transition="scale-transition"
                    :color= "alerta.color"
                    outline
                    id="alertaInferior"
                  >
                    {{alerta.mensaje}}
                  </v-alert>
                </div>
              </v-expand-transition>
            </v-layout>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-hover>
</template>
<script>
import BotonTransacciones from '@/components/BotonTransacciones.vue'
import BotonTransferencia from '@/components/BotonTransferencia.vue'
import BotonCategorias from '@/components/BotonCategorias.vue'
export default {
  components: {
    BotonTransacciones,
    BotonTransferencia,
    BotonCategorias
  },
  props: {
    cuenta: Object
  },
  computed: {
    categoriaIngresos() {
      return this.$store.state.categoriaIngresos.filter((categoria) => categoria !== 'Transferencia')
    },
    categoriaEgresos() {
      return this.$store.state.categoriaEgresos.filter((categoria) => categoria !== 'Transferencia')
    }
  },
  data() {
    return {
      alerta: { mensaje: '', tipo: 'success', visible: false, color: '#64C195' },
      sheetTransferencia: false,
      sheetCategoria: false,
    }
  },
  methods: {
    setAlerta(alerta) {
      this.alerta = alerta
    }
  }
}
</script>
<style scoped>
.seleccion {
  width: 80%;
  margin-left: 10%;
}
.input {
  width: 30%;
  margin-left: 35%;
}
</style>
