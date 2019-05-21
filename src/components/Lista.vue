<template>
  <v-container fluid>
    <v-layout column>
      <v-flex xs12>
        <v-subheader dark class="titulo">{{titulo}}</v-subheader>
        <v-data-table
          :headers="cabecerasTabla"
          :items="items"
          class="lista"
          hide-actions
          :id="'tabla'+titulo"
        >
          <template v-slot:items="props">
            <td class="text-xs-rigth">{{ props.item.fecha | formatDate }}</td>
            <td class="text-xs-rigth">{{ props.item.monto }}</td>
            <td class="text-xs-rigth">{{ props.item.categoria }}</td>
            <span>
              <v-btn
                color="#64C195"
                dark
                round
                id="botonBorrar"
                @click="MostrarEditar"
              >
                BORRAR
              </v-btn>
            </span>
            <span>
              <v-btn
                color="#64C195"
                dark
                round
                id="botonEditar"
                
              >
                EDITAR
              </v-btn>
            </span>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { METHODS } from 'http';
export default {
  props: {
    items: Array,
    titulo: String,
  },
  data() {
    return {
      Editar:false,
      cabecerasTabla: [
        { text: 'Fecha',
          align: 'left',
          sortable: false,
          value: 'fecha' },
        { text: 'Monto', value: 'monto' },
        { text: 'Categoria', value: 'categoria' },
      ]
    }
  },
  filters: {
    formatDate(value) {
      if (!value) return ''
      return new Date(value).toLocaleDateString('en-US')
    }
  },
  methods:{
    MostrarEditar: function (){
      Editar=true
      console.log(Editar)
    }


  }
}
</script>
<style scoped>
.titulo {
  background-color: #64C195;
  width: 80%;
  margin-left: 10%
}
.lista {
  width: 80%;
  margin-left: 10%;
  height: 180px;
  overflow-y: scroll;
}
</style>
