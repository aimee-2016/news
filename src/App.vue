<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">资讯</router-link>|
      <router-link to="/about">视频</router-link>
      <router-link to="/" class="add">Home</router-link>|
      <router-link to="/about">话题</router-link>
      <router-link to="/">我的</router-link>|
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.add {
  width: 40px;
  height: 40px;
  background-size: 40px 40px;
  background-repeat: no-repeat;
  // @include border-1px(green);
  @include bg-image("./assets/img/形状55");
}
</style>
