<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd class="{active:kind==='all'}" kind="all" keyword="全部">全部</dd>
      <dd class="{active:kind==='part'}" kind="part" keyword="美食">约会聚餐</dd>
      <dd class="{active:kind==='spa'}" kind="spa" keyword="丽人">丽人SPA</dd>
      <dd class="{active:kind==='movie'}" kind="movie" keyword="电影">电影演出</dd>
      <dd class="{active:kind==='travel'}" kind="travel" keyword="旅游">品质出游</dd>
    </dl>
    <ul class="ibody">
      <li v-for="(item, idx) in curdetail" :key="idx">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="item.src" class="image">
          <ul class="cbody">
            <li class="title">{{item.name}}</li>
            <li class="pos">
              <span v-for="v in item.tag" :key="v">{{v}}</span>
            </li>
            <li class="price">
              ￥
              <em>{{item.price}}</em>
              <span>/起</span>
            </li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      kind: "all",
      list: {
        all: [],
        part: [],
        spa: [],
        movie: [],
        travel: []
      }
    };
  },
  computed: {
    curdetail: function() {
      return this.list[this.kind];
    }
  },
  methods: {
    over: async function(e) {
      const self = this;
      const tag = e.target.tagName.toLowerCase();
      if (tag === "dd") {
        self.kind = e.target.getAttribute("kind");
        let keyword = e.target.getAttribute("keyword");
        let {
          status,
          data: { count, pois }
        } = await self.$axios.get("/search/resultsByKeywords", {
          params: {
            keyword,
            city: self.$store.state.geo.position.city
          }
        });
        if (status === 200 && count > 0) {
          let r = pois
            .filter(item => item.photos.length)
            .map(item => {
              return {
                name: item.name,
                tag: item.type.split(";")[0],
                price: item.biz_ext.cost || 暂无,
                src: item.photos[0].url
              };
            });
          self.list[self.kind] = r.slice(0, 9);
        } else {
          self.list[self.kind] = [];
        }
      }
    }
  },
  async mounted() {
    const self = this;
    let {
      status,
      data: { count, pois }
    } = await self.$axios.get("/search/resultsByKeywords", {
      params: {
        keyword: "景点",
        city: self.$store.state.geo.position.city
      }
    });
    if (status === 200 && count > 0) {
      let r = pois
        .filter(item => item.photos.length)
        .map(item => {
          return {
            name: item.name,
            tag: item.type.split(";")[0],
            price: item.biz_ext.cost || 暂无,
            src: item.photos[0].url
          };
        });
      self.list[self.kind] = r.slice(0, 9);
    } else {
      self.list[self.kind] = [];
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/index/artistic.scss";
</style>
