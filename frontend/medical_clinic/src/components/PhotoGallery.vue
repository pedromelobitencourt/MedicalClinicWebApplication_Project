<template>
    <v-app>
        <div class="photo-block">
            <v-carousel cycle interval="3000">
            <v-carousel-item
                v-for="(item, i) in items"
                :key="i"
                :src="item.src"
                reverse-transition="fade-transition"
                transition="fade-transition"
            >
            </v-carousel-item>
            </v-carousel>
        </div>
    </v-app>
</template>

<script>
export default {
  name: 'photo',
  data() {
    return {
      items: [{
        src: 'https://cdn.pixabay.com/photo/2016/11/14/03/05/surgery-1822458_1280.jpg'
      },
      {
        src: 'https://cdn.pixabay.com/photo/2017/02/01/13/52/analysis-2030261_1280.jpg'
      },
      {
        src: 'https://cdn.pixabay.com/photo/2015/07/10/21/00/hospital-840135_1280.jpg'
      },
      {
        src: 'https://cdn.pixabay.com/photo/2019/04/03/03/06/medical-equipment-4099429_1280.jpg'
      },
      {
        src: 'https://cdn.pixabay.com/photo/2014/12/10/20/48/medic-563425_1280.jpg'
      }],
    };
  },
};
</script>