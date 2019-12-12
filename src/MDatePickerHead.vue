<template>
  <div class="m-calendar-header clear">
    <div class="m-calendar-header-radio" v-if="this.headOptions.type == 'radio'">
      <span>
        <m-icon class="m-calendar-prev" icon-name="double_arrow_left" :icon-size="24" @click="handlePrevYear" />
        <m-icon class="m-calendar-prev m-ml-24" icon-name="year_arrow_left" :icon-size="24" @click="handlePrevMonth" />
      </span>
      <span class="m-calendar-headDate"> {{ this.headOptions.date }} </span>
      <span>
        <m-icon class="m-calendar-next m-mr-24" icon-name="year_arrow_right" :icon-size="24" @click="handleNextMonth" />
        <m-icon class="m-calendar-next" icon-name="double_arrow_right" :icon-size="24" @click="handleNextYear" />
      </span>
      <!-- <span class="m-calendar-today" @click="handleToday"> 今天 </span> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headOptions: Object
  },
  data() {
    return {
      headStyle: ''
    }
  },
  mounted() {
    this.headStyle = this.headOptions.style
  },
  methods: {
    // 上一年
    handlePrevYear() {
      this.$emit('handlePrevYear')
    },
    // 上一个月
    handlePrevMonth() {
      this.$emit('handlePrevMonth')
    },
    // 下一个月
    handleNextMonth() {
      this.$emit('handleNextMonth')
    },
    // 下一年
    handleNextYear() {
      this.$emit('handleNextYear')
    },
    // 回到今天
    handleToday() {
      this.$emit('handleToday')
    }
  }
}
</script>

<style lang="less">
.m-calendar-header {
  padding: 12px 0;
  width: 100%;
  border-bottom: 1px solid #ebeef5;
  .m-calendar-header-radio{
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .m-calendar-prev, .m-calendar-next {
      display: inline-block;
      vertical-align: middle;

      background-size: contain;
      cursor: pointer;
    }
    .m-calendar-headDate {
      margin: 0 12px;
      font-size: 24px;
      color: #424953;
      -webkit-user-select: none;
      -webkit-touch-callout: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }
}
</style>
