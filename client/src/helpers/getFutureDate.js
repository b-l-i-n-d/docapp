import dayjs from 'dayjs';

export default function getFutureDate(day) {
    const today = dayjs();
    const dayOfWeek = today.day();
    const daysToDayOfWeek = day < dayOfWeek ? 7 - dayOfWeek + day : day - dayOfWeek;
    return today.add(daysToDayOfWeek, 'day').format('YYYY-MM-DD');
}
