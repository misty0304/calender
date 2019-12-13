<template>
  <div class="m-year-month">
    <div class="m-year-month_head">
      <div>
        <m-icon class="m-year-month_head_prev" icon-name="year_arrow_left" :icon-size="24" @click="handlePrev" />
      </div>
      <div v-if="type === 'year'">{{ yearArea }}0年 — {{ yearArea }}9年</div>
      <div v-else>{{ selectedYear }}年</div>
      <div>
        <m-icon class="m-year-month_head_next" icon-name="year_arrow_right" :icon-size="24" @click="handleNext" />
      </div>
    </div>
    <div class="m-year-month_body" v-if="type === 'year'">
      <div v-for="(item, index) in yearNum" :key="index" @click="handleYearItem(item)">{{ yearArea }}{{ item }}</div>
    </div>
    <div class="m-year-month_body" v-else>
      <div v-for="(item, index) in monthNum" :key="index" @click="handleMonthItem(item)">{{ item }}月</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MDateYearMonth',
  props: {
    year: Number,
    showChangeTime: Boolean
  },
  data() {
    return {
      yearNum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // 年份区间最后一位
      yearArea: this.methodGetYearArea(this.year) - 0, // 年份前3个数字
      selectedYear: '', // 选中的年份
      monthNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // 月份区间
      type: 'year' // 显示类型
    }
  },
  watch: {
    // 重置type，每次显示都展示年份区间
    showChangeTime: {
      handler(val) {
        this.type = 'year'
      }
    }
  },
  mounted() {},
  methods: {
    // 后退
    handlePrev() {
      if (this.type === 'year') {
        this.yearArea = this.yearArea - 1
      } else {
        this.selectedYear = this.selectedYear - 1
      }
    },
    // 前进
    handleNext() {
      if (this.type === 'year') {
        this.yearArea = this.yearArea + 1
      } else {
        this.selectedYear = this.selectedYear + 1
      }
    },
    // 切换年
    handleYearItem(item) {
      this.selectedYear = this.yearArea + '' + item - 0
      this.type = 'month'
    },
    // 切换月
    handleMonthItem(item) {
      this.$emit('methodChangeTime', { year: this.selectedYear, month: item - 1 })
    },
    // 获取年份前3个数字
    methodGetYearArea(year) {
      const yearArea = year + ''
      return yearArea.substr(0, yearArea.length - 1)
    }
  }
}
</script>

<style lang="scss">
.m-year-month {
  width: 300px;
  .m-year-month_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    .m-year-month_head_prev,
    .m-year-month_head_next {
      cursor: pointer;
    }
  }
  .m-year-month_body {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    border-top: 1px solid #e4e4e4;
    > div {
      width: 74px;
      height: 32px;
      line-height: 32px;
      margin: 15px 0;
      cursor: pointer;
    }
  }
}
</style>
