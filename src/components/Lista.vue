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
         
            <td class="text-xs-rigth">
              <span v-if="Editar==1">
                <v-menu
          ref="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="fecha"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
          :id="'menuCalendario'+tipo"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="fecha"
              label="Picker in menu"
              prepend-icon="event"
              readonly
              v-on="on"
              class="calendario"
              :id="'fechaCalendario'+tipo"
            ></v-text-field>
          </template>
          <v-date-picker v-model="fecha" no-title scrollable :id="'datePicker'+tipo">
            <v-spacer></v-spacer>
            <v-btn flat color="primary" :id="'okCalendario'+tipo" @click="$refs.menu.save(fecha)">OK</v-btn>
          </v-date-picker>
        </v-menu>
              </span>
              <span v-else>
                {{ props.item.fecha | formatDate }}
              </span>


            </td>
            <td class="text-xs-rigth">
              <span v-if="Editar==1">
                <v-text-field
                  class="input"
                  label="Monto"
                  type="number"
                  v-model="monto"
                  :id="'monto'+tipo"
                ></v-text-field>
             
              </span>
              <span v-else>
                {{ props.item.monto }}
              </span>
            </td>
             <td class="text-xs-rigth">
              <span v-if="Editar==1">
               <v-combobox
          :items="categorias"
          label="Seleccione una categoria"
          chips
          autofocus
          type="button"
          class="seleccion"
          v-model="categoria"
          :id="'selector'+Egresos"
        ></v-combobox>
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
                @click="Guardar(props.item.id,titulo)"
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
    categorias:Array
  },

  
  data() {
    return {
      id:0,
      Editar:0,
      fecha:'',
      monto:0,
      categoria:'',
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
    Guardar(idd,titulo){
      console.log(titulo)
           try {
        if (this.categoria === '') {
          throw new Error('Seleccione una categoria')
        } else if (this.monto <= 0) {
          throw new Error('Ingrese un monto mayor a 0')
        } else if (this.fecha === '') {
          throw new Error('Seleccione una fecha')
        } else if (this.categorias.find((categoria) => (categoria === this.categoria)) === undefined) {
          throw new Error('Seleccione una categoria valida')
        }
        switch(titulo){
       case 'Ingreso':
      this.$store.dispatch('actualizarIngreso',[{id:idd,fecha:this.fecha,monto:this.monto,categoria:this.categoria}])
        break
        case 'Egreso':
    
        this.$store.dispatch('actualizarEgreso',[{id:idd,fecha:this.fecha,monto:this.monto,categoria:this.categoria}])
        break
      }
    
      } catch (error) {
        this.generarAlerta({ mensaje: error, tipo: 'error', visible: true, color: 'red' })
      } 










    
      this.Editar=0
      this.categoria=''
      this.fecha=''
      this.monto=0
      
    },
    Borrar(id){
      

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
