export function getToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return today = yyyy + '-' + mm + '-' + dd;
}

export function getDayByFormatYYYYMMDD(value) {
    var dataValue = new Date(value);
    var dd = String(dataValue.getDate()).padStart(2, '0');
    var mm = String(dataValue.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = dataValue.getFullYear();
    return dataValue = yyyy + '-' + mm + '-' + dd;
}

export function getTodayFullFormatYYYYMMDD() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var hour = String(today.getHours()).padStart(2, '0');
    var minutes = String(today.getMinutes()).padStart(2, '0');
    return today = yyyy + '-' + mm + '-' + dd + ':@' + hour + ':' + minutes;
}