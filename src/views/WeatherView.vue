<template lang="pug">
.wrapper
  .container
    .weather-side
      .weather-gradient
      .date-container
        h2.date-dayname Tuesday
        span.date-day 15 Jan 2019
        vue-feather.location-icon(type="map-pin")
        span.location Paris, FR
      .weather-container
        vue-faether.weather-icon(type="sun")
        h1.weather-temp 29°C
        h3.weather-desc Sunny
    .info-side
      .today-info-container
        .today-info
          .precipitation
            span.title PRECIPITATION
            span.value 0 %
            .clear
          .humidity
            span.title HUMIDITY
            span.value 34 %
            .clear
          .wind
            span.title WIND
            span.value 0 km/h
            .clear
      .week-container
        ul.week-list
          li.active
            vue-feather.day-icon(type="sun")
            span.day-name Tue
            span.day-temp 29°C
          li
            vue-feather.day-icon(type="cloud")
            span.day-name Wed
            span.day-temp 21°C
          li
            vue-feather.day-icon(type="cloud-snow")
            span.day-name Thu
            span.day-temp 08°C
          li
            vue-feather.day-icon(type="cloud-rain")
            span.day-name Fry
            span.day-temp 19°C
          .clear
      .location-container
        button.location-button(@click="submit") Change location
          vue-feather(type="map-pin")

        stripe-checkout(
          ref="checkoutRef",
          mode="payment",
          :pk="publishableKey",
          :line-items="lineItems",
          :success-url="successUrl",
          :cancel-url="cancelUrl",
          @loading="(v) => (loading = v)"
        )
</template>

<script setup>
import { StripeCheckout } from "@vue-stripe/vue-stripe";
import { ref } from "vue";
// import { useWeatherStore } from "@/store/weather";

// export default {
//   data() {
//     return {
//       publishableKey: "pk_test_51METmBD1sVm68Cku2ln2Me93Wp255VHtagJz4c95XHXP7Y2OgdQSMgt4PZ7JljB8s1eKLBGyuOwJ67JcANzRqjht00T5y5lwSF",
//       loading: false,
//       lineItems: [
//         {
//           price: "price_1MEWuND1sVm68CkueiKKVU0T",
//           quantity: 1,
//         },
//       ],
//       successUrl: "http://localhost:8080/weather",
//       cancelUrl: "http://localhost:8080/error",
//     };
//   },
//   methods: {
//     submit() {
//       this.$refs.checkoutRef.redirectToCheckout();
//     },
//   },
// };
const checkoutRef = ref(null);
const publishableKey = ref(
  "pk_test_51METmBD1sVm68Cku2ln2Me93Wp255VHtagJz4c95XHXP7Y2OgdQSMgt4PZ7JljB8s1eKLBGyuOwJ67JcANzRqjht00T5y5lwSF"
);
const loading = ref(false);
const lineItems = ref([
  {
    price: "price_1MEWuND1sVm68CkueiKKVU0T",
    quantity: 1,
  },
]);
const successUrl = "http://localhost:8080/weather";
const cancelUrl = "http://localhost:8080/error";

const submit = () => {
  checkoutRef.value.redirectToCheckout();
};
</script>

<style scoped lang="scss">
@import "https://fonts.googleapis.com/css?family=Montserrat:400,700,900&display=swap";
$gradient: linear-gradient(135deg, #72edf2 10%, #5151e5 100%);
* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 1.25em;
}
.clear {
  clear: both;
}
.wrapper {
  margin: 0;
  width: 100%;
  height: 100vh;
  font-family: "Montserrat", sans-serif;
  background-color: #343d4b;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.container {
  border-radius: 25px;
  -webkit-box-shadow: 0 0 70px -10px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 70px -10px rgba(0, 0, 0, 0.2);
  background-color: #222831;
  color: #ffffff;
  height: 400px;
}
.weather-side {
  position: relative;
  height: 100%;
  border-radius: 25px;
  background-image: url("https://images.unsplash.com/photo-1559963110-71b394e7494d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80");
  width: 300px;
  -webkit-box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.2);
  -webkit-transition: -webkit-transform 300ms ease;
  transition: -webkit-transform 300ms ease;
  -o-transition: transform 300ms ease;
  transition: transform 300ms ease;
  transition: transform 300ms ease, -webkit-transform 300ms ease;
  -webkit-transform: translateZ(0) scale(1.02) perspective(1000px);
  transform: translateZ(0) scale(1.02) perspective(1000px);
  float: left;
  &:hover {
    -webkit-transform: scale(1.1) perspective(1500px) rotateY(10deg);
    transform: scale(1.1) perspective(1500px) rotateY(10deg);
  }
}
.weather-gradient {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: $gradient;
  border-radius: 25px;
  opacity: 0.8;
}
.date-container {
  position: absolute;
  top: 25px;
  left: 25px;
}
.date-dayname {
  margin: 0;
}
.date-day {
  display: block;
}
.location {
  display: inline-block;
  margin-top: 10px;
}
.location-icon {
  display: inline-block;
  height: 0.8em;
  width: auto;
  margin-right: 5px;
}
.weather-container {
  position: absolute;
  bottom: 25px;
  left: 25px;
}
.weather-icon.feather {
  height: 60px;
  width: auto;
}
.weather-temp {
  margin: 0;
  font-weight: 700;
  font-size: 4em;
}
.weather-desc {
  margin: 0;
}
.info-side {
  position: relative;
  float: left;
  height: 100%;
  padding-top: 25px;
}
.today-info {
  padding: 15px;
  margin: 0 25px 25px 25px;
  border-radius: 10px;
  > div {
    &:not(:last-child) {
      margin: 0 0 10px 0;
    }
    .title {
      float: left;
      font-weight: 700;
    }
    .value {
      float: right;
    }
  }
}
.week-list {
  list-style-type: none;
  padding: 0;
  margin: 10px 35px;
  -webkit-box-shadow: 0 0 50px -5px rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 50px -5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  > li {
    float: left;
    padding: 15px;
    cursor: pointer;
    -webkit-transition: 200ms ease;
    -o-transition: 200ms ease;
    transition: 200ms ease;
    border-radius: 10px;
    &:hover {
      -webkit-transform: scale(1.1);
      -ms-transform: scale(1.1);
      transform: scale(1.1);
      background: #fff;
      color: #222831;
      -webkit-box-shadow: 0 0 40px -5px rgba(0, 0, 0, 0.2);
      box-shadow: 0 0 40px -5px rgba(0, 0, 0, 0.2);
    }
    .day-name {
      display: block;
      margin: 10px 0 0 0;
      text-align: center;
    }
    .day-icon {
      display: block;
      height: 30px;
      width: auto;
      margin: 0 auto;
    }
    .day-temp {
      display: block;
      text-align: center;
      margin: 10px 0 0 0;
      font-weight: 700;
    }
  }
  > li.active {
    background: #fff;
    color: #222831;
    border-radius: 10px;
  }
}
.location-container {
  padding: 25px 35px;
}
.location-button {
  outline: none;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: none;
  border-radius: 25px;
  padding: 10px;
  font-family: "Montserrat", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  background-image: $gradient;
  color: #ffffff;
  font-weight: 700;
  -webkit-box-shadow: 0 0 30px -5px rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 30px -5px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  -webkit-transition: -webkit-transform 200ms ease;
  transition: -webkit-transform 200ms ease;
  -o-transition: transform 200ms ease;
  transition: transform 200ms ease;
  transition: transform 200ms ease, -webkit-transform 200ms ease;
  &:hover {
    -webkit-transform: scale(0.95);
    -ms-transform: scale(0.95);
    transform: scale(0.95);
  }
  .feather {
    height: 1em;
    width: auto;
    margin-right: 5px;
  }
}
</style>
