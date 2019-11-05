<template>
  <div class="tabbar">
    <div :class="index" @click="turnToHome">
      <van-icon name="wap-home"></van-icon>
      <div>首页</div>
    </div>
    <div :class="my" @click="turnToMy">
      <van-icon name="contact"></van-icon>
      <div>我的</div>
    </div>
    <div class="center">
      <van-icon name="plus" @click="turnToCenter"></van-icon>
    </div>
  </div>
</template>
<script>
import { Icon } from "vant";
export default {
  props:["index","my"],
  data() {
    return {
    }
  },
  methods: {
    turnToHome(){
      this.$emit("turnIndex");
    },
    turnToMy(){
       this.$emit("turnMy");
    },
    turnToCenter(){
      this.$emit("turnCenter");
    }
  },
  components: {
    "van-icon": Icon,
  }
}
</script>
<style lang="less" scoped>
.tabbar {
  height: 45px;
  display: flex;
  justify-content: space-between;
  padding: 6px 15%;
  position: fixed;
  left: 0;
  width: 70%;
  bottom: 0;
  z-index: 99999;
  background-color: #fff;

  .center {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -30px;
    left: 40vw;
    width: 20vw;
    height: 60px;
    border-radius: 50%;
    background-color: #fff;
    z-index: 6666;
    color: #afafaf;

    i {
      font-size: 26px;
      font-weight: bold;
    }
  }

  > div {
    text-align: center;
    color: #eb2211;
    font-size: 12px;

    i {
      font-size: 22px;
      font-weight: bold;
    }
  }

  .active {
    color: #afafaf;
  }
}
</style>