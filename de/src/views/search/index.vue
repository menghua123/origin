<template>
  <div v-loading.body="loading" element-loading-text="拼命加载中" style="width:950px;padding-top:100px;margin:auto">
    <div class="box" style="margin-bottom:10px">
      <el-input v-model="input" placeholder="查询" style="width:180px" />
      <span class="el-icon-view" @click="check" />
      <el-button type="primary" style="position:absolute;width:100px;margin-left:670px;margin-bottom:10px" @click="massiveDelete">批量删除</el-button>
    </div>
    <div class="table-wrap">
      <el-table
        ref="table"
        v-loading="loading"
        :stripe="true"
        border
        :data="datas"
        :default-sort="{prop:'age'}"
        class="table"
        @selection-change="caculate"
      >
        <el-table-column type="selection" />
        <el-table-column label="序号" type="index" width="55" />
        <el-table-column prop="name" label="名字" style="text-align:center">
          <template v-slot="scope">
            <input
              key="scope.row.name"
              :class="scope.row.seen?'edit':'noEdit'"
              :value="scope.row.name"
              :disabled="!scope.row.seen"
              type="text"
              style="width:120px"
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          :filters="[{text:'大于20岁',value:'20'},{text:'大于25岁',value:'25'}]"
          :filter-method="filterAge"
        >
          <template v-slot="scope">
            <input
              key="scope.row.name"
              :class="scope.row.seen?'edit':'noEdit'"
              :value="scope.row.age"
              :disabled="!scope.row.seen"
              type="text"
              style="width:120px"
            >
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址" width="300px">
          <template v-slot="scope">
            <input
              key="scope.row.address"
              :class="scope.row.seen?'edit':'noEdit'"
              :value="scope.row.address"
              :disabled="!scope.row.seen"
              type="text"
              style="width:280px"
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="210">
          <template v-slot="scope">
            <div id="buttonWrap">
              <el-button :plain="true" type="success" size="small" @click="handleAdd(scope.$index,datas)">增加</el-button>
              <el-button :plain="true" type="warning" size="small" @click="handleDelete(scope.$index,scope.row.name)">删除</el-button>
              <el-button v-if="!scope.row.seen" id="delete" type="danger" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button v-if="scope.row.seen" type="danger" size="mini" @click="saveEdit(scope.row)">保存</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getData } from '@/api/article'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      datas: null,
      input: '',
      show: true,
      selection: [],
      loading: false,
      edit: '',
      selections: []

    }
  },
  computed: {
    ...mapState({
      getDatas: (state) => state.table.tableData
    }),
    setSeen() {
      var setSeen
      return setSeen = this.getDatas.map((item) => {
        return Object.assign({}, item, { seen: false })
      })
    }
  },
  created() {
    this.loading = true
    getData().then((res) => {
      var { data } = res
      this.$store.dispatch('table/setData', data)
      this.datas = this.setSeen
      this.loading = false
    }).catch((err) => { console.log(err) })
  },
  methods: {
    caculate(rows) {
      this.selections = rows
    },
    massiveDelete() {
      this.$confirm('是否确定批量删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var length = this.datas.length
        var names = []
        this.selections.forEach((item) => {
          names.push(item.name)
        })
        names.forEach((item) => {
          for (var i = 0; i < length; i++) {
            if (item === this.datas[i].name) {
              this.datas.splice(i, 1)
              return
            }
          }
        })
        this.$message({
          type: 'success',
          message: '批量删除成功!'
        })
      }).catch(() => {
        if (this.selections) {
          this.selections.forEach((row) => {
            this.$refs.table.toggleRowSelection(row)
          })
        }
        this.$message({
          type: 'info',
          message: '已取消批量删除'
        })
      })
    },
    check() {
      console.log(this.datas)
      var target = this.input.trim()
      var filter = []
      for (var i = 0; i < this.datas.length; i++) {
        var string = `${this.datas[i].name} ${this.datas[i].age} ${this.datas[i].address}`
        if (target.length > 0) {
          if (string.indexOf(target) !== -1) {
            filter.push(this.datas.slice(i, i + 1))
            console.log(this.datas.slice(i, i + 1))
            break
          }
        }
      }
      if (filter.length > 0) {
        this.datas = filter
        console.log(filter)
        // this.$store.dispatch('table/setData',this.datas)
        console.log(this.datas)
      } else {
        this.datas = []
      }
    },
    saveEdit(row) {
      var target = document.querySelectorAll('.edit')
      this.$confirm('是否确定修改？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        row.name = target[0].value.trim()
        row.age = target[1].value.trim()
        row.address = target[2].value.trim()
        row.seen = false
        this.$store.dispatch('table/setData', this.datas)
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }).catch(() => {
        row.seen = false
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    },
    handleEdit(row) {
      row.seen = true
      this.$nextTick(() => {
        var target = document.querySelectorAll('.edit')
        target[0].focus()
      })
    },
    handleDelete(index, name) {
      this.$confirm(`此操作将永久删除该文件, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var length = this.datas.length
        var index
        for (var i = 0; i < length; i++) {
          if (this.datas[i].name === name) {
            index = i
          }
        }
        this.datas.splice(index, 1)
        this.$store.dispatch('table/setData', this.datas)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleAdd(index, rows) {
      rows.splice(index + 1, 0, { name: '', age: '', scores: '' })
    },
    filterAge(value, row) {
      return row.age > value
    }
  }
}
</script>
<style scoped>
/deep/.table .cell input{
  text-align: center;
}

.noEdit{
  border:0;
  background-color:transparent
}

.el-icon-view{
  position:absolute;
  left:290px;
  top:110px;
  display:inline-block
}

</style>
