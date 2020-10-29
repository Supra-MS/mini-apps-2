let moment = require('moment');
export function CalcDate(dated) {
    let date = new Date();
    let splitBySlash = dated.split('/');
    let len = splitBySlash.length;
    
    let copy = splitBySlash.slice();
    copy.shift();

    let yr = splitBySlash[0];
    let formatTemp = copy.join('/');
    date.setYear(yr);

    let yearsAgo = moment(date, 'YYYYMMDD').fromNow();
    let newDate = moment(formatTemp, 'MMDD').format("MMMM YYYY");
    let isBC = Number(yr) < 0;
    
    if (isBC) {
        return (len === 1) ? `B.C ${-Number(yr)} [${yearsAgo}]` 
                : `B.C ${-Number(yr)} ${newDate} [${yearsAgo}]`;
    } else {
        return (len === 1) ? `A.D ${yr} [${yearsAgo}]` 
                : `A.D ${yr} ${newDate} [${yearsAgo}]`;
    }
};
