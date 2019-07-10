<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd v-for="(item, idx) in $store.state.home.menu" :key="idx" @mouseenter="mouseenter">
        <i :class="item.type"/>
        {{item.name}}
        <span class="row"></span>
      </dd>
    </dl>
    <div class="detail" v-if="kind" @mouseover="sover" @mouseleave="sout">
      <template v-for="(item, idx) in curdetail.child">
        <h4 :key="idx">{{item.title}}</h4>
        <span v-for="v in item.child" :key="v">{{v}}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: "",
      menu: [
        {
          name: "美食",
          type: "food",
          child: [
            {
              title: "美食",
              child: ["代金券", "甜点饮品", "火锅", "自助餐", "小吃快餐"]
            }
          ]
        },
        {
          name: "外卖",
          type: "takeout",
          child: [
            {
              title: "外卖",
              child: ["外卖"]
            }
          ]
        },
        {
          name: "酒店",
          type: "hotel",
          child: [
            {
              title: "酒店",
              child: ["经济型", "舒适/三星", "高档/四星", "豪华/五星"]
            }
          ]
        }
      ]
    };
  },
  computed: {
    curdetail: function() {
      return this.$store.state.home.menu.filter(item => item.type === this.kind)[0];
    }
  },
  methods: {
    mouseenter: function(e) {
      this.kind = e.target.querySelector("i").className;
    },
    mouseleave: function() {
      this._timer = setTimeout(() => {
        this.kind = "";
      }, 50);
    },
    sover: function() {
      clearTimeout(this._timer);
    },
    sout: function() {
      this.kind = "";
    }
  }
};
</script>

<style>
</style>
