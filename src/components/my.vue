<template>
  <!--我的页面-->
  <div class="user">
    <div class="user-info userlist">
      <van-row>
        <van-col span="24" class="setting">
          <img src="../assets/setting.png" style="width: 20px" />
        </van-col>
        <van-col span="24" class="head">
          <div class="header_img">
            <img src="../assets/head.png" class="g-img-round g-img-responsive headico" alt />
          </div>
        </van-col>
        <van-col span="24" class="title t-padded-t-10">{{userInfo.name?'':'冬瓜'}}</van-col>
        <van-col span="24" class="title t-font-size-12 t-padded-t-5">{{userInfo.phone}}</van-col>
      </van-row>
    </div>
    <van-row class="user-links">
      <van-col span="8" @click="turnToFaBu" v-if="userInfo.user_type == 1">
        <img src="../assets/yue.png" style="width: 30px;height: 30px" />
        <div class="t-padded-t-6">发布记录</div>
      </van-col>
      <van-col span="8" @click="turnToFaBu" v-if="userInfo.user_type == 5">
        <img src="../assets/yue.png" style="width: 30px;height: 30px" />
        <div class="t-padded-t-6">接收记录</div>
      </van-col>
      <van-col span="8">
        <img src="../assets/order.png" style="width: 30px;height: 30px" />
        <div class="t-padded-t-6">消费记录</div>
      </van-col>
      <van-col span="8">
        <img src="../assets/jifen.png" style="width: 30px;height: 30px" />
        <div class="t-padded-t-6">我的余额</div>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="24" class="commonstyle van-hairline--bottom">
        <div class="commonstyletitle">
          <img src="../assets/charge.png" alt style="width: 20px;" />
          <div class="commonstyletitlefont">提交截图</div>
        </div>
        <img src="../assets/arrowright.png" alt style="width: 8px;height: 12px;" />
      </van-col>
    </van-row>
    <van-row>
      <van-col span="24" class="van-hairline--bottom">
        <div class="commonstyle">
          <div class="commonstyletitle">
            <img src="../assets/yuding.png" alt style="width: 20px;" />
            <div class="commonstyletitlefont">个人资料</div>
          </div>
          <img src="../assets/arrowright.png" alt style="width: 8px;height: 12px;" />
        </div>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="24" class="commonstyle van-hairline--bottom">
        <div class="commonstyletitle">
          <img src="../assets/ziliao.png" alt style="width: 20px;" />
          <div class="commonstyletitlefont">关于我们</div>
        </div>
        <img src="../assets/arrowright.png" alt style="width: 8px;height: 12px;" />
      </van-col>
    </van-row>
    <van-row>
      <van-col span="24" class="commonstyle van-hairline--bottom">
        <div class="commonstyletitle">
          <img src="../assets/ziliao.png" alt style="width: 20px;" />
          <div class="commonstyletitlefont">投诉建议</div>
        </div>
        <img src="../assets/arrowright.png" alt style="width: 8px;height: 12px;" />
      </van-col>
    </van-row>
    <van-row>
      <van-col span="24">
        <div class="login_out" @click="loginOut">退出登录</div>
      </van-col>
    </van-row>
    <!-- <div class="tabbar">
      <div class="active" @click="turnTo">
        <van-icon name="wap-home"></van-icon>
        <div>首页</div>
      </div>
      <div>
        <van-icon name="contact"></van-icon>
        <div>我的</div>
      </div>
      <div class="center">
        <van-icon name="plus" @click="turnTo"></van-icon>
      </div>
    </div> -->
    <tab-bar index="active" my="" @turnIndex="turnTo" @turnCenter="turnTo"></tab-bar>
  </div>
</template>

<script>
import { Row, Col, Icon } from "vant";
import tabBar from "./tabbar.vue";
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
  methods: {
    tiJiaoJieTu() {
      this.$router.push({
        name: "feedback"
      });
    },
    turnTo() {
      if (this.userInfo.user_type == 5) {
        this.$router.push({
          name: "resave"
        });
      } else {
        this.$router.push({
          name: "home"
        });
      }
    },
    turnToFaBu() {
      if (this.userInfo.user_type == 5) {
        this.$router.push({
          name: "resaves"
        });
      } else {
        this.$router.push({
          name: "product"
        });
      }
    },
    loginOut() {
      localStorage.clear();
      this.$router.replace({
        name: "login"
      });
    }
  },
  components:{
    "van-col": Col, 
    "van-row": Row,
    "van-icon": Icon,
    tabBar
  }
};
</script>

<style lang="less" scoped>
// .tabbar {
//   height: 45px;
//   display: flex;
//   justify-content: space-between;
//   padding: 6px 15%;
//   position: fixed;
//   left: 0;
//   width: 70%;
//   bottom: 0;
//   z-index: 99999;
//   background-color: #fff;
//   .center {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     position: absolute;
//     top: -30px;
//     left: 40vw;
//     width: 20vw;
//     height: 60px;
//     border-radius: 50%;
//     background-color: #fff;
//     z-index: 6666;
//     color: #afafaf;
//     i {
//       font-size: 26px;
//       font-weight: bold;
//     }
//   }
//   > div {
//     text-align: center;
//     color: #eb2211;
//     font-size: 12px;
//     i {
//       font-size: 22px;
//       font-weight: bold;
//     }
//   }
//   .active {
//     color: #afafaf;
//   }
// }
.user {
  height: 100vh;
  background-color: #f4f4f4;
  padding-bottom: 40px;
  .login_out {
    width: 120px;
    height: 30px;
    background-color: #eb2211;
    line-height: 30px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    border-radius: 20px;
    margin: 20px auto;
  }
  .icon {
    vertical-align: -4px;
  }
  .headico {
    width: 80px;
    height: 80px;
    border: 2px rgba(250, 250, 250, 1) solid;
    border-radius: 50%;
  }
  &-info {
    // 用户信息
    height: 200px;
    width: 100%;
    /*background: url("../assets/txbg.png") no-repeat top center;*/
    /*background-size: 100% 100%;*/
    background-color: #eb2211;
  }
  &-links {
    background-color: #fff;

    margin: 10px 0 10px 0;
    padding: 30px 0;
    /*height: 100px;*/
    font-size: 12px;
    text-align: center;
    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
  .head {
    text-align: center;
    // .header_img {
    // }
  }
  .title {
    padding-top: 5px;
    text-align: center;
    color: #fff;
  }
  .setting {
    text-align: right;
    padding: 25px 15px 0 0;
  }
}
</style>
