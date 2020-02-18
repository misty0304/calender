<template>
  <div class="m-calendar-header clear">
    <div class="m-calendar-header-radio">
      <span>
        <m-icon class="m-calendar-prev" icon-name="double_arrow_left" :icon-size="24" @click="handlePrevYear" />
        <m-icon class="m-calendar-prev m-ml-24" icon-name="year_arrow_left" :icon-size="24" @click="handlePrevMonth" />
      </span>
      <span class="m-calendar-headDate">
        <m-popover
          trigger="click"
          :options="{ placement: 'bottom' }"
          :showPopover="showChangeTime"
          @show="methodShowPopover"
          @hide="methodHidePopover"
        >
          <div class="m-popper-content">
            <div class="checkitem">
              <m-date-year-month :year="year" :showChangeTime="showChangeTime" @methodChangeTime="methodChangeTime" />
            </div>
          </div>
          <a slot="reference">
            {{ this.headOptions.date }}
          </a>
        </m-popover>
      </span>
      <span>
        <m-icon class="m-calendar-next m-mr-24" icon-name="year_arrow_right" :icon-size="24" @click="handleNextMonth" />
        <m-icon class="m-calendar-next" icon-name="double_arrow_right" :icon-size="24" @click="handleNextYear" />
      </span>
      <!-- <span class="m-calendar-today" @click="handleToday"> 今天 </span> -->
    </div>
  </div>
</template>

<script>
import MDateYearMonth from './MDateYearMonth.vue'

export default {
  components: {
    MDateYearMonth
  },
  props: {
    // 头部数据
    headOptions: Object,
    // 年份
    year: Number
  },
  data() {
    return {
      // 头部样式
      headStyle: '',
      showChangeTime: true // 是否显示切换年月popover
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
    },
    // 切换时间
    methodChangeTime(data) {
      this.$emit('methodChangeTime', data)
      this.showChangeTime = false
    },
    // 显示切换年月
    methodShowPopover() {
      this.showChangeTime = true
    },
    // 关闭切换年月
    methodHidePopover() {}
  }
}
</script>

<style lang="scss">
.m-calendar-header {
  padding: 12px 0;
  width: 100%;
  border-bottom: 1px solid #ebeef5;
  .m-calendar-header-radio {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .m-calendar-prev,
    .m-calendar-next {
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
      .checkitem {
        padding: 10px;
      }
    }
  }
}
</style>
