<template>
    <v-app>
        <PhotoCarousel />   
        <PhotoGallery />
    </v-app>
</template>

<script>
  import PhotoCarousel from './PhotoCarousel.vue';
  import PhotoGallery from './PhotoGallery.vue';
  export default {
    name: 'app',
    data() {
      return {
        isHandbook: false,
      }
    },
    components: {
      PhotoCarousel, PhotoGallery
    },
    }
    
</script>