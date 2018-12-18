<template>
  <div class="dc-cascader-main" :key="key">
    <div>
          <slot name="pre"></slot>
        <div  class="dc-cascader-form">
           <span class="dc-cascader-input" @click="showValue">{{Getvalue}} </span>
        </div>
        <slot name="suf"></slot>
        <div class="dc-cascader-option" v-show="open">
          <!-- 递归组件 -->
            <dc-menu :node="options" level="*" :unique="key"></dc-menu>
        </div>
    </div>
  </div>
</template>

<script>
/**

 */
import Menu from "./menu.vue";
export default {
  name: "dcmain",
  data() {
    // var data=Number(new Data())
    return {
      key:parseInt(Math.random()*100000),
      open: false,
      Getvalue: "" //选中的值
    };
  },
  components: { "dc-menu": Menu },
  props: {
    msg: String,
    options: Array
  },
  mounted() {
    this.$root.eventBus.$on("getvalue"+this.key, content => {
      this.PushValue(content);
      this.open = false;
    });
  },
  methods: {
    showValue() {
      this.open = true;
    },
    PushValue(value) {
      var arr = value.split("-");
      arr.splice(arr.indexOf("*"), 1)
      this.Getvalue = "";//文本值
      var arrOption = JSON.parse(JSON.stringify(this.options));//坐标值
      var valueArr=[]
      arr.forEach((element, i) => {
        if (arrOption[element].label == undefined) return;
         valueArr.push(arrOption[element].value)
        if (i == arr.length - 1) {
          this.Getvalue += arrOption[element].label;
         
        } else {
          this.Getvalue += arrOption[element].label + "/";
        }
        arrOption = arrOption[element].children;
      });

      this.$emit('input', this.Getvalue)
      this.$emit('change',{"index":arr,"value":valueArr})
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dc-cascader-form {
  width: 200px;
}
.dc-cascader-input {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  width: 100%;
  line-height: 35px;
  cursor: pointer;
  border: 1px solid #cdcdcd;
  height: 35px;
  padding: 0px 10px;
  font-size: 16px;
  margin: 0 5px;
  border-radius: 5px;
}
.dc-cascader-option {
  position: relative;
}
</style>
