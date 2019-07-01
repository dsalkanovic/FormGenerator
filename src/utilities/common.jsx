export const uuid = (n = 36) => {
    return '00000000-0000-4000-8000-000000000000'
        .replace(/0/g, () => (0 | (Math.random() * 16)).toString(16))
        .slice(0, n);
};

export const isEmpty = string => {
    return string === undefined || string === null || string === '';
};
