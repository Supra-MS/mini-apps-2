let moment = require('moment');
export function CalcDate(dated) {
    let date = new Date();
    let splitBySlash = dated.split('/');
    let len = splitBySlash.length;
    
    let copy = splitBySlash.slice();
    copy.shift();

    let yr = splitBySlash[0];
    let formatTemp = copy.join('/');
    let isBC = Number(yr) < 0;
    
    if (isBC) {
        date.setYear(yr);
        let yearsAgo = moment(date, 'YYYYMMDD').fromNow();
        let newDate = moment(formatTemp, 'MMDD').format("MMMM");
        if (len === 1) {
            return `B.C ${-Number(yr)} [${yearsAgo}]` 
        } else {
            return `B.C ${-Number(yr)} ${newDate} [${yearsAgo}]`;
        }
    } else {
        let newDate = moment(formatTemp, 'MMDD').format("MMMM");
        let yearsAgo =  2020 - Number(yr);
        if (len === 1) {
            return `A.D ${yr} [${yearsAgo} years ago]` 
        } else {
            return `A.D ${yr} ${newDate} [${yearsAgo} years ago]`;
        }
    }
};
