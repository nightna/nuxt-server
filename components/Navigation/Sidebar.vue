<template>
  <v-navigation-drawer
    v-model="show"
    :permanent="!isMobile"
    :mini-variant="false"
    fixed
    dark
    app
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          MENU
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <div v-for="link in links" :key="link.title">
        <v-list-group v-if="link.items" :prepend-icon="link.icon" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="subtitle-1">
                {{ link.text }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="item in link.items"
            :key="item.title"
            link
            @click="$router.push(item.route)"
          >
            <v-list-item-content>
              <v-list-item-title class="subtitle-2">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item v-else link @click="$router.push(link.route)">
          <v-list-item-icon>
            <v-icon> {{ link.icon }} </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitle-2">
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Sidebar',
  data() {
    return {
      admins: [
        ['Management', 'mdi-people-outline'],
        ['Settings', 'mdi-settings']
      ]
    }
  },
  computed: {
    ...mapState('bar', ['links']),
    isMobile: {
      get() {
        return this.$store.state.bar.isMobile
      },
      set(value) {
        this.$store.commit('bar/SET_ISMOBILE', value)
      }
    },
    show: {
      get() {
        return this.$store.state.bar.show
      },
      set(value) {
        this.$store.commit('bar/SET_SHOW', value)
      }
    }
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 1200
    }
  }
}
</script>
