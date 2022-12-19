<template lang="pug">
.wrapper(v-if="weatherStore.getSpinnerState")
  .container(v-if="weatherStore.getWeatherCurrentLocation")
    .form-check.form-switch.form-switch-temperature
      input#flexSwitchCheckChecked.form-check-input(
        type="checkbox",
        role="switch",
        :checked="temperatureUnit === 'C'",
        @change="changeInputTemperatureUnit"
      )
      label.form-check-label(for="flexSwitchCheckChecked")
        span(v-if="temperatureUnit === 'C'") °C
        span(v-if="temperatureUnit === 'F'") °F
    .form-check.form-switch.form-switch-speed
      input#flexSwitchCheckChecked.form-check-input(
        type="checkbox",
        role="switch",
        :checked="speedUnit === 'kph'",
        @change="changeInputSpeedUnit"
      )
      label.form-check-label(for="flexSwitchCheckChecked")
        span(v-if="speedUnit === 'kph'") km / h
        span(v-if="speedUnit === 'mph'") m / h
    .weather-side
      .weather-gradient
      .date-container
        h2.date-dayname {{ getCurrentDay() }}
        span.date-day {{ weatherStore.getWeatherCurrentLocation.current.last_updated }}
        vue-feather.location-icon(type="map-pin")
        span.location {{ weatherStore.getWeatherCurrentLocation.location.name }},
        span.location {{ weatherStore.getWeatherCurrentLocation.location.country }}
      .weather-container
        vue-faether.weather-icon(type="sun")
        h1.weather-temp(v-if="temperatureUnit === 'C'") {{ weatherStore.getWeatherCurrentLocation.current.temp_c }}°C
        h1.weather-temp(v-else) {{ weatherStore.getWeatherCurrentLocation.current.temp_f }}°F
        h3.weather-desc {{ weatherStore.getWeatherCurrentLocation.current.condition.text }}
    .info-side
      .today-info-container
        .today-info
          .precipitation
            span.title PRECIPITATION
            span.value 0 %
            .clear
          .humidity
            span.title HUMIDITY
            span.value {{ weatherStore.getWeatherCurrentLocation.current.humidity }} %
            .clear
          .wind
            span.title WIND
            span.value(v-if="speedUnit === 'kph'") {{ weatherStore.getWeatherCurrentLocation.current.wind_kph }} km/h
            span.value(v-if="speedUnit === 'mph'") {{ weatherStore.getWeatherCurrentLocation.current.wind_mph }} m/h
            .clear
      .week-container
        ul.week-list
          li
            vue-feather.day-icon(type="wind")
            span.day-name Degree
            span.day-temp {{ weatherStore.getWeatherCurrentLocation.current.wind_degree }}°
          li
            vue-feather.day-icon(type="navigation")
            span.day-name Dir
            span.day-temp {{ weatherStore.getWeatherCurrentLocation.current.wind_dir }}
          li
            vue-feather.day-icon(type="thermometer")
            span.day-name Feel
            span.day-temp(v-if="temperatureUnit === 'C'") {{ weatherStore.getWeatherCurrentLocation.current.feelslike_c }}°C
            span.day-temp(v-if="temperatureUnit === 'F'") {{ weatherStore.getWeatherCurrentLocation.current.feelslike_f }}°F
          li
            vue-feather.day-icon(type="wind")
            span.day-name Gust
            span.day-temp(v-if="speedUnit === 'kph'") {{ weatherStore.getWeatherCurrentLocation.current.gust_kph }} km / h
            span.day-temp(v-if="speedUnit === 'mph'") {{ weatherStore.getWeatherCurrentLocation.current.gust_mph }} m / h
          .clear
      .location-container
        button.location-button(@click="getWeatherGeolocation") Weather of my location
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
    .search-side
      .input-group.mb-3
        input.form-control(
          type="text",
          placeholder="Check the city's weather",
          aria-label="Check the city's weather",
          aria-describedby="button-addon2",
          @keyup.enter="searchLocation",
          v-model="searchedCity"
        )
        button#button-addon2.btn.btn-outline-secondary(
          type="button",
          @click="searchLocation"
        ) Search
SpinnerView(v-else)
</template>

<script setup>
import { StripeCheckout } from "@vue-stripe/vue-stripe";
import { onMounted, ref } from "vue";
import { useWeatherStore } from "../store/weather";
import SpinnerView from "./SpinnerView";
import CONSTANTS from "../constants/index";
import { getCoordinates } from "../scripts/getLocationUser";

const checkoutRef = ref(null);
const weatherStore = useWeatherStore();
const temperatureUnit = ref("C");
const speedUnit = ref("kph");
const searchedCity = ref("");

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

const getWeatherGeolocation = () => {
  // checkoutRef.value.redirectToCheckout();
};

const getCurrentDay = () => {
  const date = new Date();
  const day = date.getDay();
  return CONSTANTS.days[day - 1];
};

const changeInputTemperatureUnit = () => {
  if (temperatureUnit.value === "F") {
    temperatureUnit.value = "C";
    return;
  }

  if (temperatureUnit.value === "C") {
    temperatureUnit.value = "F";
  }
};

const changeInputSpeedUnit = () => {
  if (speedUnit.value === "kph") {
    speedUnit.value = "mph";
    return;
  }

  if (speedUnit.value === "mph") {
    speedUnit.value = "kph";
  }
};

const searchLocation = () => {
  weatherStore.setWeatherCurrentLocation(searchedCity.value);
};

onMounted(async () => {
  await weatherStore.setWeatherCurrentLocation("Lviv");
  let city = getCoordinates();
  console.log(city);
});
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
  position: relative;
  display: flex;
  align-items: center;
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
  margin-right: 10px;
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
    min-width: 90px;
    -webkit-transition: 200ms ease;
    -o-transition: 200ms ease;
    transition: 200ms ease;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
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

.form-check.form-switch.form-switch-temperature {
  top: 20px;
}

.form-check.form-switch.form-switch-speed {
  top: 70px;
}
</style>
