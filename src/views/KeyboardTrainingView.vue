<template lang="pug">
.wrapper
  .check-statistic
    img.pulse(
      v-if="timeStore.getTime",
      src="@/assets/watch.svg",
      @click="showStatisticModal = true"
    )
  StatisticModal(
    v-if="showStatisticModal",
    :is-open="showStatisticModal",
    @close="closeStatisticModal"
  )
  StopWatch(ref="StopWatchComponent")
  ToggleButton(
    :toggle="toggleButton",
    @restart="restart",
    @start="start",
    @stop="stop"
  )
  h1.title(
    v-if="keysLength",
    data-aos="fade-down",
    data-aos-duration="700",
    data-aos-easing="linear"
  ) Eyes on the screen
  h1.title.success-title(v-else) Training is over
  .keyboard
    ul.row.row-0(
      data-aos="fade-down",
      data-aos-duration="600",
      data-aos-easing="linear"
    )
      li#esc.pinky ESC
      li#1.pinky 1
      li#2.ring 2
      li#3.middle 3
      li#4.pointer1st 4
      li#5.pointer2nd 5
      li#6.pointer2nd 6
      li#7.pointer1st 7
      li#8.middle 8
      li#9.ring 9
      li#10.pinky 0
      li.pinky -
      li.pinky +
      li#back.pinky BACK
    ul.row.row-1(
      data-aos="fade-down",
      data-aos-duration="500",
      data-aos-easing="linear"
    )
      li#tab.pinky TAB
      li#Q.pinky Q
      li#W.ring W
      li#E.middle E
      li#R.pointer1st R
      li#T.pointer2nd T
      li#Y.pointer2nd Y
      li#U.pointer1st U
      li#I.middle I
      li#O.ring O
      li#P.pinky P
      li.pinky [
      li.pinky ]
      li.pinky \
    ul.row.row-2(
      data-aos="fade-down",
      data-aos-duration="400",
      data-aos-easing="linear"
    )
      li#caps.pinky CAPS
      li#A.pinky A
      li#S.ring S
      li#D.middle D
      li#F.pointer1st F
      li#G.pointer2nd G
      li#H.pointer2nd H
      li#J.pointer1st J
      li#K.middle K
      li#L.ring L
      li.pinky :
      li.pinky &apos;&apos;
      li#enter.pinky ENTER
    ul.row.row-3(
      data-aos="fade-down",
      data-aos-duration="300",
      data-aos-easing="linear"
    )
      li#left-shift.pinky SHIFT
      li#Z.pinky Z
      li#X.ring X
      li#C.middle C
      li#V.pointer1st V
      li#B.pointer2nd B
      li#N.pointer2nd N
      li#M.pointer1st M
      li.middle ,
      li.ring .
      li.pinky ;
      li#right-shift.pinky SHIFT
  h1.title(
    v-if="keysLength",
    data-aos="fade-down",
    data-aos-duration="200",
    data-aos-easing="linear"
  ) Characters left {{ keysLength }}
  h1.title.success-title(v-else) Training is over
  PyroEffects(:show-pyro="showPyro")
</template>

<script lang="ts" setup>
import { ref } from "vue";
import StopWatch from "@/components/StopWatch.vue";
import ToggleButton from "@/components/buttons/ToggleButton.vue";
import StatisticModal from "@/components/modals/StatisticModal.vue";
import { useTimeStore } from "@/store/timer";
import PyroEffects from "@/components/effects/PyroEffects.vue";

// const keys = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
let keys = [..."ABC"];
let selectKey = ref(false);
let keysLength = ref(keys.length);
let toggleButton = ref("");
let showPyro = ref(false);
const StopWatchComponent = ref(null) as any;
const showStatisticModal = ref(false);
const timeStore = useTimeStore();

const closeStatisticModal = () => {
  showStatisticModal.value = false;
};

const getRandomNumber = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomKey = () => {
  return keys[getRandomNumber(0, keys.length - 1)];
};

const targetRandomKey = () => {
  //If the buttons is not already selected
  if (!selectKey.value) {
    const key = document.getElementById(getRandomKey()) as HTMLBodyElement;
    key.classList.add("selected");
    selectKey.value = true;
  }
};

document.addEventListener("keyup", (event) => {
  const keyPressed = String.fromCharCode(event.keyCode);
  const keyElement = document.getElementById(keyPressed) as HTMLBodyElement;
  const highlightedKey = document.querySelector(".selected") as HTMLBodyElement;

  if (!keyPressed || !keyElement || !highlightedKey) {
    return;
  }

  //adding animation according to the required configuration
  keyElement.classList.add("hit");
  keyElement.addEventListener("animationend", () => {
    keyElement.classList.remove("hit");
  });

  if (keyPressed === highlightedKey.innerHTML) {
    const myIndex = keys.indexOf(keyPressed);
    if (myIndex !== -1) {
      keys.splice(myIndex, 1);
    }
    keysLength.value = keys.length;
    highlightedKey.classList.remove("selected");
    if (keysLength.value === 0) {
      toggleButton.value = "restart";
      StopWatchComponent.value.stopTimer(true);
      showPyro.value = true;
      return;
    }
    selectKey.value = false;
    targetRandomKey();
  }
});

const restart = () => {
  // keys = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  keys = [..."ABC"];
  keysLength.value = keys.length;
  selectKey.value = false;
  targetRandomKey();
  showPyro.value = false;
  toggleButton.value = "stop";
  StopWatchComponent.value.resetTimer();
  StopWatchComponent.value.startStopWatchOnClick();
};

const start = () => {
  targetRandomKey();
  toggleButton.value = "stop";
  StopWatchComponent.value.startStopWatchOnClick();
};

const stop = () => {
  toggleButton.value = "start";
  StopWatchComponent.value.stopTimer();
};
</script>

<style lang="scss" scoped>
button {
  margin: 50px;
  font-family: inherit;
}

.check-statistic {
  padding: 15px;
  cursor: pointer;
  z-index: 2;
}

.wrapper {
  background-color: black;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.title {
  color: mintcream;
  text-transform: uppercase;
  margin-top: 3em;
  margin-bottom: 3em;
  font-size: 1em;
  letter-spacing: 0.3em;
  &.success-title {
    color: aquamarine;
  }
}

.keyboard {
  display: flex;
  flex-direction: column;
}

.row {
  list-style: none;
  display: flex;
}

li {
  height: 3em;
  width: 3em;
  color: rgba(0, 0, 0, 0.7);
  border-radius: 0.4em;
  line-height: 3em;
  letter-spacing: 1px;
  margin: 0.4em;
  transition: 0.3s;
  text-align: center;
  font-size: 1em;
}

#tab {
  width: 5em;
}

#caps {
  width: 6em;
}

#left-shift {
  width: 8em;
}

#enter {
  width: 6em;
}

#right-shift {
  width: 8em;
}

#back {
  width: 5em;
}

.pinky {
  background-color: crimson;
  border: 2px solid crimson;
  display: flex;
  justify-content: center;
}
.pinky.selected {
  color: crimson;
}

.ring {
  background-color: coral;
  border: 2px solid coral;
}
.ring.selected {
  color: coral;
}

.middle {
  background-color: darkorange;
  border: 2px solid darkorange;
}
.middle.selected {
  color: darkorange;
}

.pointer1st {
  background-color: gold;
  border: 2px solid gold;
}
.pointer1st.selected {
  color: gold;
}

.pointer2nd {
  background-color: khaki;
  border: 2px solid khaki;
}
.pointer2nd.selected {
  color: khaki;
}

.fill-out-key {
  background-color: slategrey;
  border: 2px solid slategrey;
}

.selected {
  background-color: transparent;
  -webkit-animation: vibrate-1 0.3s linear infinite both;
  animation: vibrate-1 0.3s linear infinite both;
}

.hit {
  -webkit-animation: hit 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: hit 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@-webkit-keyframes hit {
  0% {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes hit {
  0% {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@-webkit-keyframes vibrate-1 {
  0% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
  20% {
    -webkit-transform: translate(-2px, 2px);
    transform: translate(-2px, 2px);
  }
  40% {
    -webkit-transform: translate(-2px, -2px);
    transform: translate(-2px, -2px);
  }
  60% {
    -webkit-transform: translate(2px, 2px);
    transform: translate(2px, 2px);
  }
  80% {
    -webkit-transform: translate(2px, -2px);
    transform: translate(2px, -2px);
  }
  100% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
}
@keyframes vibrate-1 {
  0% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
  20% {
    -webkit-transform: translate(-2px, 2px);
    transform: translate(-2px, 2px);
  }
  40% {
    -webkit-transform: translate(-2px, -2px);
    transform: translate(-2px, -2px);
  }
  60% {
    -webkit-transform: translate(2px, 2px);
    transform: translate(2px, 2px);
  }
  80% {
    -webkit-transform: translate(2px, -2px);
    transform: translate(2px, -2px);
  }
  100% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
}

/*Pulsing buttons*/
.pulse {
  display: block;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 0 rgba(204, 169, 44, 0.4);
  animation: pulse 2s infinite;
}
.pulse:hover {
  animation: none;
}

@-webkit-keyframes pulse {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.4);
  }
  70% {
    -webkit-box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
  }
  100% {
    -webkit-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
  }
}
@keyframes pulse {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.4);
    box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.4);
  }
  70% {
    -moz-box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
    box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
  }
  100% {
    -moz-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
    box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
  }
}
</style>
