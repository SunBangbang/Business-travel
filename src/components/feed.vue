<template>
  <div class="s">
    <van-nav-bar class="topbar" title="用户反馈" left-text left-arrow @click-left="$router.go(-1)" />

    <div class="s11" v-if="message.status == 1">
      <div class="s1">
        <h1>满意实付金额</h1>
        <div class="s1_content">{{message.money}}元</div>
      </div>
    </div>
    <div class="s11 s22" v-if="message.status == -1">
      <div class="s1">
        <h1>不满意</h1>
        <div class="s1_content cc">{{message.msg_pro}}</div>
      </div>
      <van-button color="#4b91eb" round type="info" @click="returnFanKui(message.id)">重新反馈</van-button>
    </div>
    <div class="s3">
      <!--      <van-button class="btn" color='#ee2d16' round type="info">完成订单</van-button>-->
      <!--      <van-button class="btn" color='#ee2d16' round type="info">取消订单</van-button>-->
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Vue from "vue";
// import qs from "qs";
import { Toast } from "vant";
export default {
  data() {
    return {
      show: false,
      show1: false,
      message: {},
      money: "",
      comment: "",
      token: ""
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.getData();
  },
  methods: {
    returnFanKui(id) {
      this.$router.replace({
        path: `/feedback/${id}`
      });
    },
    getData() {
      axios
        .get(
          "api/user/feedback?requirements_release_id=" + this.$route.params.id
        )
        .then(result => {
          if (result.data.status == 1) {
            this.message = result.data.data[0];
          } else {
            Toast.fail("数据获取失败");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.topbar {
  background-color: #eb2312;
}

.van-nav-bar__title {
  color: #fff;
}

.van-icon-arrow-left:before {
  color: #fff;
}

.s {
  height: 667px;
  background-color: #e6e6e6;
}

.s1 h1 {
  background-color: #fff;
  text-align: center;
  font-size: 20px;
  padding: 6px;
}

.s1_content {
  margin: 10px 15px;
  background-color: #ccc;
  border-radius: 6px;
}

.s1_content p {
  padding-top: 15px;
  padding-left: 10px;
  text-indent: 2em;
  line-height: 30px;
}

.s11 {
  height: 240px;
  background-color: #fff;
}

.s1 img {
  width: 30%;
  margin: 10px 4px;
  float: left;
}

.s2 {
  margin: 0px 30px;
  margin-top: 100px;
}

.s2 button:nth-child(1) {
  width: 100px;
  font-size: 16px;
  float: left;
}

.s2 button:nth-child(2) {
  width: 100px;
  font-size: 16px;
  float: right;
}

.van-dialog {
  width: 200px;
  height: 180px;
}

.van-dialog .van-button {
  width: 120px;
  height: 35px;
  line-height: 35px;
  background-color: red;
  color: #fff;
  margin: 20px 40px;
  border-radius: 50px;
}

.shu {
  margin-left: 30px;
}

.shu input {
  width: 80%;
  height: 50px;
  border: none;
  background-color: #f2f1f1;
}

.shu1 {
  margin-left: 10px;
}

.shu1 input {
  width: 95%;
  height: 70px;
  border: none;
  background-color: #f2f1f1;
}

.s1_content {
  width: 300px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  margin-left: 36px;
}

.s11 {
  height: 150px;
  margin-bottom: 10px;
}

.s1 {
  /*height:200px;*/
  margin-bottom: 10px;
}

.cc {
  /*height: 130px;*/
  height: auto;
  overflow: hidden;
}

.s22 {
  /*height:260px;*/
  height: auto;
  overflow: hidden;
  padding-bottom: 20px;
}

.van-button {
  width: 170px;
  margin-left: 95px;
}

.s3 {
  display: flex;
  margin-top: 30px;
  justify-content: space-around;
}

.btn {
  margin-left: 0px;
  width: 110px;
}
</style>
