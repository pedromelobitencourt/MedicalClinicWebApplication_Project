<template>
   <div>
        <PhotoCarousel />   
        <PhotoGallery />
      </div>
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