<template>
  <div class="register">
    <h1>商旅伴侣</h1>
    <!--<div class="select">-->
    <!--<div><span></span>商户</div>-->
    <!--<div><span></span>供应商</div>-->
    <!--</div>-->
    <div class="user-info">
      <input placeholder="请输入手机号" type="text" v-model="phone" />
      <!--<div class="user-code">-->
      <!--<input placeholder="请输入验证码" type="text" v-model="code">-->
      <!--<button>获取验证码</button>-->
      <!--</div>-->
      <input placeholder="请输入密码" type="password" v-model="password" />
      <!--<input placeholder="请输入邀请码" type="text" v-model="code">-->
    </div>
    <div class="user-btn">
      <button @click="toRegister">立即注册</button>
    </div>
    <div class="user-btn" style="margin-top: 10px">
      <button @click="turnTo">返回登录</button>
    </div>
  </div>
</template>

<script>
import { register } from "@/apis/login";
import { Toast } from "vant";
export default {
  name: "register",
  data() {
    return {
      phone: "",
      password: "",
      code: ""
    };
  },
  methods: {
    turnTo() {
      this.$router.push({
        name: "login"
      });
    },
    toRegister() {
      if (!this.phone) {
        Toast("请输入手机号");
        return false;
      }
      if (
        !/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(
          this.phone
        )
      ) {
        Toast("手机号格式不正确");
        return false;
      }
      if (!this.password) {
        Toast("请输入密码");
        return false;
      }
      // if(!this.code){
      //     Toast('请输入邀请码');
      //     return false;
      // }
      let params = {
        phone: this.phone,
        password: this.password,
        user_type: 5
        // pid: this.code
      };
      register(params).then(result => {
        if (result.data.status == 1) {
          // console.log(result.data.data.api_token);
          // localStorage.setItem('token', result.data.data.api_token);
          // localStorage.setItem('userInfo', JSON.stringify(result.data.data));
          Toast(result.data.msg);
          this.$router.push({
            name: "login"
          });
        } else {
          Toast(result.data.msg);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.register {
  background-image: url("../assets/register.jpg");
  background-size: cover;
  height: 100vh;
  /*color: #fff;*/
  overflow: hidden;
  .user-code {
    position: relative;
    button {
      position: absolute;
      right: 20px;
      top: 27px;
      outline: none;
      border: none;
      width: 80px;
      border-radius: 5px;
      background-color: #eb2211;
      padding: 6px 0;
      font-size: 12px;
    }
  }
  .user-btn {
    text-align: center;
    button {
      border: none;
      outline: none;
      background-color: #fe9f5d;
      color: #fff;
      width: 160px;
      height: 36px;
      border-radius: 18px;
    }
  }
  .user-info {
    padding: 0 10%;
    text-align: center;
    margin: 20px 0 30px;
    input {
      border: none;
      outline: none;
      background-color: #fff;
      width: 80%;
      height: 40px;
      border-radius: 20px;
      padding: 0 10%;
      margin: 20px 0 10px;
      &::-webkit-input-placeholder {
        color: #999;
      }
    }
  }
  h1 {
    text-align: center;
    color: #fff;
    margin-top: 80px;
    text-shadow: 1px 4px 5px #fe9f5d;
    letter-spacing: 2px;
  }
  .select {
    display: flex;
    justify-content: space-around;
    align-items: center;
    > div {
      span {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 2px solid #fff;
        margin-right: 5px;
      }
      &:last-child {
        span {
          background-color: #fff;
        }
      }
    }
  }
}
</style>
