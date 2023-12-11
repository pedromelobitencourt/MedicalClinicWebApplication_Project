<template>
  <v-container>
    <div class="block galleryBlock">
        <h2 class="text center">Galeria</h2>

      <v-row>
        <v-col
          v-for="(item, index) in items"
          :key="index"
          class="d-flex child-flex"
          cols="4"
        >
          <v-img
            :src="item.src"
            aspect-ratio="1"
            cover
            class="bg-grey-lighten-2"
          >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="grey-lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'PhotoGallery',
  data() {
    return {
      items: [
        {
          src: 'https://cdn.pixabay.com/photo/2016/11/14/03/05/surgery-1822458_1280.jpg'
        },
        {
          src: 'https://cdn.pixabay.com/photo/2018/01/22/11/02/hospital-3098683_1280.jpg'
        },
        {
          src: 'https://cdn.pixabay.com/photo/2021/02/15/16/01/woman-6018388_1280.jpg'
        },
        {
          src: 'https://cdn.pixabay.com/photo/2014/11/11/22/27/nurse-527621_1280.jpg'
        },
        {
          src: 'https://cdn.pixabay.com/photo/2014/12/10/20/48/medic-563425_1280.jpg'
        },
        // Add more URLs as needed
        {
          src: 'https://cdn.pixabay.com/photo/2018/03/27/00/50/adult-3264740_1280.jpg'
        },
        {
          src: 'https://cdn.pixabay.com/photo/2013/11/13/19/45/baby-210194_1280.jpg'
        },
        {
          src: 'https://cdn.pixabay.com/photo/2019/11/04/11/38/medical-4600914_1280.jpg'
        },
        {
          src: 'https://cdn.pixabay.com/photo/2021/07/06/17/57/helicopter-6392253_1280.jpg'
        },
      ],
    };
  },
};
</script>

<style scoped>
    h2 {
        text-align: center;
        font-weight: 300; /* Ou qualquer valor menor, como 100, para uma fonte mais fina */
        text-decoration: underline;
        text-decoration-thickness: 1px; /* Ou qualquer valor que pareça adequado */
    }

</style>