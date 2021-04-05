const sortArray = (x, y) => {
    var key0 = x.startDate;
    var key1 = y.startDate;
    if (key0 < key1) {
        return -1;
    } else if (key0 == key1) {
        return 0;
    } else {
        return 1;
    }
}
const calculateData = (sheet, months, operate) => {
    for (let month of months) {
        if (!sheet[month.startDate]) {
            sheet[month.startDate] = { amount: 0, startDate: month.startDate }
        }
        if (typeof month.amount == "string") {
            month.amount = parseFloat(month.amount);
        }
        if (month.amount == null || month == undefined || isNaN(month.amount)) {
            month.amount = 0
        }
        sheet[month.startDate] = operate == "+" ? { amount: sheet[month.startDate].amount + month.amount, startDate: month.startDate } : { amount: sheet[month.startDate].amount - month.amount, startDate: month.startDate }
    }
    return sheet;
}
const generateSheet = (input = { expenseAmount: [], revenueAmount: [] }) => {
    if (!input.expenseData && !input.revenueData) {
        console.log('Please provide json file');
        return;
    }
    let sheet = {};
    sheet = calculateData(sheet, input.revenueAmount, '+');
    sheet = calculateData(sheet, input.expenseAmount, '-');
    let balance = { balance: [] };
    for (let data of Object.keys(sheet)) {
        balance.balance.push(sheet[data]);
    }
    balance.balance.sort(sortArray);
    return (balance)
}