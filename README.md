# vue日历组件

<p align="left">
  <a href="https://github.com/misty0304/day-interview/issues"><img src="https://img.shields.io/github/languages/top/badges/shields.svg?label=html" alt="html"></a>
  <a href="https://github.com/misty0304/day-interview/issues"><img src="https://img.shields.io/github/languages/top/badges/shields.svg?label=css" alt="css"></a>
<a href="https://github.com/misty0304/day-interview/issues"><img src="https://img.shields.io/github/languages/top/badges/shields.svg?label=javascript" alt="javascript"></a>
  <a href="https://github.com/misty0304/day-interview/issues"><img src="https://img.shields.io/github/languages/top/badges/shields.svg?label=skill" alt="skill"></a>
  <a href="https://github.com/misty0304/day-interview/stargazers"><img src="https://img.shields.io/redmine/plugin/stars/redmine_xlsx_format_issue_exporter.svg" alt="Statr"></a>
</p>

## 使用方式
```javascript
<m-date-picker
  class="calendar"
  type="radio"
  :box-height="30"
  v-model="value"
  :picker-options="pickerOptions"
  :item-custom-value="itemCustomValue"
  :watch-options="watchOptions"
  @handleClickDay="handleClickDay"
  @handlePrevMonth="handlePrevMonth"
  @handleNextMonth="handleNextMonth"
  @handleToday="handleToday"
  @methodChangeTime="methodChangeTime"
>
  <template slot-scope="props">
    <div style="width: 100%; height: 100%" :style="{ background: props.color }"></div>
  </template>
</m-date-picker>
```
## API
### Attributes
| 字段 | 说明  | 类型  | 可选值 | 默认值 |
|:------------|:---------------|:-----|:--------|:--------|
| type | 日历类型 | String | radio／rectangle | radio |
| box-height | 单元格高度 | String | - | 30 |
| v-model | 初始绑定日期 | Date  | - | - |
| picker-options | 判断单元格是否disabled | Function | - | - |
| item-custom-value | 仅radio模式使用，传入对象，参数有3个值，showDot：是否显示点，color：点的颜色，monthDay：日期；如[{monthDay: '20200314', showDot: true, color: '#000000'}] | Function | - | - |
| watch-options | 额外禁用的日期 | Array | - | [] |

### Methods
| 字段 | 说明  | 参数 |
|:------------|:---------------|:-----|
| handleClickDay | 点击某一天 | - |
| handlePrevMonth | 点击上个月 | - |
| handleNextMonth | 点击下个月 | - |
| handlePrevYear | 点击上一年 | - |
| handleNextYear | 点击下一年 | - |
| handleToday | 跳转到今天 | - |
| methodChangeTime | 切换年月 | - |