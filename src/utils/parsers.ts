export function parseIsoDate(isoDate: string): string {
	const date = new Date(isoDate);
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();
	return `${day}/${month}/${year}`;
}

export function parseMillisecondsToDuration(durationInMilliseconds: number): string {
	const asSeconds = durationInMilliseconds / 1000;
	const hours = Math.floor(asSeconds / 3600);
	const remainingSeconds = asSeconds % 3600;
	const minutes = Math.floor(remainingSeconds / 60);
	const seconds = Math.floor(remainingSeconds % 60);

	let parsedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	if (hours > 0) {
		parsedTime = `${hours}:${parsedTime}`;
	}
	return parsedTime;
}
