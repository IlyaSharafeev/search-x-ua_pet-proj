<template>
  <main data-aos="fade-down" :class="{ fixed: found }">
    <div class="title-container" :class="{ none: found }">
      <h1 class="title">It's all about context.</h1>
      <h1 class="title-down">
        You search in Spotify
        <span class="title-search-word">{{ searchInputValue }}</span>
      </h1>
    </div>

    <div class="field-container" :class="{ fixed: found }">
      <input
        @input="search(searchInputValue)"
        v-model="searchInputValue"
        type="text"
        placeholder="Search..."
        class="field"
      />
      <div class="icons-container">
        <div class="icon-search"></div>
        <div class="icon-close" @click="clearSearchInput">
          <div class="x-up"></div>
          <div class="x-down"></div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref, defineProps } from "vue";
import { useSpotifyStore } from "@/store/spotify";

defineProps({
  found: Object,
  default: () => undefined,
});

const searchInputValue = ref("");
const spotifyStore = useSpotifyStore();

const checkInputState = () => {
  document.querySelector(".field").addEventListener("focus", function () {
    document.querySelector(".search-view").classList.add("is-focus");
  });

  document.querySelector(".field").addEventListener("blur", function () {
    document
      .querySelector(".search-view")
      .classList.remove("is-focus", "is-type");
  });

  document
    .querySelector(".field")
    .addEventListener("keydown", function (event) {
      document.querySelector(".search-view").classList.add("is-type");
      if (event.which === 8 && this.value === "") {
        document.querySelector(".search-view").classList.remove("is-type");
      }
    });
};

const search = debounce((searchValue: string) => {
  if (searchValue !== "") {
    spotifyStore.searchSpotify(searchValue);
    const searchElement = document.querySelector('main[data-aos="fade-down"]');
    searchElement.removeAttribute("data-aos");
  }
}, 2000);

const clearSearchInput = () => {
  searchInputValue.value = "";
};

onMounted(() => {
  checkInputState();
});

function debounce(callee, timeoutMs) {
  // Как результат возвращаем другую функцию.
  // Это нужно, чтобы мы могли не менять другие части кода,
  // чуть позже мы увидим, как это помогает.
  return function perform(...args) {
    // В переменной previousCall мы будем хранить
    // временную метку предыдущего вызова...
    let previousCall = this.lastCall;

    // ...а в переменной текущего вызова —
    // временную метку нынешнего момента.
    this.lastCall = Date.now();

    // Нам это будет нужно, чтобы потом сравнить,
    // когда была функция вызвана в этот раз и в предыдущий.
    // Если разница между вызовами меньше, чем указанный интервал,
    // то мы очищаем таймаут...
    if (previousCall && this.lastCall - previousCall <= timeoutMs) {
      clearTimeout(this.lastCallTimer);
    }

    // ...который отвечает за непосредственно вызов функции-аргумента.
    // Обратите внимание, что мы передаём все аргументы ...args,
    // который получаем в функции perform —
    // это тоже нужно, чтобы нам не приходилось менять другие части кода.
    this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs);

    // Если таймаут был очищен, вызова не произойдёт
    // если он очищен не был, то callee вызовется.
    // Таким образом мы как бы «отодвигаем» вызов callee
    // до тех пор, пока «снаружи всё не подуспокоится».
  };
}
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Montserrat);

$hint: #faf8f8;
$turqoise: #17ead9;
$cornflower-blue: #6078ea;
$cornflower-black: #020936;
$tundora: #4b4848;
$electric-violet: #7c26f8;
$snappy: cubic-bezier(0.694, 0.048, 0.335, 1);

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes color-1 {
  0% {
    background-color: #eb73b9;
  }
  100% {
    background-color: #17ead9;
  }
}

::selection {
  background: $cornflower-blue;
  color: white;
  text-shadow: none;
}

::-webkit-selection {
  background: $cornflower-blue;
  color: white;
  text-shadow: none;
}

.search-input-container {
  font-family: "Montserrat", "Helevtica", sans-serif;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;

  &.fixed {
    position: sticky;
    top: 0;
    z-index: 2;
    background: aliceblue;
  }
}

.title-container {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
  z-index: 2;
  &.none {
    display: none;
  }
  .title {
    transform: translateY(-100%);
    transition: transform 0.3s ease;
    transition-delay: 0.25s;
    margin: 0;
    color: $cornflower-blue;
  }
  .title-down {
    transform: translateY(100%);
    transition: transform 0.3s ease;
    transition-delay: 0.25s;
    margin: 0;
    color: $cornflower-blue;
  }
  .title-search-word {
    color: $cornflower-black;
  }
  .is-focus & {
    .title {
      transform: translateY(0);
    }
  }
  .is-type & {
    .title-down {
      transform: translateY(-30px);
    }
    .title {
      transform: translateY(-100%);
    }
  }
}

.field-container {
  position: relative;
  padding: 0;
  margin: 0;
  border: 0;
  width: 400px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  &.fixed {
    margin: 30px auto;
  }
}

.icons-container {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 35px;
  height: 35px;
  overflow: hidden;
}

.icon-close {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 75%;
  height: 75%;
  opacity: 0;
  cursor: pointer;
  transform: translateX(-200%);
  border-radius: 50%;
  transition: opacity 0.25s ease, transform 0.43s $snappy;
  &:before {
    content: "";
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    border: 2px solid $cornflower-blue;
    border-right-color: transparent;
    transition: opacity 0.2s ease;
  }
  .x-up {
    position: relative;
    width: 100%;
    height: 50%;
    &:before {
      content: "";
      position: absolute;
      bottom: 2px;
      left: 3px;
      width: 50%;
      height: 2px;
      background-color: $cornflower-blue;
      transform: rotate(45deg);
    }
    &:after {
      content: "";
      position: absolute;
      bottom: 2px;
      right: 0px;
      width: 50%;
      height: 2px;
      background-color: $cornflower-blue;
      transform: rotate(-45deg);
    }
  }
  .x-down {
    position: relative;
    width: 100%;
    height: 50%;
    &:before {
      content: "";
      position: absolute;
      top: 5px;
      left: 4px;
      width: 50%;
      height: 2px;
      background-color: $cornflower-blue;
      transform: rotate(-45deg);
    }
    &:after {
      content: "";
      position: absolute;
      top: 5px;
      right: 1px;
      width: 50%;
      height: 2px;
      background-color: $cornflower-blue;
      transform: rotate(45deg);
    }
  }
  .is-type & {
    //&:before {
    //  opacity: 1;
    //  animation: spin 0.85s infinite;
    //}
    .x-up {
      &:before,
      &:after {
        animation: color-1 0.85s infinite;
      }
      &:after {
        animation-delay: 0.3s;
      }
    }
    .x-down {
      &:before,
      &:after {
        animation: color-1 0.85s infinite;
      }
      &:before {
        animation-delay: 0.2s;
      }
      &:after {
        animation-delay: 0.1s;
      }
    }
  }
}

.icon-search {
  position: relative;
  top: 5px;
  left: 8px;
  width: 50%;
  height: 50%;
  opacity: 1;
  border-radius: 50%;
  border: 3px solid mix($cornflower-blue, white, 35%);
  transition: opacity 0.25s ease, transform 0.43s $snappy;
  &:after {
    content: "";
    position: absolute;
    bottom: -9px;
    right: -2px;
    width: 4px;
    border-radius: 3px;
    transform: rotate(-45deg);
    height: 10px;
    background-color: mix($cornflower-blue, white, 35%);
  }
}

.field {
  border: 0;
  width: 100%;
  height: 100%;
  padding: 20px 20px;
  background: white;
  border-radius: 3px;
  box-shadow: 0 8px 15px rgba($tundora, 0.1);
  transition: all 0.4s ease;
  &:focus {
    outline: none;
    box-shadow: 0 9px 20px rgba($tundora, 0.3);
    + .icons-container {
      .icon-close {
        opacity: 1;
        transform: translateX(0);
      }
      .icon-search {
        opacity: 0;
        transform: translateX(200%);
      }
    }
  }
}
</style>
