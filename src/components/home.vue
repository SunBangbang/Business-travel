<template>
  <div class="home">
    <div class="top-nav">首页</div>
    <div class="content">
      <van-cell-group>
        <van-field
          v-model="start_time"
          readonly
          required
          clearable
          label="入店时间"
          placeholder="请选择"
          @click="showStartTimePicker = true"
        />

        <van-field
          v-model="end_time"
          readonly
          label="离店时间"
          clearable
          placeholder="请选择"
          required
          @click="showEndTimePicker = true"
        />
        <van-field v-model="money" label="金额" type="number" clearable placeholder="请输入" required />
        <van-field
          v-model="address"
          type="textarea"
          label="目的地"
          clearable
          placeholder="请输入"
          required
        />
      </van-cell-group>
      <div class="btn-box">
        <van-button type="info" block @click="comfirm">立即提交</van-button>
      </div>

      <!--<div class="aa">-->
      <!--<div>采购地点</div>-->
      <!--<div>-->

      <!--</div>-->
      <!--</div>-->
    </div>
    <van-popup v-model="showStartTimePicker" position="bottom">
      <van-datetime-picker
        v-model="startTime"
        type="date"
        @cancel="showStartTimePicker = false"
        @confirm="comfirmStartTime"
      />
    </van-popup>
    <van-popup v-model="showEndTimePicker" position="bottom">
      <van-datetime-picker
        v-model="endTime"
        type="date"
        @cancel="showEndTimePicker = false"
        @confirm="comfirmEndTime"
      />
    </van-popup>
    <!-- <div class="tabbar">
      <div>
        <van-icon name="wap-home"></van-icon>
        <div>首页</div>
      </div>
      <div class="active" @click="turnTo">
        <van-icon name="contact"></van-icon>
        <div>我的</div>
      </div>
      <div class="center">
        <van-icon name="plus"></van-icon>
      </div>
    </div> -->
    <tab-bar index="" my="active" @turnMy="turnTo"></tab-bar>
  </div>
</template>

<script>
import { Cell, CellGroup, Icon, Button, Field, Popup, DatetimePicker, Toast } from "vant";
import { release } from "@/apis/index";
import tabBar from "./tabbar.vue";
export default {
  data() {
    return {
      start_time: "",
      startTime: "",
      showStartTimePicker: false,
      end_time: "",
      endTime: "",
      showEndTimePicker: false,
      address: "",
      money: "",
      token: localStorage.getItem("token")
      // currentDate: new Date()
    };
  },
  beforeCreate() {
    if (JSON.parse(localStorage.getItem("userInfo")).user_type == 5) {
      this.$router.replace({
        name: "resave"
      });
    }
  },
  // created() {
  //
  // },
  methods: {
    turnTo() {
      this.$router.push({
        name: "my"
      });
    },
    comfirmStartTime() {
      this.showStartTimePicker = false;
      console.log(this.startTime);
      this.start_time = this.turnDate(this.startTime);
    },
    comfirmEndTime() {
      this.showEndTimePicker = false;
      console.log(this.endTime);
      this.end_time = this.turnDate(this.endTime);
    },
    comfirm() {
      if (!this.start_time) {
        Toast("请输入时间");
        return false;
      }
      if (!this.end_time) {
        Toast("请输入时间");
        return false;
      }
      if (!this.money) {
        Toast("请输入金额");
        return false;
      }
      if (!this.address) {
        Toast("请输入目的地");
        return false;
      }
      let params = {
        start_time: this.start_time,
        end_time: this.end_time,
        money: this.money,
        address: this.address,
        api_token: this.token
      };
      release(params).then(res => {
        // console.log('res:', res);
        if (res.data.status == 1) {
          console.info("res", res);
          Toast.success({
            message: res.data.msg,
            duration: 500
          });
          setTimeout(() => {
            this.$router.push({
              path: `/feedback/${res.data.data.id}`
            });
          }, 500);
        }
      });
    }
  },
  components:{
    "van-cell": Cell, 
    "van-cell-group" : CellGroup, 
    "van-icon": Icon,
    "van-button": Button, 
    "van-field": Field, 
    "van-popup": Popup, 
    "van-datetime-picker": DatetimePicker,
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
.home {
  height: 100vh;
  background-color: #f4f4f4;
  overflow: hidden;

  .plate {
    /*width: 80%;*/
    margin: 200px auto 0;
    background-color: #fff;
    text-align: center;
    padding: 25px 15px;

    .aa {
      text-align: center;
      color: #eb2211;
      font-weight: bolder;
      font-size: 14px;
      /*.xz{*/
      /*border-width: 100px;*/
      /*border-color: #eb2211;*/
      /*border-style: solid;*/
      /*width: 0;*/
      /*height: 0;*/
      /*}*/
    }
  }

  .top-nav {
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 666;
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #fff;
    background-color: #eb2211;
  }

  .content {
    margin-top: 60px;
  }

  .btn-box {
    padding: 20px;
  }
}
</style>
