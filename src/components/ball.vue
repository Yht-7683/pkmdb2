<!--道具-->
<template>
  <div>
    <el-table
      :data="userdate"
      style="width: 85%">
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
      <el-table-column label="操作">
        <template slot-scope="scope">
      <el-button
        size="mini"
        @click="handleEdit(scope.$index, scope.row)" type="primary" round>编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next" :page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
        :total="total"
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1" :current-page="currentPage1">
      </el-pagination>
    </div>
    <!---->
    <el-dialog title="修改道具信息" :visible.sync="dialogTableVisible" width="30%">
      <el-form :model="user">
        <el-form-item label="道具号" :label-width="formLabelWidth">
          <el-input v-model="user.id" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="外观" :label-width="formLabelWidth">
          <el-image
            style="width: 65px; height: 65px"
            :src="user.img"></el-image>
        </el-form-item>
        <el-form-item label="道具名" :label-width="formLabelWidth">
        <el-input v-model="user.name" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
        <el-form-item label="强度" :label-width="formLabelWidth">
          <el-input v-model="user.probability" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="user.money" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="upUser">确 定</el-button>
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
        id: '',
        name: '',
        img: '',
        probability: '',
        money: ''
      },
      search: '',
      total: null,
      currentPage1: 1,
      dialogTableVisible: false,
      pageSize: 6,
      formLabelWidth: '80px',
      userdate: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.list = []
      postRequest('/api/public/getAllBall', {}).then((result) => {
        if (result.data.code === 200) {
          this.list = result.data.data
          this.craetep()
        } else if (result.data.code === -1) {
          alert(result.data.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    craetep () {
      this.userdate = []
      let from = (this.currentPage1 - 1) * this.pageSize
      let to = this.currentPage1 * this.pageSize
      for (; from < to; from++) {
        if (this.list[from]) {
          this.userdate.push(this.list[from])
        }
      }
      this.total = this.list.length
    },
    handleEdit (index, row) {
      this.dialogTableVisible = true
      this.user.id = row.id
      this.user.name = row.name
      this.user.img = row.img
      this.user.probability = row.probability
      this.user.money = row.money
      console.log(index, row)
    },
    // find () {
    //   console.log(this.search)
    // },
    upUser () {
      let ball = {
        id: this.user.id,
        name: this.user.name,
        img: this.user.img,
        probability: this.user.probability,
        money: this.user.money
      }
      this.dialogTableVisible = false
      postRequest('/api/public/upBall/', ball).then((result) => {
        if (result.data.code === 200) {
          this.$message({
            message: '修改了！',
            type: 'success'
          })
          this.list = result.data.data
          // console.log(this.list)
        } else if (result.data.code === -1) {
          alert(result.data.msg)
        }
      }).catch(e => {
        console.log(e)
      })
      this.fetchData()
    },
    handleDelete (index, row) {
      this.$message.error('权限不够，无法删除')
      console.log(index, row)
    },
    handleSizeChange1: function (pageSize) {
      this.pageSize = pageSize
      this.handleCurrentChange1(this.currentPage1)
    },
    handleCurrentChange1: function (currentPage) {
      this.currentPage1 = currentPage
      this.currentChangePage(this.tableData, currentPage)
    }, // 分页方法（重点）
    currentChangePage (list, currentPage) {
      let from = (currentPage - 1) * this.pageSize
      let to = currentPage * this.pageSize
      this.userdate = []
      for (; from < to; from++) {
        if (list[from]) {
          this.userdate.push(list[from])
        }
      }
    }

  }
}
</script>

<style scoped>
  .el-table{
    height: 83vh;
    position: absolute;
    top: 100px;
    width: 79vw;
    margin-left: 240px;
    box-shadow: 0px 0px 10px #babfbf;
  }
  .pagination{
    position: absolute;
    bottom: 10vh;
    right: 40vw;
  }
</style>
