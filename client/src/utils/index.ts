export const formatNumber = (number: number): string => {
    if (number >= 1_000_000) return (number / 1_000_000).toFixed(number % 1000000 !== 0 ? 1 : 0) + 'M';
    else if (number >= 1_000) return (number / 1_000).toFixed(number % 1000 !== 0 ? 1 : 0) + 'K';
    else return number.toString();
};
