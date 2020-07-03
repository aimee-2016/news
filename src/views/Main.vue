<template>
  <div id="main">
    <div id="nav">
      <router-link to="/home">资讯</router-link>
      <router-link to="/video">视频</router-link>
      <router-link to="/add" class="add">
      </router-link>
      <router-link to="/topic">话题</router-link>
      <router-link to="/my">我的</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
// .home {
//   background: red;
// }
#nav {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 58px;
  background: #ffffff;
  text-align: center;
  a {
    font-size: 15px;
    font-weight: bold;
    color: #666666;
    &.router-link-exact-active {
      color: #c4a655;
    }
  }
}
.add {
  width: 40px;
  height: 40px;
  background-size: 40px 40px;
  background-repeat: no-repeat;
  // @include border-1px(green);
  @include bg-image("../assets/img/home/add");
}
</style>
