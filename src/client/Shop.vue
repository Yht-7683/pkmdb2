<template>
  <div>
  <el-table
    :data="list"
    style="width: 85%"  v-loading="loading">
    <el-table-column
      label="道具号"
      prop="id">
    </el-table-column>
    <el-table-column
      label="外观"
      prop="img">
      <template slot-scope="scope">
        <el-image
          style="width: 65px; height: 65px"
          :src="scope.row.img"></el-image>
      </template>
    </el-table-column>
    <el-table-column
      label="道具名"
      prop="name">
    </el-table-column>
    <el-table-column
      label="强度"
      prop="probability">
    </el-table-column>
    <el-table-column
      label="价格"
      prop="money">
    </el-table-column>
    <el-table-column
      label="拥有数量"
      prop="num">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)" type="success"  plain round>购买</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!---->
  <el-dialog title="购买精灵球" :visible.sync="dialogTableVisible" width="30%">
    <el-form :model="user">
      <el-form-item :label-width="formLabelWidth">
        <el-image
          style="width: 65px; height: 65px"
          :src="user.img"></el-image>
      </el-form-item>
      <el-form-item label="名字" :label-width="formLabelWidth">
        <el-input v-model="user.name" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="拥有数量" :label-width="formLabelWidth">
        <el-input v-model="user.num" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="价格" :label-width="formLabelWidth">
        <el-input v-model="user.money" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="购买数量" :label-width="formLabelWidth">
        <el-input-number v-model="user.buynum" :min="1" :max="99"></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="upUser">确 定</el-button>
      <el-button @click="undo()">取 消</el-button>
    </div>
  </el-dialog></div>
</template>

<script>
import {postRequest} from '../main'
export default {
  data () {
    return {
      user: {
        id: '',
        name: '',
        img: '',
        probability: '',
        num: '',
        money: '',
        buynum: '1'
      },
      list: [],
      dialogTableVisible: false,
      formLabelWidth: '80px',
      loading: true
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.list = []
      postRequest('/api/public/showUserBall', {
        userid: JSON.parse(window.localStorage.getItem('user')).id
      }).then((result) => {
        if (result.data.code === 200) {
          // console.log(result)
          this.list = result.data.data
          this.loading = false
          // console.log(this.list)
        } else if (result.data.code === -1) {
          alert(result.data.msg)
        }
      }).catch(e => {
      })
    },
    handleEdit (index, row) {
      this.dialogTableVisible = true
      this.user.id = row.id
      this.user.name = row.name
      this.user.img = row.img
      this.user.num = row.num
      this.user.money = row.money
    },
    upUser () {
      this.loading = true
      postRequest('/api/public/upBallPack', {
        userid: JSON.parse(window.localStorage.getItem('user')).id,
        ballid: this.user.id,
        num: this.user.buynum
      }).then((result) => {
        // console.log(result)
        if (result.data.code === 200) {
          this.$message({
            message: `${result.data.msg}`,
            type: 'success'
          })
        } else if (result.data.code === -1) {
          this.$message({
            message: `${result.data.msg}`,
            type: 'error'
          })
        }
      }).catch(e => {
        console.log(e)
      })
      this.loading = false
      this.dialogTableVisible = false
      this.user.buynum = 1
      this.fetchData()
    },
    undo () {
      this.dialogTableVisible = false
      // this.user.buynum = 1
    }
  }
}
</script>

<style scoped>
  .el-table{
    width: 79vw;
    position: absolute;
    top: 23%;
    left: 8%;
    box-shadow: 0px 0px 10px #babfbf;
  }
</style>
