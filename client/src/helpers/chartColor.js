const bgColor = [
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
];

const borderColor = [
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
];

export default function chartBgColor(noOfColor) {
    const selectedBgColor = [];
    const selectedBorderColor = [];
    for (let i = 0; i < noOfColor; i += 1) {
        selectedBgColor.push(bgColor[i]);
        selectedBorderColor.push(borderColor[i]);
    }
    return {
        backgroundColor: selectedBgColor,
        borderColor: selectedBorderColor,
    };
}
