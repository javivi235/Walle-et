<template>
  <div id="report">
    <br>
    <v-layout row wrap justify-center class="layout">
      <v-subheader dark>Reporte</v-subheader>
      <v-flex xs3>
        <v-select
          :items="categorias"
          label="Categoria"
          @change="filtrarCategoria"
        ></v-select>
      </v-flex>
      <v-flex xs3>
         <v-menu
          ref="mostrarFechaInicio"
          :close-on-content-click="false"
          v-model="mostrarFechaInicio"
          :nudge-right="40"
          :return-value.sync="fechaInicio"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="fechaInicio"
            label="Desde"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="fechaInicio" @input="filtrarFechaInicio"></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex xs3>
        <v-menu
          ref="mostrarFechaFinal"
          :close-on-content-click="false"
          v-model="mostrarFechaFinal"
          :nudge-right="40"
          :return-value.sync="fechaFinal"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
          >
          <v-text-field
            slot="activator"
            v-model="fechaFinal"
            label="Hasta"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="fechaFinal" @input="filtrarFechaFin"></v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>
    <br>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="nuevoReporte"
      :pagination.sync="pagination"
      select-all
      class="elevation-1"
      :rows-per-page-items="[-1]"
      :hide-actions=true
      :search="filters"
      :custom-filter="customFilter"
      >
      <template slot="headers" slot-scope="props">
        <tr>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="['column sortable',
              pagination.descending ? 'desc' : 'asc',
              header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
            >
            <v-icon small>arrow_upward</v-icon>
            {{ header.text }}
          </th>
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        <tr :active="props.selected" @click="props.selected = !props.selected">
          <td class="text-xs-right">{{ props.item.fecha | formatDate }}</td>
          <td class="text-xs-right">{{ props.item.categoria }}</td>
          <td class="text-xs-right">{{ props.item.monto }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'Fecha', align: 'left', sortable: true, value: 'fecha' },
        { text: 'Categoria', align: 'left', sortable: true, value: 'categoria' },
        { text: 'Monto', align: 'left', sortable: false, value: 'monto' }
      ],
      mostrarFechaInicio: false,
      fechaInicio: null,
      mostrarFechaFinal: false,
      fechaFinal: null,
      selected: [],
      pagination: {
        sortBy: 'categoria'
      },
      filters: {
        category: '',
        start_date: null,
        end_date: null
      }
    }
  },
  props: {
    cuenta: Object
  },
  computed: {
    categorias() {
      const cat = this.$store.getters.obtenerCategorias
      return cat
    },
    nuevoReporte() {
      const reg = this.$store.getters.hacerReporte
      const dates = this.$store.getters.obtenerFechas
      const stamps = dates.map((stamp) =>
        new Date(stamp).getTime())
      for (const i in reg) {
        reg[i].fecha = stamps[i] + 14400000
      }
      console.log(reg)
      return reg
    }
  },
  methods: {
    customFilter(items, filters, filter, headers) {
      const cfilter = new this.$MultiFilters(items, filters, filter, headers)

      cfilter.registerFilter('category', function(category, items) {
        if (category.trim() === '') return items

        return items.filter((item) => {
          return item.categoria === category
        }, category)
      })
      cfilter.registerFilter('start_date', function(fechaInicio, items) {
        if (fechaInicio === null) return items

        return items.filter((item) => {
          return item.fecha >= fechaInicio
        }, fechaInicio)
      })
      cfilter.registerFilter('end_date', function(fechaFinal, items) {
        if (fechaFinal === null) return items

        return items.filter((item) => {
          return item.fecha <= fechaFinal
        }, fechaFinal)
      })
      return cfilter.runFilters()
    },
    filtrarCategoria(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, { category: val })
    },
    filtrarFechaInicio(val) {
      this.$refs.mostrarFechaInicio.save(val)
      const timestamp = new Date(val + 'T04:00:00Z').getTime()
      console.log(timestamp)
      this.filters = this.$MultiFilters.updateFilters(this.filters, { start_date: timestamp })
    },
    filtrarFechaFin(val) {
      this.$refs.mostrarFechaFinal.save(val)
      const timestamp = new Date(val + 'T04:00:00Z').getTime()
      console.log(timestamp)
      this.filters = this.$MultiFilters.updateFilters(this.filters, { end_date: timestamp })
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    }
  },
  filters: {
    formatDate(value) {
      if (!value) return ''
      return new Date(value).toLocaleDateString('en-US')
    }
  }
}
</script>

<style scoped>
.layout  {
  color: #64C195;
  background-color: #64C195
}
</style>
