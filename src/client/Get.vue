<template>
<div class="card" style="margin-top: 60px;">
        <el-image
          style="width: 520px; height: 520px"
          :src="user.img"></el-image>
    <br/>
  <el-button slot="append" icon="el-icon-search"  type="primary" plain @click="find()">查找精灵</el-button>
  <div v-if="dialogTableVisible2">
    <el-image
      style="width: 85px; height: 85px; margin-left: 30px"
      src="../../static/图鉴/精灵球.png" @click="getpk(1)"></el-image>
  <el-badge class="mark" :value="num1" />
    <el-image
      style="width: 85px; height: 85px; margin-left: 30px"
      src="../../static/图鉴/超级球.png" @click="getpk(2)"></el-image>
  <el-badge class="mark" :value="num2" />
    <el-image
      style="width: 85px; height: 85px; margin-left: 30px"
      src="../../static/图鉴/高级球.png" @click="getpk(3)"></el-image>
  <el-badge class="mark" :value="num3" />
    <el-image
      style="width: 85px; height: 85px; margin-left: 30px"
      src="../../static/图鉴/究极球.png" @click="getpk(4)"></el-image>
  <el-badge class="mark" :value="num4" />
    <el-image
    style="width: 85px; height: 85px; margin-left: 30px"
    src="../../static/图鉴/大师球.png" @click="getpk(5)"></el-image>
  <el-badge class="mark" :value="num5" />
  </div>
  <img src="../../static/图鉴/bg2.png" style="z-index:-2; position: absolute; top:20vh; left: 20vw;height: 70vh ;width: 60vw; border:6px #909399 solid; "/>
  <img src="../../static/图鉴/2.png" style="position: absolute; top:15vh; right: 0px;"/>
  <img src="../../static/图鉴/4.png" style="position: absolute; top:65vh; right: 0px;"/>
  <img src="../../static/图鉴/5.png" style="position: absolute; top:65vh; left: 0px;"/>
  <img src="../../static/图鉴/6.png" style="position: absolute; top:17vh; left: 0px;"/>
  <img src="../../static/图鉴/7.png" style="position: absolute; top:40vh; right: 20px;"/>
  <img src="../../static/图鉴/8.png" style="position: absolute; top:40vh; left: 20px;"/>
  <el-dialog title="详细信息" :visible.sync="dialogTableVisible" width="30%" @close="user.img = '../../static/图鉴/背景2.png'">
    <el-form :model="user">
      <el-form-item label="ID" :label-width="formLabelWidth">
        <el-input v-model="user.id" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="外观" :label-width="formLabelWidth">
        <el-image
          style="width: 65px; height: 65px"
          :src="user.img"></el-image>
      </el-form-item>
      <el-form-item label="名字" :label-width="formLabelWidth">
        <el-input v-model="user.name" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="等级" :label-width="formLabelWidth">
        <el-input v-model="user.lv" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="属性" :label-width="formLabelWidth">
        <el-input v-model="user.type" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="特性" :label-width="formLabelWidth">
        <el-input v-model="user.ability" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="其他介绍" :label-width="formLabelWidth">
        <el-input v-model="user.others" type="textarea" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogTableVisible = false ,user.img = '../../static/图鉴/背景2.png'">看完了！</el-button>
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
        id: '',
        name: '',
        img: '../../static/图鉴/背景2.png',
        type: '',
        ability: '',
        lv: '',
        meetTime: '',
        others: ''
      },
      formLabelWidth: '80px',
      dialogTableVisible: false,
      dialogTableVisible2: false,
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0,
      num5: 0
    }
  },
  created () {
    this.getallball()
  },
  methods: {
    find () {
      postRequest('/api/public/findPokemon', {}).then((result) => {
        if (result.data.code === 200) {
          this.user = result.data.data
          alert(result.data.msg)
          this.craetep()
        } else if (result.data.code === -1) {
          alert(result.data.msg)
        }
      }).catch(e => {
      })
      this.dialogTableVisible2 = true
    },
    getpk (ballid) {
      postRequest('api/public/catchPokemon', {
        userid: JSON.parse(window.localStorage.getItem('user')).id,
        ballid: ballid,
        pokemonid: this.user.id
      }).then((result) => {
        if (result.data.code === 200) {
          // console.log(result)
          alert(result.data.msg)
          this.user = result.data.data
          this.dialogTableVisible = true
          this.getallball()
        } else if (result.data.code === -1) {
          this.getallball()
          alert(result.data.msg)
        }
      }).catch(e => {
        console.log(e)
      })
      this.dialogTableVisible2 = false
    },
    getallball () {
      postRequest('api/public/getBallBag', {
        searchParam: JSON.parse(window.localStorage.getItem('user')).id
      }).then((result) => {
        if (result.data.code === 200) {
          console.log(result.data.data)
          this.num1 = result.data.data.num1
          this.num2 = result.data.data.num2
          this.num3 = result.data.data.num3
          this.num4 = result.data.data.num4
          this.num5 = result.data.data.num5
        } else if (result.data.code === -1) {
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style scoped>
.card{
  margin: auto;
  width: 60vw;
}
</style>
