const englishMonthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

// 获取年月日方法
const getNewDate = date => {
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  return { year, month, day }
}

const timeFormat = (dateObj, type = 'YYYY-MM-DD') => {
  let year = dateObj.getFullYear()
  let month = ('00' + (dateObj.getMonth() + 1)).slice(-2)
  let date = ('00' + dateObj.getDate()).slice(-2)
  let hours = ('00' + dateObj.getHours()).slice(-2)
  let minutes = ('00' + dateObj.getMinutes()).slice(-2)
  let seconds = ('00' + dateObj.getSeconds()).slice(-2)
  let timeString = ''

  timeString = type
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', date)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
  return timeString
}

const getDate = (year, month, day) => {
  return new Date(year, month, day)
}

const englishMonth = month => {
  let engMonth

  englishMonthList.map(() => {
    engMonth = englishMonthList[month]
  })

  return engMonth
}

const formatDate = date => {
  date = Number(date)
  return date < 10 ? `0${date}` : date
}
export { getNewDate, timeFormat, getDate, englishMonth, formatDate }
