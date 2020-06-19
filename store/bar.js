export const state = () => ({
  show: false,
  isMobile: false,
  headerBar: 'UNIPI',
  links: [
    // {
    //   icon: 'mdi-account',
    //   text: 'User Manegement',
    //   route: '/user',
    //   onlyAdmin: true
    // },
    {
      icon: 'mdi-view-dashboard',
      text: 'Control unipi',
      route: '/control'
    },
    {
      icon: 'mdi-view-dashboard',
      text: 'Control unipi 2',
      route: '/control2'
    },
    {
      icon: 'mdi-arrow-right-bold-box-outline',
      text: 'Chiller',
      items: [
        {
          title: 'Chiller 1',
          route: '/chiller/1'
        },
        {
          title: 'Chiller 2',
          route: '/chiller/2'
        },
        {
          title: 'Chiller 3',
          route: '/chiller/3'
        }
      ]
    },
    {
      icon: 'mdi-view-dashboard',
      text: 'Blower',
      route: '/blower'
    },
    {
      icon: 'mdi-view-dashboard',
      text: 'Energy',
      route: '/energy'
    },
    {
      icon: 'mdi-arrow-right-bold-box-outline',
      text: 'Settings',
      items: [
        {
          title: 'Devices',
          route: '/settings/devices'
        },
        {
          title: 'Address type',
          route: '/settings/addressType'
        },
        {
          title: 'Address Modbus',
          route: '/settings/addressModbus'
        },
        {
          title: 'User Permission',
          route: '/userpermission'
        },
        {
          title: 'Screen',
          route: '/screen'
        }
      ]
    }
  ]
})

export const mutations = {
  TOGGLE(state) {
    state.show = !state.show
  },
  SET_ISMOBILE(state, value) {
    state.isMobile = value
  },
  SET_SHOW(state, value) {
    state.show = value
  }
}
