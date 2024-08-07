const roundToNearest15Minutes = (time: any) => {
	const minutes = time.minute()
	const roundedMinutes = Math.ceil(minutes / 15) * 15
	return time.minute(roundedMinutes).second(0)
}

export default roundToNearest15Minutes
