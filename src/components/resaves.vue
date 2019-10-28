<template>
  <div class="home">
    <div class="top-nav">接收记录</div>
    <div class="content">
      <van-list
        v-model="loading"
        :finished="finished"
        :loading-text="loadText"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="listItem" v-for="(item, index) in contentList" :key="index">
          <div class="time">
            <div style="margin-bottom: 2px;">名称： {{item.user_id_link?item.user_id_link.phone:''}}</div>
            <div style="margin-bottom: 2px;">时间： {{item.created_at}}</div>
            <div style="margin-bottom: 2px;">入店时间： {{item.start_time}}</div>
            <div>离店时间： {{item.end_time}}</div>
            <div>目的地： {{item.address}}</div>
            <div>金额： {{item.money}}</div>
          </div>
          <!--                    <div class="money1">确认</div>-->
          <div class="money1" v-if="item.status==1" @click="confirms(item.id)">确认</div>
          <div class="money1 money2" v-if="item.status==-1">已确认</div>
        </div>
      </van-list>
    </div>
    <div class="tabbar">
      <div class="active" @click="turnToHome">
        <van-icon name="wap-home"></van-icon>
        <div>首页</div>
      </div>
      <div class="active" @click="turnToMy">
        <van-icon name="contact"></van-icon>
        <div>我的</div>
      </div>
      <div class="center">
        <van-icon name="plus" @click="turnToHome"></van-icon>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
import { getRelease } from "@/apis/index";
export default {
  name: "IndexList",
  data() {
    return {
      list: [],
      page: 0,
      pageSize: 10,
      loading: false,
      finished: false,
      loadText: "加载中…",
      contentList: [],
      userInfo: {},
      token: ""
    };
  },
  created() {
    // this.getData()
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.token = localStorage.getItem("token");
  },
  methods: {
    confirms(id) {
      axios
        .put(
          "api/requirements/release/" +
            id +
            "?status=-1&api_token=" +
            this.token
        )
        .then(result => {
          if (result.data.status == 1) {
            Toast.success({
              message: result.data.msg,
              duration: 500
            });
            setTimeout(() => {
              this.$router.push({
                path: `/feeds/${id}`
              });
            }, 500);

            this.contentList.forEach(item => {
              if (item.id == id) {
                console.info("asdfasdfd", item.id);
                item.status = -1;
              }
            });
          }
        });
    },
    turnToHome() {
      this.$router.push({
        name: "resave"
      });
    },
    turnToMy() {
      this.$router.push({
        name: "my"
      });
    },
    onLoad() {
      setTimeout(() => {
        this.page++;
        axios
          .get(
            "api/requirements/release?pageSize=" +
              this.pageSize +
              "&page=" +
              this.page +
              "&api_token=" +
              this.token
          )
          .then(result => {
            if (result.data.status == 1) {
              let re = result.data.data;
              if (re.length !== 0) {
                this.contentList = this.contentList.concat(re);
              }
              // 加载状态结束
              this.loading = false;
              // 数据全部加载完成
              if (this.contentList.length >= result.data.mate.total) {
                this.finished = true;
                this.loadText = "加载完成";
              }
            } else {
              this.finished = true;
            }
          });
      }, 500);
    }
  }
};
</script>

<style lang="less" scoped>
page {
  background-color: #f4f4f4;
}

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

.home {
  /*height: 100vh;*/
  background-color: #f4f4f4;
  overflow: hidden;
  margin-bottom: 60px;

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
    padding: 10px;
    .content_pian {
      width: 90%;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0rem 0.08rem 0.4rem 0rem rgba(119, 136, 175, 0.2);
      border-radius: 0.08rem;
      margin: 0.2rem auto 0;
      padding: 0.16rem;
      .content-name {
        overflow: hidden;
        text-overflow: ellipsis; //超出部分以省略号显示
        white-space: nowrap;
        font-weight: bold;
        color: rgba(40, 44, 52, 1);
        font-size: 0.18rem;
        padding-bottom: 0.15rem;
      }
      .content-des {
        display: flex;
        justify-content: space-between;
        color: rgba(172, 178, 199, 1);
        font-size: 0.12rem;
        line-height: 0.16rem;
        .img {
          width: 0.14rem;
          vertical-align: middle;
        }
        .img1 {
          margin-left: 0.2rem;
          width: 0.14rem;
          vertical-align: middle;
        }
      }
    }
    .listItem {
      background-color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 10px;
      margin-bottom: 10px;
      border-radius: 6px;
      color: rgba(0, 0, 0, 0.8);

      .time {
        font-size: 14px;
        color: #7f7e78;
      }

      .money1 {
        width: 60px;
        height: 26px;
        line-height: 26px;
        background-color: #eb2211;
        color: #fff;
        font-size: 14px;
        border-radius: 12px;
        text-align: center;
      }

      .money2 {
        background-color: #7f7f7f;
      }

      .none {
        text-align: center;
        padding: 20px;
      }
    }
  }
}
</style>
