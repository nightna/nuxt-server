<template>
  <client-only>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="10"
      item-key="id"
      hide-default-header
      dense
      class="mytable"
    >
      <template v-slot:body="props">
        <thead>
          <tr>
            <th
              v-for="(item, i) in props.headers"
              :key="i"
              class="text-center white--text"
            >
              {{ item.text }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in props.items"
            :key="i"
            :style="i % 2 ? '' : 'background: #FFF176'"
          >
            <td id="id">
              {{ i + 1 }}
            </td>
            <td id="actions">
              <input
                type="checkbox"
                class="myCheckBox"
                :checked="item.flag"
                @click="item.flag = !item.flag"
              />
            </td>
            <td>{{ item.screenId }}</td>
            <td>{{ item.name }}</td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </client-only>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'TableUserPermission',
  props: {
    items: {
      type: Array,
      required: true
    },
    headers: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapMutations({
      clickBox: 'screen/SET_FLAG'
    })
  }
}
</script>
