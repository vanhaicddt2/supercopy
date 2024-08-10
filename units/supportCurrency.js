const supportCurrency = {
    changeStringVNDtoNumber: (item) => {
        // eslint-disable-next-line use-isnan
        if (item === "" || item === undefined || item === 0 || item === null || Number.isNaN(item)) return 0;
        else if (typeof item === "number") return item;
        else {
            const removeOne = item.replace(",", "");
            if (removeOne.includes(",")) {
                const removeTwo = removeOne.replace(",", "");
                return Number(removeTwo.includes(",") ? removeTwo.replace(",", "") : removeTwo);
            } else return Number(removeOne)
        }
    },
}

module.exports = supportCurrency;
