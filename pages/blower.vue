<template>
  <v-container>
    <h1>Blower</h1>
    <v-row>
      <v-col cols="12" lg="4" md="6" sm="6" align="center">
        <v-card width="300px" min-width="300px">
          <div class="my-image" align="center">
            <v-img :src="blowerURL" aspect-ratio="1" class="main-image" />
            <v-img :src="arrow" class="child-image rotating" />
          </div>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Blower 1</h3>
              <div>test rotation</div>
            </div>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" lg="4" md="6" sm="6" align="center">
        <v-card width="300px" min-width="300px">
          <div class="my-image" align="center">
            <v-img :src="blowerURL" aspect-ratio="1" class="main-image" />
            <v-img
              v-show="isRotate"
              :src="arrow"
              class="child-image rotating"
            />
          </div>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Blower 1</h3>
              <div>test rotation</div>
            </div>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Blower',
  data() {
    return {
      blowerURL: require('@/static/images/blower.jpg'),
      arrow: require('@/static/images/three-arrow.png'),
      isRotate: false
    }
  }
}
</script>

<style>
.main-image {
  z-index: 1;
}

.child-image {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 80px;
  left: 180px;
  z-index: 2;
}

@keyframes rotating {
  from {
    -webkit-transform: rotate(360deg);
  }
  to {
    -webkit-transform: rotate(0deg);
  }
}

.rotating {
  animation-name: rotating;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
</style>
