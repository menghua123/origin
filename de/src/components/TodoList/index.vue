<template>
  <div class="contain">
    <el-checkbox v-model="checked" class="check" @change="$emit('change',task,checked)" />
    <input :value="task" :disabled="true" class="input">
    <span class="el-icon-circle-close" @click="$emit('click',task)" />
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: [String, Number],
      default: ''
    },
    togglecheck: Boolean
  },
  data() {
    return {
      task: this.message,
      checked: this.togglecheck
    }
  }
}
</script>
<style scoped>
.contain{
  position:relative;
  width:600px;
  height:40px;
  background-color:white;
  border:solid 5px rgba(128, 128, 128, 0.5);
}
.input{
  position:absolute;
  top:8px;
  left:40px;
  height:20px;
  width:500px;
  box-shadow:-2px rgb(9, 107, 74);
  background: white;
  border:solid 1px white

  }
  .check{
    margin-left:8px;
    margin-top:8px;

  }
  .el-icon-circle-close{
    position:absolute;
    top:8px;
    left:570px;

  }

</style>
