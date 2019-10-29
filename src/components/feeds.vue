<template>
  <div class="s">
    <van-nav-bar class="topbar" title="反馈信息" left-text left-arrow @click-left="$router.go(-1)" />
    <div class="s11">
      <div class="s1">
        <h1>供应商</h1>
        <div class="s1_content">
          <p>{{message?message.msg_mer:''}}</p>
          <img
            :src="'http://45.125.44.112/' + item"
            v-for="(item,index) in message.image"
            :key="index"
          />
        </div>
      </div>
    </div>

    <div class="s2">
      <van-button @click="agree" color="#ee2d16" round type="info">满意</van-button>
      <van-button @click="disagree" color="#ee2d16" round type="info">不满意</van-button>
    </div>
    <div>
      <van-dialog
        v-model="isShow"
        title="实际支付金额"
        :show-confirm-button="false"
      >
        <div class="shu">
          <van-field v-model="money" type="number" placeholder="请输入金额" />
        </div>
        <van-button type="danger" @click="manYi">确认</van-button>
      </van-dialog>

      <van-dialog
        v-model="isShow1"
        title="反馈"
        :show-confirm-button="false"
      >
        <div class="shu1">
          <van-field v-model="comment" type="text" placeholder="请输入备注" />
        </div>
        <van-button type="danger" @click="buManYi">确认</van-button>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import qs from "qs";
import { NavBar, Field, Button, Dialog, Toast } from "vant";
export default {
  data() {
    return {
      isShow: false,
      isShow1: false,
      message: {msg_mer:"得心互力网络科技有限公司"},
      money: "",
      comment: "",
      token: ""
    };
  },
  components:{
    "van-dialog": Dialog.Component,
    "van-button": Button, 
    "van-field": Field, 
    "van-nav-bar": NavBar
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.getData();
  },
  methods: {
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
    },
    manYi() {
      if (!this.money) {
        Toast.fail({
          message: "请输入金额",
          duration: 2000
        });
        this.isShow = true;
        return;
      }
      axios
        .put(
          "api/user/feedback/" + this.message.id,
          qs.stringify({
            api_token: this.token,
            status: 1,
            money: this.money
          })
        )
        .then(result => {
          if (result.data.status == 1) {
            Toast.success(result.data.msg);
            setTimeout(() => {
              this.$router.replace({
                name: "resave"
              });
            }, 500);
          } else {
            Toast.fail("修改失败");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    buManYi() {
      if (!this.comment) {
        Toast.fail({
          message: "请输入备注",
          duration: 2000
        });
        return;
      }
      axios
        .put(
          "api/user/feedback/" + this.message.id,
          qs.stringify({
            api_token: this.token,
            msg_pro: this.comment,
            status: -1
          })
        )
        .then(result => {
          if (result.data.status == 1) {
            Toast.success(result.data.msg);
            setTimeout(() => {
              this.$router.replace({
                name: "resave"
              });
            }, 500);
          } else {
            Toast.fail("修改失败");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    agree() {
      this.isShow = true;
    },
    disagree() {
      this.isShow1 = true;
    }
  },
};
</script>
<style>
.shu input {
  width: 100%;
}
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
  padding: 15px;
  /*text-indent: 2em;*/
  line-height: 30px;
}

.s11 {
  /*height: 240px;*/
  height: auto;
  overflow: hidden;
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

/*.shu {*/
/*  margin-left: 30px;*/
/*}*/

.shu input {
  width: 100%;
  height: 50px;
  border: none;
  background-color: #f2f1f1;
  padding-left: 10px;
}

.shu1 {
  margin-left: 10px;
}

.shu1 input {
  width: 100%;
  height: 50px;
  border: none;
  background-color: #f2f1f1;
}
</style>
