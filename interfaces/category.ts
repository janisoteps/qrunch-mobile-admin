export interface HourMinute {
    hour: number,
    minute: number
}

export interface ActiveHours {
    isUsed: boolean,
    startTime: HourMinute,
    endTime: HourMinute
}
