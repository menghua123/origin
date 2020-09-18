<template>
  <div class="contain">
    <div class="head">
      <span id="title">TODoList</span>
      <input placeholder="添加ToDo" @keyup.enter="addTask">
    </div>
    <div class="wrap">
      <div class="content">
        <div class="doing" style="padding-top:30px">
          <span>正在进行</span>
          <span class="count1">{{ count1 }}</span>
          <template v-for="item in todos">
            <toDo :key="item.id" :message="item" :togglecheck="toggleCheckFalse" @change="toggle" @click="DeleteTask" />
          </template>
        </div>

        <div class="done">
          <span class="Span" style="position:relative">已经完成<span class="count2">{{ count2 }}</span></span>        
          <template v-for="item in dones">
            <toDo :key="item.id" :message="item" :togglecheck="toggleCheckTrue" @change="toggle" @click="deleteTask" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import toDo from '@/components/TodoList'
export default {
  components: { toDo },
  data() {
    return {
      input: '',
      checked: false,
      count1: 0,
      count2: 0,
      todos: [],
      dones: [],
      toggleCheckTrue: true,
      toggleCheckFalse: false
    }
  },
  methods: {
    toggle(id, checked) {
      if (checked === true) {
        this.todos.forEach((item, index) => {
          if (item.id === id) {
            this.todos.splice(index, 1)
            this.dones.unshift(item) 
            this.count1--
            this.count2++        
          }
        })
      } else {
        this.dones.forEach((item, index) => {
          if (item.id === id) {
            this.dones.splice(index, 1)
            this.todos.unshift(item)
            this.count1++
            this.count2--              
          }
        })
      }
    },
    DeleteTask(id) {
      this.todos.forEach((item, index) => {
        if (item.id === id) {
          this.todos.splice(index, 1)
          this.count1--
        }
      })
    },
    deleteTask(id) {
      this.dones.forEach((item, index) => {
        if (item.id === id) {
          this.dones.splice(index, 1)
          this.count2--
        }
      })      
    },
    addTask(event) {
      var value = event.target.value.trim()
      if (value.length > 0) {
        if(!isNaN(value)){
          this.$message({
          message: '不能输入数字!'
        })
        }else{
          var valid = this.todos.some(item => {
            return item.val === value
          })
          if(valid){
            this.$message({
            message:'您输入的任务已存在，请重新输入'
            })
          }else{
            var itemId = this.GenerateID()
            this.todos.unshift({ val: value, id: itemId })
            this.count1++
            event.target.value = ''
          }
        }        
      } else {
        this.$message({
          message: '请输入文字!'
        })
      }
    },
    GenerateID() {
      return Number(Math.random().toString().substr(3) + Date.now()).toString(36)
    } 
  }
}
</script>
<style  scoped>
.head{
  height:50px;
  background-color: black;
}
#title{
  margin-left:260px;
  font: 30px;
  color:white;
}
.wrap{
  background-color: rgba(128, 128, 128, 0.5);
  height:683px;
}
.content{
  width:700px;
  margin:auto;
}

input{
  width:500px;
  height:30px;
  margin-left:70px;
}
span{
  font: 30px bold ;
  color:black;
  padding-top:30px;
  padding-bottom:30px;
}
span.count1{
  font-size:13px;
  color:#666;
  position:absolute;
  left:840px;
  top:95px;
  width:17px;
  height:17px;
  border-radius:50%;
  background:#E6E6FA;
  padding:0 5px;
  text-align: center;
}
.done span.count2{
  display:inline-block; 
  font-size:13px;
  color:#666;
  position:absolute;
  top:46px;
  left:576px;
  width:17px;
  height:17px;
  border-radius:50%;
  background:#E6E6FA;
  padding:0 5px;
  text-align: center;
}

</style>
