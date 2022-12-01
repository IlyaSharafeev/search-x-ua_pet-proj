<template lang="pug">
router-link.card(:to="{ name: 'SearchView' }")
  .content
    h2.title {{ card.title }}
    p.copy {{ card.copy }}
    button.btn {{ card.button }}
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps({
  card: Object,
  default: () => undefined,
});
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Cardo:400i|Rubik:400,700&display=swap");

$imageIds: "background-spotify.png", "background-spotify-2.png",
  "background-spotify-3.png", "background-spotify-4.png";

$bp-mobile: 600px;
$bp-tablet: 900px;

* {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
  display: grid;
  place-items: center;
}

.page-content {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  grid-gap: 1rem;
  padding: 1rem;
  margin: 0 auto;
  font-family: var(--font-sans);
  background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );

  @media (max-width: $bp-mobile) {
    flex-direction: column;
  }

  @media (max-width: $bp-tablet) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.card {
  position: relative;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  padding: 1rem;
  width: 100%;
  justify-content: end;
  text-align: center;
  color: whitesmoke;
  background-color: whitesmoke;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1),
    0 4px 4px rgba(0, 0, 0, 0.1), 0 8px 8px rgba(0, 0, 0, 0.1),
    0 16px 16px rgba(0, 0, 0, 0.1);

  @media (min-width: $bp-mobile) {
    height: 350px;
  }

  @media (max-width: $bp-mobile) {
    justify-content: initial;
    padding: initial;
  }

  @media (max-width: $bp-tablet) {
    justify-content: center;
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 110%;
    background-size: cover;
    background-position: 0 0;
    transition: transform calc(var(--d) * 1.5) var(--e);
    pointer-events: none;
  }

  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    pointer-events: none;
    background-image: linear-gradient(
      to bottom,
      hsla(0, 0%, 0%, 0) 0%,
      hsla(0, 0%, 0%, 0.009) 11.7%,
      hsla(0, 0%, 0%, 0.034) 22.1%,
      hsla(0, 0%, 0%, 0.072) 31.2%,
      hsla(0, 0%, 0%, 0.123) 39.4%,
      hsla(0, 0%, 0%, 0.182) 46.6%,
      hsla(0, 0%, 0%, 0.249) 53.1%,
      hsla(0, 0%, 0%, 0.32) 58.9%,
      hsla(0, 0%, 0%, 0.394) 64.3%,
      hsla(0, 0%, 0%, 0.468) 69.3%,
      hsla(0, 0%, 0%, 0.54) 74.1%,
      hsla(0, 0%, 0%, 0.607) 78.8%,
      hsla(0, 0%, 0%, 0.668) 83.6%,
      hsla(0, 0%, 0%, 0.721) 88.7%,
      hsla(0, 0%, 0%, 0.762) 94.1%,
      hsla(0, 0%, 0%, 0.79) 100%
    );
    transform: translateY(-50%);
    transition: transform calc(var(--d) * 2) var(--e);
  }

  @each $id in $imageIds {
    $i: index($imageIds, $id);

    &:nth-child(#{$i}):before {
      //-#{$id}
      background-image: url(/src/assets/start-cards/#{$id});
    }
  }
}

.content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
  transition: transform var(--d) var(--e);
  z-index: 1;

  > * + * {
    margin-top: 1rem;
  }
}

.title {
  font-size: 1.3rem;
  font-weight: bold;
  line-height: 1.2;
}

.copy {
  font-family: var(--font-serif);
  font-size: 1.125rem;
  font-style: italic;
  line-height: 1.35;
}

.btn {
  cursor: pointer;
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.65rem;
  font-weight: bold;
  letter-spacing: 0.025rem;
  text-transform: uppercase;
  color: white;
  background-color: black;
  border: none;

  &:hover {
    background-color: lighten(black, 5%);
  }

  &:focus {
    outline: 1px dashed yellow;
    outline-offset: 3px;
  }
}

@media (hover: hover) and (min-width: $bp-tablet) {
  .card:after {
    transform: translateY(0);
  }

  .content {
    transform: translateY(calc(100% - 4.5rem));

    > *:not(.title) {
      opacity: 0;
      transform: translateY(1rem);
      transition: transform var(--d) var(--e), opacity var(--d) var(--e);
    }
  }

  .card:hover,
  .card:focus-within {
    align-items: center;

    &:before {
      transform: translateY(-4%);
    }

    &:after {
      transform: translateY(-50%);
    }

    .content {
      transform: translateY(0);

      > *:not(.title) {
        opacity: 1;
        transform: translateY(0);
        transition-delay: calc(var(--d) / 8);
      }
    }
  }

  .card:focus-within {
    &:before,
    &:after,
    .content,
    .content > *:not(.title) {
      transition-duration: 0s;
    }
  }
}
</style>
