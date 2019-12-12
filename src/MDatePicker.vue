<template>
  <div>
    <div class="m-calendar-radio" v-if="type === 'radio'">
      <m-date-picker-head
        :headOptions="headOptions"
        @handlePrevYear="handlePrevYear"
        @handlePrevMonth="handlePrevMonth"
        @handleNextMonth="handleNextMonth"
        @handleNextYear="handleNextYear"
        @handleToday="handleToday"
      />
      <ul class="m-calendar-week clearfix">
        <li v-for="(item, index) in calendarTitleArr" :key="index" class="week-item">{{ item }}</li>
      </ul>
      <ul class="m-calendar-view clearfix">
        <li
          v-for="(item, index) in visibleCalendar"
          :key="index"
          class="date-view"
          :class="[
            { 'month-class': !isCurrentMonth(item.date) },
            { todayBg: isCurrentDay(item.date) },
            { handleDay: item.clickDay },
            { disable: item.disable }
          ]"
        >
          <span
            class="date-day"
            :class="[{ 'opacity-class': !isCurrentMonth(item.date) }]"
            @click="handleClickDay(item)"
          >
            {{ item.day }}
            <div class="dot">
              <slot v-if="item.showDot" color="#000000"></slot>
            </div>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MDatePickerHead from './MDatePickerHead.vue'
import * as utils from './MDatePicker.js'

export default {
  name: 'MDatePicker',
  props: {
    value: Date, // 初始绑定日期
    // 显示样式
    type: {
      type: String,
      default() {
        return 'radio'
      }
    },
    boxHeight: {
      type: Number,
      default() {
        return '30'
      }
    },
    itemCustom: {
      type: Function,
      default() {
        return () => {}
      }
    },
    pickerOptions: {
      type: Function,
      default() {
        return () => {}
      }
    },
    watchOptions: {
      type: [Array, String],
      default() {
        return []
      }
    }
  },
  components: {
    MDatePickerHead
  },
  data() {
    let { year, month, day } = utils.getNewDate(new Date())
    return {
      // 头部
      headOptions: {
        type: this.type,
        // style: this.options.headStyle,
        date: ''
      },
      // 日历表头
      calendarTitleArr: ['一', '二', '三', '四', '五', '六', '日 '],
      // 当天日期
      time: { year, month, day },
      // 日历数据
      visibleCalendar: [],
      calendarDictionary: {}, // 日历数据字典，用于快速定位修改项
      currentMonth: '' // 当前月份
    }
  },
  computed: {
    // 样式
    dayStyle() {
      return {
        textAlign: this.options.viewStyle.day // 文案样式
      }
    }
  },
  methods: {
    // 是否是当前月
    isCurrentMonth(date) {
      let { year: currentYear, month: currentMonth } = utils.getNewDate(
        utils.getDate(this.time.year, this.time.month, 1)
      )
      let { year, month } = utils.getNewDate(date)
      return currentYear === year && currentMonth === month
    },
    // 是否是今天
    isCurrentDay(date) {
      let { year: currentYear, month: currentMonth, day: currentDay } = utils.getNewDate(new Date())
      let { year, month, day } = utils.getNewDate(date)
      return currentYear === year && currentMonth === month && currentDay === day
    },
    // 上一年
    handlePrevYear() {
      this.methodChangeHeadTime('PrevYear')
    },
    // 上一个月
    handlePrevMonth() {
      this.methodChangeHeadTime('PrevMonth')
    },
    // 下一个月
    handleNextMonth() {
      this.methodChangeHeadTime('NextMonth')
    },
    // 下一年
    handleNextYear() {
      this.methodChangeHeadTime('NextYear')
    },
    // 点击回到今天
    handleToday() {
      this.time = utils.getNewDate(new Date())
      this.$emit('handleToday')
    },
    // 点击某一天
    handleClickDay(item) {
      if (item.disable) return false
      this.$emit('handleClickDay', item)
    },
    methodChangeHeadTime(type) {
      let time = utils.getDate(this.time.year, this.time.month, 1)
      switch (type) {
        case 'PrevYear':
          time.setYear(time.getFullYear() - 1)
          break
        case 'PrevMonth':
          time.setMonth(time.getMonth() - 1)
          break
        case 'NextMonth':
          time.setMonth(time.getMonth() + 1)
          break
        case 'NextYear':
          time.setYear(time.getFullYear() + 1)
          break

        default:
          break
      }
      this.time = utils.getNewDate(time)
      this.$emit(`handle${type}`, time)
    },
    // 获取日历数据
    methodGetDayList() {
      const { year, month } = utils.getNewDate(utils.getDate(this.time.year, this.time.month, 1))
      this.currentMonth = month
      this.headOptions.date = `${this.time.year} 年 ${this.time.month + 1} 月`
      const calendatArr = []

      const currentFirstDay = utils.getDate(year, month, 1)

      // 获取当前月第一天星期几
      const weekDay = currentFirstDay.getDay() || 7
      const startTime = currentFirstDay - (weekDay - 1) * 24 * 60 * 60 * 1000

      let monthDayNum
      // 每月1号是周五及以上时显示6行日历，否则5行
      if (weekDay >= 5) {
        monthDayNum = 42
      } else {
        monthDayNum = 35
      }

      this.calendarDictionary = []
      for (let i = 0; i < monthDayNum; i++) {
        const date = new Date(startTime + i * 24 * 60 * 60 * 1000)
        let obj = {
          date,
          year: year,
          month: utils.getNewDate(date).month + 1,
          day: new Date(startTime + i * 24 * 60 * 60 * 1000).getDate(),
          clickDay: this.value
            ? JSON.stringify(utils.getNewDate(new Date(startTime + i * 24 * 60 * 60 * 1000))) ===
              JSON.stringify(utils.getNewDate(this.value))
            : false,
          disable: this.pickerOptions(date)
        }

        calendatArr.push(Object.assign({}, obj, this.itemCustom(obj)))
        this.visibleCalendar = calendatArr
        this.calendarDictionary[new Date(startTime + i * 24 * 60 * 60 * 1000).getTime()] = obj
      }
    }
  },
  created() {
  },
  watch: {
    // 更新头部日期
    time: {
      handler() {
        this.methodGetDayList()
      },
      immediate: true
    },
    watchOptions: {
      handler(val) {
        if (!val.length) return false
        this.methodGetDayList()
      },
      immediate: true
    },
    value: {
      handler(val) {
        this.visibleCalendar.map(item => {
          item.clickDay = new Date(item.date).getTime() === new Date(val).getTime()
        })
      }
    }
  }
}
</script>

<style lang="scss">
ul,
ol {
  list-style: none;
}
.m-calendar-radio {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding-bottom: 10px;
  .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: ' ';
    clear: both;
    height: 0;
  }
  .clearfix {
    *zoom: 1;
  }
  .m-calendar-week {
    width: 100%;
    height: 46px;
    line-height: 46px;
    .week-item {
      float: left;
      width: 14.285%;
      text-align: center;
      font-size: 14px;
      color: #424953;
      font-weight: 600;
      -webkit-user-select: none;
      -webkit-touch-callout: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }
  .m-calendar-view {
    width: 100%;
    .date-view {
      float: left;
      width: 14.285%;
      display: flex;
      justify-content: center;
      margin: 10px 0;
      -webkit-user-select: none;
      -webkit-touch-callout: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      .date-day {
        position: relative;
        cursor: pointer;
        text-align: center;
        width: 30px;
        height: 30px;
        line-height: 30px;
        display: block;
        border-radius: 50%;
        border: 1px solid #e4e7ea;
        font-size: 14px;
        color: #7f8794;
        .dot {
          position: absolute;
          top: 34px;
          left: 11px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          overflow: hidden;
        }
      }
    }
    .disable {
      .date-day {
        background-image: linear-gradient(
          45deg,
          rgba(000, 000, 000, 0.03) 25%,
          transparent 25%,
          transparent 50%,
          rgba(000, 000, 000, 0.03) 50%,
          rgba(000, 000, 000, 0.03) 75%,
          transparent 75%,
          transparent
        );
        opacity: 0.5;
        background-size: 20px 20px;
        cursor: not-allowed;
      }
    }
    .opacity-class {
      opacity: 0.5;
      background-image: linear-gradient(
        45deg,
        rgba(000, 000, 000, 0.03) 25%,
        transparent 25%,
        transparent 50%,
        rgba(000, 000, 000, 0.03) 50%,
        rgba(000, 000, 000, 0.03) 75%,
        transparent 75%,
        transparent
      );
      background-size: 20px 20px;
    }
    .todayBg {
      .date-day {
        color: #09bdc6;
      }
    }
    .handleDay {
      .date-day {
        background: #09bdc6 !important;
        color: #ffffff !important;
        border: 1px solid #09bdc6;
      }
    }
  }
}
</style>
