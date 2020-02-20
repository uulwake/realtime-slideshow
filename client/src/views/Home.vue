<template>
  <div>
    <div>
      <b-button @click="next" class="float-right next-button" variant="light">Next</b-button>
      <b-button @click="prev" class="prev-button" variant="light">Prev</b-button>
    </div>
    <b-carousel
      id="carousel-1"
      ref="myCarousel"
      v-model="slide"
      :interval="10000"
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
      @next="next"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        caption="First slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        img-src="https://picsum.photos/1024/480/?image=52"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
        <h1>Hello world!</h1>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="https://picsum.photos/1024/480/?image=55"
            alt="image slot"
          />
        </template>
      </b-carousel-slide>
    </b-carousel>

    <p class="mt-4">
      Slide #: {{ slide }}
      <br />
      Sliding: {{ sliding }}
    </p>
  </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3000');

export default {
  name: 'Carousel',
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
      console.log('onSlideStart');
    },
    onSlideEnd() {
      this.sliding = false;
      console.log('onSlideEnd');
    },
    next() {
      this.$refs.myCarousel.next();
      const next = this.slide === 3 ? 0 : this.slide + 1;
      socket.emit('nextSlide', next);
    },
    prev() {
      this.$refs.myCarousel.prev();
      const prev = this.slide === 0 ? 3 : this.slide - 1;
      socket.emit('prevSlide', prev);
    }
  },
  created() {
    socket.on('changeSlide', slide => {
      this.slide = slide;
    });
  }
}
</script>

<style>
.next-button {
  position: absolute;
  z-index: 10;
  right: 0;
  top: 50%;
}

.prev-button {
  position: absolute;
  z-index: 10;
  top: 50%;
}
</style>
