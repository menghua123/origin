<template>
  <div  v-loading.body="loading" element-loading-text="拼命加载中" style="width:950px;margin:50px auto;position:relative">
    <div class="input">
      <el-input placeholder="查询" suffix-icon="search" type="text" size="mini" style="width:200px;margin-bottom:10px">
        <i class="el-icon-search"></i>
      </el-input>
      <el-button type="primary" style="position:absolute;width:100px;margin-bottom:10px;right:0px">批量删除</el-button>
    </div>
    <div class="table-wrap">
      <el-table v-loading="loading" :stripe='true' border :data="datas" :default-sort="{prop:'age'}" class="table" @selection-change="caculate">
        <el-table-column type="selection" />
        <el-table-column label="序号" type="index" width="55" />
        <el-table-column prop="name" label="名字" style="text-align:center">
          <template v-slot="scope"> 
            <input :class="scope.row.seen?'edit':'noEdit'"  v-bind:value="scope.row.name" :disabled="!scope.row.seen"  
              type="text" style="width:120px" key="scope.row.name">
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" sortable :sort-orders="['ascending', 'descending']" 
        :filters="[{text:'大于20岁',value:'20'},{text:'大于25岁',value:'25'}]" :filter-method="filterAge">
          <template v-slot="scope"> 
            <input :class="scope.row.seen?'edit':'noEdit'" v-bind:value="scope.row.age" :disabled="!scope.row.seen"  
            type="text" style="width:120px" key="scope.row.name">
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址" width="300px">
          <template v-slot="scope"> 
            <input :class="scope.row.seen?'edit':'noEdit'"  v-bind:value="scope.row.address" :disabled="!scope.row.seen"  
            type="text"  style="width:280px" key="scope.row.address">
          </template>
        </el-table-column>
        <el-table-column label='操作' width="210">
          <template v-slot="scope" >
            <div id="buttonWrap">
            <el-button  :plain="true" type="success" size="small" @click="handleAdd(scope.$index,datas)">增加</el-button>  
            <el-button  :plain="true" type="warning" size="small" @click="handleDelete(scope.$index,datas)">删除</el-button> 
            <el-button  v-if="!scope.row.seen" id="delete" type="danger" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button  v-if="scope.row.seen" type="danger" size="mini" @click="saveEdit(scope.row)">保存</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getData } from '@/api/article'
import { mapState } from  'vuex'
export default {
  data() {
    return {
      datas: null,
      input2: 'this.ts',
      show: true,
      selection: [],
      loading:false,
      edit:''
      }
  },
  created() { 
      var setSeen=[]
      this.loading = true
      getData().then((res) => { 
      var {data} = res
      this.$store.dispatch('table/setData',data);
      this.datas=this.setSeen
      this.loading = false
    }).catch((err) => {console.log(err)})
    
  },
  computed:{
    ...mapState({
      getDatas:(state) => state.table.tableData       
    }),   
    setSeen(){
      var setSeen
      return setSeen=this.getDatas.map((item)=>{ 
        return Object.assign({},item,{seen:false})
        })
    }
  },
  methods: {
    caculate(rows){
      console.log(rows)
      var index=[]
      var length=rows.length
      var lengthy=this.datas.length
      for(var i=0;i<=length;i++){
        console.log(i)
        for(var j=0;j<=lengthy;j++){
          if(rows[i].name===this.datas[j].name){
            console.log(j)
           index.push(j)
           console.log(index)
           
        }
      
       
      } 
      }
     
    },
    saveEdit(row){
      var target=document.querySelectorAll(".edit")                            
      this.$confirm('是否确定修改？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'  
        }).then(() => {
          row.name=target[0].value.trim()
          row.age=target[1].value.trim()
          row.address=target[2].value.trim()
          row.seen=false
          console.log(this.datas)
          this.$store.dispatch('table/setData',this.datas)
          this.$message({
          type: 'success',
          message: '修改成功!'
          });
        }).catch(() => {
          row.seen=false
          this.$message({
          type: 'info',
          message: '已取消修改'
          });         
        });
      },
    handleEdit(row){
      row.seen=true
      this.$nextTick(() => {
        var target=document.querySelectorAll(".edit")
        target[0].focus()     
      }) 
    },
    handleDelete(index,rows){
      this.$confirm(`此操作将永久删除${index}该文件, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rows.splice(index,1)
          this.$store.dispatch('table/setData',this.datas)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });  
    },
    handleAdd(index,rows){
      rows.splice(index+1,0,{name:'',age:'',scores:''})
    },
    filterAge(value,row){
      return row.age>value
    }
  },
}
</script>
<style scoped>

.table{
    margin-left: 60px,

}
.operation{
  position:absolute;
  top:0;
  right:0;
}

/deep/.table .cell{
  text-align: center;
}

.noEdit{
  border:0;
  background-color:transparent
}

.edit{
  
}

</style>