<template>
  <div id="home">
    <div id="nav">
      <router-link to="/news">资讯</router-link>
      <router-link to="/video">视频</router-link>
      <router-link to="/add" class="add">
        <img src="../assets/img/形状55.png" alt="add" />
      </router-link>
      <router-link to="/topic">话题</router-link>
      <router-link to="/about">我的</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
#home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 58px;
  background: #ffffff;
  a {
    flex: 1;
    font-size: 15px;
    font-weight: bold;
    color: #666666;
    &.router-link-exact-active {
      color: #c4a655;
    }
  }
}
// .add {
//   width: 40px;
//   height: 40px;
//   background-size: 40px 40px;
//   background-repeat: no-repeat;
//   // @include border-1px(green);
//   // @include bg-image("./assets/img/形状55");
// }
</style>
