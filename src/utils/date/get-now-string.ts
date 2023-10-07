import DayJs from 'dayjs'

export const getNowString = () => DayJs().format('YYYY/MM/DD HH:mm:ss')
