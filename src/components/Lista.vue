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
            <td class="text-xs-rigth">
              <span v-if="Editar==1">
                <input type="text">
             
              </span>
              <span v-else>
                {{ props.item.monto }}
              </span>
            </td>
             <td class="text-xs-rigth">
              <span v-if="Editar==1">
                <v-combobox>
                </v-combobox>

             
              </span>
              <span v-else>
                {{ props.item.categoria }}
              </span>
            </td>
            <span v-if="Editar==0">
                
              <v-btn
                color="#64C195"
                dark
                round
                id="botonEditar"
                @click="MostrarEditar"  
              >
                EDITAR
              </v-btn>
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
            <span v-if="Editar==1">
                     <v-btn
                color="#64C195"
                dark
                round
                id="Guardar"
                @click="Guardar"
              >
                GUARDAR
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
      Editar:0,
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
      this.Editar=1
      
    },
    Guardar(){
      this.Editar=0
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
