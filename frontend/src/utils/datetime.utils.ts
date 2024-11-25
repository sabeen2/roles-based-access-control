import dayjs from 'dayjs'
import { singularOrPlural } from './string.utils'

export const trimTime = (time: string) => {
    // 07:00:00 AM -> 07:00 AM
    const timeArr = time.split(':')
    return `${timeArr[0]}:${timeArr[1]} ${
        time.toLowerCase().includes('am') ? 'AM' : 'PM'
    }`
}

export const convert12HourFormatInto24HourFormat = (time: string) => {
    // 03:30:00 PM -> 15:30

    const timeArr = time.split(':')
    const isAm = time.toLowerCase().includes('am')
    const hourNum = parseInt(timeArr[0])

    return `${isAm ? hourNum : hourNum + 12}:${timeArr[1]}`
}

export const weekDays = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
]

export const breakNumIntoTime = (duration: number) => {
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60

    let timeStr = ''

    if (hours === 0) {
        timeStr = `${minutes} ${singularOrPlural(minutes, 'min', 'mins')}`
    } else {
        timeStr = `${hours} ${singularOrPlural(hours, 'hr', 'hrs')}`

        if (minutes !== 0) {
            timeStr += `, ${minutes} ${singularOrPlural(
                minutes,
                'min',
                'mins'
            )}`
        }
    }

    return timeStr
}

export const getHowLongAgo = (timestamp: string) => {
    const date: Date = new Date(timestamp)
    const now: Date = new Date()
    const seconds: number = Math.floor((now.getTime() - date.getTime()) / 1000)
    let interval: number = Math.floor(seconds / 31536000)

    if (interval >= 1) {
        return interval + (interval === 1 ? ' year' : ' years') + ' ago'
    }

    interval = Math.floor(seconds / 2592000)
    if (interval >= 1) {
        return interval + (interval === 1 ? ' month' : ' months') + ' ago'
    }

    interval = Math.floor(seconds / 86400)
    if (interval >= 1) {
        return interval + (interval === 1 ? ' day' : ' days') + ' ago'
    }

    interval = Math.floor(seconds / 3600)
    if (interval >= 1) {
        return interval + (interval === 1 ? ' hour' : ' hours') + ' ago'
    }

    interval = Math.floor(seconds / 60)
    if (interval >= 1) {
        return interval + (interval === 1 ? ' minute' : ' minutes') + ' ago'
    }

    return 'Just now'
}

export const getMonthNameFromYearAndMonth = (year: number, month: number) => {
    const date = dayjs(`${year}-${month}-01`)
    const monthName = date.format('MMMM')

    return monthName
}
