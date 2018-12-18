<template>
  <div class="dc-menu-main">
      <ul class="dc-menu-list">
        <li v-for="(item,index) in node" :index="index" :ref="item.value+item.label" :key="item.label" @click="handleClick(item,$event,index)">
          {{item.label}}
        </li>
      </ul>
      <!-- v-if一定要加上，不然会造成内存泄露 -->
      <dc-menu :node="nodeleaf" v-if="nodeleaf.length!==0" :level="newlevel" :unique="unique" :style="{left:offsetLeft+'px'}"></dc-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nodeleaf: [],
      offsetLeft: 0,
      newlevel:''
    };
  },
  name: "dcMenu",
  props: {
    msg: String,
    node: [Array, Object],
    level:{//层级
      type:String
    },
    unique:[String,Number],
  },
  created() {
 
  },
  methods: {
    handleClick(item,e,index) {
      this.newlevel= this.level+"-"+index
      this.nodeleaf = [];
      var dom = e.target; //当前元素li
      var domsibling = dom.parentNode.nextElementSibling; //下一层的组件
      if (item.children !== undefined && item.children !== []) {
        this.nodeleaf = JSON.parse(JSON.stringify(item.children));
        //获取渲染后的width值
        this.offsetLeft = dom.parentNode.getBoundingClientRect().width;
        //ul隐藏下下级ul
        if (domsibling !== null) {
          domsibling.style.display = "block";
          if (domsibling.children.length > 1) {
            domsibling.children[1].style.display = "none";
          }
        }
      } else {
        // console.log(this.unique)
       this.$root.eventBus.$emit('getvalue'+this.unique,this.newlevel);
        //无下级元素时,直接隐藏下一级dom
        if (dom.parentNode.nextElementSibling !== null) {
          domsibling.style.display = "none";
        }
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dc-menu-main {
  position: absolute;
  top: 0;
  left: 5px;
}
ul {
  margin: 0;
  background: #fff;
  list-style-type: none;
  padding: 0;
}
li {
  box-sizing: border-box;
  padding: 5px 10px;
  text-align: left;
  cursor: pointer;
  min-width: 150px;
  white-space: nowrap;
}
.dc-menu-list > li:last-child {
}
.dc-menu-list {
  border: 1px solid rgb(238, 232, 232);
}
a {
  color: #42b983;
}
</style>
