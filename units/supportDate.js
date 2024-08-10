const supportDate = {
    getToday: () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        return today = yyyy + '-' + mm + '-' + dd;
    },
    getTodayFullFormat: () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        var hour = String(today.getHours()).padStart(2, '0');
        var minutes = String(today.getMinutes()).padStart(2, '0');
        return today = yyyy + '-' + mm + '-' + dd + '@' + hour + ':' + minutes;
    },
    getTodayFullFormatDDMMYYYY: () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        var hour = String(today.getHours()).padStart(2, '0');
        var minutes = String(today.getMinutes()).padStart(2, '0');
        return today = dd + '-' + mm + '-' + yyyy + '@' + hour + ':' + minutes;
    },
    getTodayMonthDay: (date) => {
        let today = date ? new Date(date): new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = today.getMonth() + 1
        return today = coverMonthToString(mm) + '-' + dd;
    },
    getTodayMonth: () => {
        let today = new Date();
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        return today = yyyy + '-' + mm;
    },
    increaseTodayWithNumber(value, type, number) {
        var dd;
        let mm;
        var yyyy;
        const dateChange = new Date(value);
        switch (type) {
            case "day": {
                dd = dateChange.getDate() + number;
                mm = dateChange.getMonth() + 1
                yyyy = dateChange.getFullYear();
                break;
            }
            case "month": {
                dateChange.setMonth(dateChange.getMonth() + number);
                mm = dateChange.getMonth() + 1
                dd = dateChange.getDate();
                yyyy = dateChange.getFullYear();
                break;
            }
            case "end_month": {
                dateChange.setMonth(dateChange.getMonth() + number);
                mm = dateChange.getMonth() + 1
                yyyy = dateChange.getFullYear();
                const lastDayOfTheMonth = new Date(yyyy, mm, 0).getDate();
                dd = lastDayOfTheMonth;
                break;
            }
        }
        return (yyyy + '-' + String(mm).padStart(2, '0') + '-' + String(dd).padStart(2, '0'));
    },
    changeDateToString: (date) => {
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = date.getFullYear();
        return (yyyy + '-' + mm + '-' + dd);
    },
    changeDateToString2: (value) => {
        const date = new Date(value)
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = date.getMonth() + 1
        let yyyy = date.getFullYear();
        return yyyy + '-' + coverMonthToString(mm) + '-' + dd;
    },
    changeDateToFullFormat: (value) => {
        let today = new Date(value);
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        var hour = String(today.getHours()).padStart(2, '0');
        var minutes = String(today.getMinutes()).padStart(2, '0');
        return today = yyyy + '-' + mm + '-' + dd + '@' + hour + ':' + minutes;
    },
    changeDateToYYYYMMMM: (value) => {
        const date = new Date(value)
        let mm = date.getMonth() + 1
        let yyyy = date.getFullYear();
        return yyyy + '-' + coverMonthToString(mm);
    },
    changeDataToDDMMYYYY: (value) => {
        let today;
        if(value) today = new Date(value);
        else today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        return today = dd + '-' + mm + '-' + yyyy;
    },
    changeDataYYYYMMDD: (value) => {
        let today;
        if(value) today = new Date(value);
        else today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        return today =  yyyy + '-' + mm + '-' + dd;
    },
    changeDateToDDMM: (value) => {
        const date = new Date(value)
        let dd = date.getDate();
        let mm = date.getMonth() + 1
        return dd + '-' + mm
    },
    getNights: (date1, date2) => {
        const startDate = new Date(date1);
        const endDate = new Date(date2);

        startDate.setHours(0);
        startDate.setMinutes(0);

        endDate.setHours(0);
        endDate.setMinutes(0);

        // calculate the difference in milliseconds between the two dates
        const diffMs = endDate.getTime() - startDate.getTime();

        // calculate the number of milliseconds in one day
        const msPerDay = 1000 * 60 * 60 * 24;

        // calculate the number of days between the two dates, rounding down
        const diffDays = Math.floor(diffMs / msPerDay);
        // return the number of nights (which is one less than the number of days)
        return diffDays;
    },
    coverStringToForMatDDMMYYYY: (value) => {
        let dd = value.slice(8, 10);
        let mm = value.slice(5, 7);
        let yyyy = value.slice(0, 4);

        // const lateDayOldMonth = lateDateOldMonth.slice(8, 10);
        // const lateYearOldMonth = lateDateOldMonth.slice(0, 4);
        // const lateMonthOldMonth = lateDateOldMonth.slice(5, 7);

        return (dd + "-" + mm + "-" + yyyy)

    },
    coverNumberToDateTimeForMat: (inputDate) => {
        let date = inputDate.slice(0, 4) + "-" + inputDate.slice(4, 6) + "-" + inputDate.slice(6, 8)
        let time = inputDate.slice(8, 10) + ":" + inputDate.slice(10, 12)
        return date + "@" + time
    },
    coverMonthToString: (value) => {
        switch (value) {
            case 1: return "Jan";
            case 2: return "Feb";
            case 3: return "Mar";
            case 4: return "Apr";
            case 5: return "May";
            case 6: return "Jun";
            case 7: return "Jul";
            case 8: return "Aug";
            case 9: return "Sep";
            case 10: return "Oct";
            case 11: return "Nov";
            case 12: return "Dec";
            default: return "";
        }
    },
    switchDayToText: (day) => {
        // eslint-disable-next-line default-case
        switch (day) {
            case 0: return "Sun";
            case 1: return "Mon";
            case 2: return "Tue";
            case 3: return "Wed";
            case 4: return "Thu";
            case 5: return "Fri";
            case 6: return "Sat";
            default: return "";
        }
    },
    coverNumberToString: (value) => {
        return String(value).padStart(2, '0');
    },
    compare2Dates: (value1, value2) => {
        const date1 = new Date(value1);
        const date2 = new Date(value2);

        const date1Timestamp = date1.getTime();
        const date2Timestamp = date2.getTime();

        if (date1Timestamp === date2Timestamp) {
            return 0;
        }
        if (date1Timestamp < date2Timestamp) {
            return 2;
        }
        return 1;
    },
    isSameMonth(value1, value2) {
        // const date1 = new Date(value1);
        // const date2 = new Date(value2);
        // return date1.getMonth() === date2.getMonth();
        return value1.getMonth() === value2.getMonth();
    },
    isSameMonthWithString(value1, value2) {
        const date1 = new Date(value1);
        const date2 = new Date(value2);
        // return date1.getMonth() === date2.getMonth();
        return date1.getMonth() === date2.getMonth();
    },
    difference2Month(value1, value2) {
        const date1 = value1.getMonth();
        const date2 = value2.getMonth();

        if (date1 > date2) return 1;
        else if (date1 < date2) return 2;
        else return 0
    },
    getDayDifference(value1, value2) {
        const date1 = new Date(value1);
        const date2 = new Date(value2);
        const difference = date2 - date1;
        const dayInMs = 24 * 60 * 60 * 1000;
        return Math.round(difference / dayInMs);
    },
    getMonthDifference(value1, value2) {
        const date1 = new Date(value1);
        const date2 = new Date(value2);
        let months = (date2.getFullYear() - date1.getFullYear()) * 12;
        months -= date1.getMonth();
        months += date2.getMonth();
        return months;
    },
    extendMonth(value, monthCount) {
        const date = new Date(value);
        const newDate = new Date(date.getTime());
        newDate.setMonth(newDate.getMonth() + monthCount);

        let mm = String(newDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = newDate.getFullYear();

        return yyyy + "-" + mm;
    },
    calculationNightOnMonth(checkin, checkout, startMonth, endMonth) {

    },
    calculateNightsAccSum(checkinValue, checkoutValue, sum_creditValue,id) {
        const checkin = new Date(checkinValue);
        const checkout = new Date(checkoutValue);
        const sum_credit = new Date(sum_creditValue);

        function checkDayWithOther2Day(day1, day2) {
            // const dayCheck1 = new Date(day1);
            // const dayCheck2 = new Date(day2);
            if (day1 > day2) return 1;
            else if (day1 < day2) return 2;
            else return 0
        }

        function startDayThisMonthYYYY_MM_01(date) {
            var newDate = new Date(date)
            let mm = String(( newDate.getMonth()) + 1).padStart(2, '0');
            let yyyy =  newDate.getFullYear();
            return new Date(yyyy + "-" + mm + "-01");
        }

        function startDayNextOneMonthYYYY_MM_01(date) {
            var newDate = new Date(date)
            newDate.setDate(1);;
            newDate.setMonth(newDate.getMonth() + 1);

            let mm = String((newDate.getMonth())+1).padStart(2, '0');
            let yyyy = newDate.getFullYear();
            return new Date(yyyy + "-" + mm + "-01");
        }

        function changeDateToString (date)  {
            let dd = String(date.getDate()).padStart(2, '0');
            let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = date.getFullYear();
            return (yyyy + '-' + mm + '-' + dd);
        }

        function checkMonthWithOther2Day(day1, day2) {
            if (!day1) return 1;
            if (!day2) return 2;

            const month1 = new Date(changeDateToString(day1).slice(0, 7));
            const month2 = new Date(changeDateToString(day2).slice(0, 7));
            if (month1 > month2) return 1;
            else if (month1 < month2) return 2;
            else return 0
        }

        function parseDate(input,type) {
            // console.log("input: ", input);
            // console.log("type: ", type);
            let checkInput;
            if(input.length !== 10) return checkInput = changeDateToString(input);
            else checkInput = input;

            if (checkInput === "") return 0;
            else {
                var parts = checkInput.match(/(\d+)/g);
                // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
                return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
            }
        }

        function calculateNightsBetweenDates(endDate, startDate) {
            const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in one day

            const day1 = new Date(startDate)
            day1.setHours(0);
            day1.setMinutes(0);

            const day2 = new Date(endDate)
            day2.setHours(0);
            day2.setMinutes(0);
          //  console.log("endDate calculate", endDate)
         //   console.log("startDate calculate", startDate)
          
            // Convert input date strings to Date objects
            // const startDateObj = new Date(startDate);
            // const endDateObj = new Date(endDate);
          
            // Calculate the difference in days
           // const diffDays = Math.round(Math.abs((endDate - startDate) / oneDay));
          

            const diffDays = Math.round(Math.abs((day2 - day1) / oneDay));

            // if(id === "991e86edab") {
            //     console.log("day1", day1)
            //     console.log("day2", day2)

            //     console.log("diffDays 1", diffDays)
            // }

            return diffDays;
          }

        const checkDayInWithOut = checkDayWithOther2Day(checkin, checkout)
        const inWithSum = checkMonthWithOther2Day(checkin, sum_credit);
        const outWithSum = checkMonthWithOther2Day(checkout, sum_credit);
    
        // console.log("checkDayInWithOut", checkDayInWithOut)
        // console.log("inWithSum", inWithSum)
        // console.log("outWithSum", outWithSum)

       // return calculateNightsBetweenDates(checkin, checkout)

        // case 1: check in > check out =>    // const inWithOut = checkMonthWithOther2Day(checkin, checkout); nights=""
        if (checkDayInWithOut === 1) {
            return "";
        } else {
            if (inWithSum === 1) { // check in > schedule start
                return 0;
            } else if (inWithSum === 0) { // check in = schedule start
                // if(id ==="991e86edab") {
                //     console.log("checkout",checkout)
                //     console.log("checkin",checkin)

                //    //reset time 
                //     //console.log("calculateNightsBetweenDates:",calculateNightsBetweenDates(startDayOnNextMonth,checkin))    
                // }

                if (outWithSum === 0) return calculateNightsBetweenDates(checkout,checkin); // (parseDate(checkout, "out").getTime() - parseDate(checkin, "in").getTime()) / (1000 * 3600 * 24);
                else if (outWithSum === 1) { // check out > schedule start

                    const startDayOnNextMonth = startDayNextOneMonthYYYY_MM_01(checkin);
                    // console.log("startDayOnNextMonth", startDayOnNextMonth)
                    // console.log("calculateNightsBetweenDates", calculateNightsBetweenDates(startDayOnNextMonth,checkin))
               
                    return calculateNightsBetweenDates(startDayOnNextMonth,checkin); //(parseDate(startDayOnNextMonth, "start day").getTime() - parseDate(checkin, "in").getTime()) / (1000 * 3600 * 24);
                }
            } else { //inWithSum === 2

                // console.log("inWithSum", inWithSum)
                // console.log("outWithSum", outWithSum)

                if (outWithSum === 2) {
                    return 0;
                }
                else if (outWithSum === 0) {
                    const changeCheckOutTime = new Date(checkout);
                    changeCheckOutTime.setHours(0);
                    changeCheckOutTime.setMinutes(0);
                    const startDayThisMonth = startDayThisMonthYYYY_MM_01(checkout);
                    return calculateNightsBetweenDates(changeCheckOutTime,startDayThisMonth) // (parseDate(checkout, "out").getTime() - parseDate(startDayThisMonth, "start day").getTime()) / (1000 * 3600 * 24);
                }
                else {
                    const startDayThisMonth = startDayThisMonthYYYY_MM_01(sum_credit);
                    const startDayOnNextMonth = startDayNextOneMonthYYYY_MM_01(sum_credit);
                    return calculateNightsBetweenDates(startDayOnNextMonth, startDayThisMonth)// (parseDate(startDayOnNextMonth,"end day").getTime() - parseDate(startDayThisMonth, "start day").getTime()) / (1000 * 3600 * 24);
                }
            }
        }
    }
};

const coverMonthToString = (value) => {
    switch (value) {
        case 1: return "Jan";
        case 2: return "Feb";
        case 3: return "Mar";
        case 4: return "Apr";
        case 5: return "May";
        case 6: return "Jun";
        case 7: return "Jul";
        case 8: return "Aug";
        case 9: return "Sep";
        case 10: return "Oct";
        case 11: return "Nov";
        case 12: return "Dec";
        default: return "";
    }
}

module.exports = supportDate;
