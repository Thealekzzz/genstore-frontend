export default function getPrettyDateTime(date) {
	date = new Date(date);
	
	const now = new Date();
	const diff = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

	if (diff < 2) {
		if (diff < 1) {
			return `сегодня, ${date.toLocaleTimeString()}`;
		} else {
			return `вчера, ${date.toLocaleTimeString()}`;
		}
	} else {
		return [
			addZeroIfNeeded(date.getDate()),
			addZeroIfNeeded(date.getMonth() + 1),
			date.getFullYear()
		].join('.') + " " + date.toLocaleTimeString();
	}
}

function addZeroIfNeeded(num) {
	return num < 10 ? `0${num}` : num;
}