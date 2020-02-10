<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="user-info">
            <img :src="user.photo" class="user-avator" alt="">
            <div class="user-info-cont">
              <div class="user-info-name">{{user.name}}</div>
              <div>{{user.role}}</div>
              </div><el-button slot="append" icon="el-icon-setting"  type="primary" plain @click="dialogTableVisible=true">修改信息</el-button>
          </div>

          <div class="user-info-list">拥有金币：<span>{{user.money}}</span></div>
          <div class="user-info-list">上次登录地点：<span>丽水</span></div>
        </el-card>
        <el-card shadow="hover" style="height:252px;" class="mgb21">
          <div slot="header" class="clearfix">
            <span>语言详情</span>
          </div>
          Vue
          <el-progress :percentage="71.3" color="#42b983"></el-progress>
          JavaScript
          <el-progress :percentage="24.1" color="#f1e05a"></el-progress>
          CSS
          <el-progress :percentage="3.7"></el-progress>
          HTML
          <el-progress :percentage="0.9" color="#f56c6c"></el-progress>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20" class="mgb22">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1">
                <i class="el-icon-lx-people grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">1234</div>
                  <div>用户访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-2">
                <i class="el-icon-lx-notice grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">321</div>
                  <div>系统消息</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-3">
                <i class="el-icon-lx-goods grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">5000</div>
                  <div>数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <img src="../../static/图鉴/3.png" style="z-index:-2; position: absolute; top:10vh; left: 20vw;width: 70%;"/>
    <el-dialog title="修改用户信息" :visible.sync="dialogTableVisible" width="30%">
      <el-form :model="user">
        <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="user.id" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="user.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="金币" :label-width="formLabelWidth">
          <el-input v-model="user.money" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <div>
            <el-radio  v-model="user.sex" label="男" border>男</el-radio>
            <el-radio  v-model="user.sex" label="女" border>女</el-radio>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="up">确 定</el-button>
        <el-button @click="dialogTableVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {postRequest} from '../main'
export default {
  data () {
    return {
      user: {
        id: JSON.parse(window.localStorage.getItem('user')).id,
        name: '',
        password: '',
        phone: '',
        money: '',
        state: '',
        role: '',
        sex: '',
        photo: ''
      },
      dialogTableVisible: false,
      formLabelWidth: '80px'
    }
  },
  created () {
    this.getuser()
  },
  methods: {
    getuser () {
      postRequest('/api/public/getUserById', {
        id: JSON.parse(window.localStorage.getItem('user')).id
      }).then((result) => {
        if (result.data.code === 200) {
          this.user = result.data.data
        } else if (result.data.code === -1) {
          alert(result.data.msg)
        }
      }).catch(e => {
      })
    },
    up () {
      let upuser = {
        id: this.user.id,
        name: this.user.name,
        password: this.user.password,
        photo: this.user.photo,
        money: this.user.money,
        phone: this.user.phone,
        sex: this.user.sex,
        state: this.user.state,
        role: this.user.role
      }
      postRequest('/api/public/upUser/', upuser).then((result) => {
        // console.log(result)
        if (result.data.code === 200) {
          this.$message(`${result.data.msg}`)
        } else {
          alert(`${result.data.msg}`)
        }
      }).catch(e => {
        console.log(e)
      })
      this.dialogTableVisible = false
      this.getuser()
    }
  }
}
</script>

<style scoped>
  .grid-content {
    display: flex;
    align-items: center;
    height: 100px;
  }

  .grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
  }

  .grid-num {
    font-size: 30px;
    font-weight: bold;
  }

  .grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
  }

  .grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
  }

  .grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
  }

  .grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
  }

  .grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
  }

  .user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
  }

  .user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  .user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
  }

  .user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
  }

  .user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
  }

  .user-info-list span {
    margin-left: 70px;
  }

  .mgb20 {
    height: 50vh;
    position: absolute;
    left: 0;
    top: 140px;
    width: 35vw;
    margin-left: 240px;
    box-shadow: 0px 0px 10px #babfbf;
  }
  .mgb21{
    height: 50vh;
    position: absolute;
    right: 5vw;
    top: 140px;
    width: 35vw;
    margin-right: 40px;
    box-shadow: 0px 0px 10px #babfbf;
  }
  .mgb22{
    /*height: 80vh;*/
    position: absolute;
    right: 10vw;
    top:220px;
    width: 65vw;
    margin-right:20vw;
    margin-top: 30vh;
    box-shadow: 0px 0px 10px #babfbf;
  }
</style>
