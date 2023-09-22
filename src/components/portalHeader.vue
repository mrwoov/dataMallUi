<script setup>

</script>

<template>
  <div class="portal_header">
    <div class="header">
      <el-row>
        <el-col :span="8">
          <div class="grid-content"><img class="logo" src="../assets/logo.png" alt="logo"></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            &nbsp;
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content" style="float: right;padding-right: 50px; padding-top: 5px">
            <span><a class="header-link" href="#">帮助</a></span>
            <span v-if="!login_state">&nbsp;|&nbsp;<a class="header-link"
                                                      href="http://localhost:8080/user/reg">立即加入</a></span>
            <span v-if="!login_state">&nbsp;|&nbsp;<a class="header-link"
                                                      href="http://localhost:8080/user/login">登录</a></span>
            <span class="header-text" v-if="login_state">&nbsp;|&nbsp;
              <el-dropdown>
                <span class="header-text">{{ username }}</span><i class="el-icon-arrow-down"
                                                                  style="margin-left: 5px"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-if="this.admin">
                    <a href="http://localhost:8080/admin" class="header-text">后台管理</a>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="text" @click="logout" class="header-text">个人中心</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="text" @click="logout" class="header-text">退出登录</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="header-nav">
      <el-row :gutter="20">
        <el-col :span="5">
          <div class="grid-content bg-purple">&nbsp;</div>
        </el-col>
        <el-col :span="14">
          <div class="bg-purple">
            <span class="nav-box"><a class="nav-link" href="http://localhost:8080/">首页</a></span>
            <span class="nav-box" v-for="(categories) in this.categories_list">
              <a class="nav-link" :href="class_link(categories.url)">{{ categories.name }}</a>
            </span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div>
              <el-row :gutter="20">
                <el-col :span="16">
                  <div class="search-from">
                    <span>
                      <el-form @submit.native.prevent>
                        <el-input
                            placeholder="搜索"
                            prefix-icon="el-icon-search"
                            v-model="keyword"
                            class="search-input"
                            @keyup.enter.native="search">
                      </el-input>
                      </el-form>

                    </span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <span>
                    <i class="el-icon-circle-plus-outline search-button"></i>
                    <i class="el-icon-goods search-button mr-5"></i>
                    </span>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import {api_user_checkToken} from "@/api/account";
import * as api_goodsCategories from "@/api/goods_categories"

export default {
  name: "portalHeader",
  data() {
    return {
      categories_list: [],
      login_state: false,
      keyword: "",
      username: "",
      admin: false,
    };
  },
  created() {
    this.load();
    this.check_token();
  },
  methods: {
    load() {
      api_goodsCategories.getList().then(res => {
        const data = res.data
        for (let i = 0; i < data.length; i++) {
          let name = data[i].name
          let url = data[i].url
          this.categories_list.push({
            name: name,
            url: url
          })
        }
      })
    },
    class_link(href) {
      return "http://localhost:8080/categories/" + href;
    },
    search() {
      this.$router.push({
        path:'/search',
        query:{
          keyword:this.keyword
        }
      })
    },
    logout() {
      this.$store.dispatch("user_logout")
      this.login_state = false
    },
    check_token() {
      if (this.$store.state.token != null) {
        api_user_checkToken().then(res => {
          if (res.status !== 200) {
            this.login_state = false;
            this.$store.dispatch("user_logout")
            return;
          }
          this.login_state = true;
          this.username = res.data.username
          this.admin = res.data.admin
        })
      }
    },
  }
}
</script>
<style scoped>
.header {
  height: 40px;
}

.logo {
  height: 30px;
  margin-left: 20px;
  margin-top: 5px;
}

.header-link {
  font-size: 8px;
  margin-left: 2px;
  margin-right: 2px;
  color: black;
  text-decoration: none;
}

.header-text {
  font-size: 8px;
  color: black;
  text-decoration: none;
}

.header-nav {
  height: 50px;
  background-color: white;
  line-height: 50px;
  text-align: center;
}

.nav-box {
  margin: 0 15px;
  display: inline-block;
}

.nav-link {
  color: black;
  text-decoration: none;
  font-size: 15px;
}

.search-button {
  font-size: 25px;
  margin: 0 5px;
}

.search-input {
  color: darkgray;
}
</style>