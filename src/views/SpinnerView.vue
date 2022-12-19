<template lang="pug">
.pl
  .pl__ball
    .pl__ball-texture
    .pl__ball-outer-shadow
    .pl__ball-inner-shadow
    .pl__ball-side-shadows
</template>

<style scoped>
* {
  border: 0;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
:root {
  font-size: calc(16px + (20 - 16) * (100vw - 320px) / (1280 - 320));
}
body {
  background-color: hsl(223, 90%, 95%);
  font: 1em/1.5 sans-serif;
  height: 100vh;
  display: grid;
  place-items: center;
}
.pl,
.pl__ball,
.pl__ball-inner-shadow,
.pl__ball-side-shadows,
.pl__ball-texture,
.pl__inner-ring,
.pl__outer-ring,
.pl__track-cover {
  border-radius: 50%;
}
.pl {
  position: relative;
  width: 16em;
  height: 16em;
}
.pl__ball,
.pl__ball-inner-shadow,
.pl__ball-outer-shadow,
.pl__ball-side-shadows,
.pl__ball-texture,
.pl__ball-texture:before,
.pl__inner-ring,
.pl__outer-ring,
.pl__track-cover {
  position: absolute;
}
.pl__ball,
.pl__ball-inner-shadow,
.pl__ball-outer-shadow,
.pl__ball-texture:before,
.pl__track-cover {
  animation: ball 3s linear infinite;
}
.pl__ball {
  top: calc(50% - 1.25em);
  left: calc(50% - 1.25em);
  transform: rotate(0) translateY(-6.5em);
  width: 2.5em;
  height: 2.5em;
}
.pl__ball-inner-shadow {
  animation-name: ballInnerShadow;
  box-shadow: 0 0.1em 0.2em hsla(0, 0%, 0%, 0.3),
    0 0 0.2em hsla(0, 0%, 0%, 0.1) inset,
    0 -1em 0.5em hsla(0, 0%, 0%, 0.15) inset;
  width: 100%;
  height: 100%;
}
.pl__ball-outer-shadow {
  animation-name: ballOuterShadow;
  background-image: linear-gradient(hsla(0, 0%, 0%, 0.15), hsla(0, 0%, 0%, 0));
  border-radius: 0 0 50% 50% / 0 0 100% 100%;
  filter: blur(2px);
  top: 50%;
  left: 0;
  width: 100%;
  height: 250%;
  transform: rotate(20deg);
  transform-origin: 50% 0;
  z-index: -2;
}
.pl__ball-side-shadows {
  background-color: hsla(0, 0%, 0%, 0.1);
  filter: blur(2px);
  width: 100%;
  height: 100%;
  transform: scale(0.75, 1.1);
  z-index: -1;
}
.pl__ball-texture {
  overflow: hidden;
  width: 100%;
  height: 100%;
  transform: translate3d(0, 0, 0);
}
.pl__ball-texture:before {
  animation-name: ballTexture;
  animation-duration: 0.25s;
  background: url(https://assets.codepen.io/416221/snow.jpg) 0 0 / 50% 100%;
  content: "";
  display: block;
  filter: brightness(1.05);
  top: 0;
  right: 0;
  width: 200%;
  height: 100%;
}

/* Animations */
@keyframes ball {
  from {
    transform: rotate(0) translateY(-6.5em);
  }
  50% {
    transform: rotate(180deg) translateY(-6em);
  }
  to {
    transform: rotate(360deg) translateY(-6.5em);
  }
}
@keyframes ballInnerShadow {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(-360deg);
  }
}
@keyframes ballOuterShadow {
  from {
    transform: rotate(20deg);
  }
  to {
    transform: rotate(-340deg);
  }
}
@keyframes ballTexture {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(50%);
  }
}
@keyframes trackCover {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
