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
          <template v-for="item in todos">
            <toDo :key="item+Date()" :message="item" :togglecheck="toggleCheckFalse" @change="toggle" @click="DeleteTask" />
          </template>
        </div>

        <div class="done">
          <span>已经完成</span>
          <template v-for="item in dones">
            <toDo :key="item+Date()" :message="item" :togglecheck="toggleCheckTrue" @change="toggle" @click="deleteTask" />
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
      todos: [],
      dones: [],
      toggleCheckTrue: true,
      toggleCheckFalse: false
    }
  },
  methods: {
    toggle(value, checked) {
      if (checked === true) {
        this.todos.forEach((item, index) => {
          if (item === value) {
            this.todos.splice(index, 1)
            this.dones.unshift(item)
          }
        })
      } else {
        this.dones.forEach((item, index) => {
          if (item === value) {
            this.dones.splice(index, 1)
            this.todos.unshift(item)
          }
        })
      }
    },
    DeleteTask(val) {
      this.todos.forEach((item, index) => {
        if (item === val) {
          this.todos.splice(index, 1)
        }
      })
    },
    deleteTask(val) {
      this.dones.forEach((item, index) => {
        if (item === val) {
          this.dones.splice(index, 1)
        }
      })      
    },
    addTask(event) {
      var value = event.target.value
      if (value.length > 0) {
        this.todos.unshift(value)
        event.target.value = ''
      } else {
        this.$message({
          message: '请输入文字!'
        })
      }
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

</style>
