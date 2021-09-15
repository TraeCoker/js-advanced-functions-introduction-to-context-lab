function createEmployeeRecord(array){
    const employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employee;
};

function createEmployeeRecords(array){
    return array.map(employeeArray => createEmployeeRecord(employeeArray));
};

function createTimeInEvent(employeeRecord, dateStamp) {
    const hour = parseInt(dateStamp.split(' ')[1])
    const date = dateStamp.split(' ')[0]
    const event = {
        type: "TimeIn",
        hour: hour, 
        date: date
    };

    employeeRecord.timeInEvents.push(event);
    return employeeRecord;
};

function createTimeOutEvent(employeeRecord, dateStamp) {
    const hour = parseInt(dateStamp.split(' ')[1])
    const date = dateStamp.split(' ')[0]
    const event = {
        type: "TimeOut",
        hour: hour, 
        date: date
    };

    employeeRecord.timeOutEvents.push(event);
    return employeeRecord;
};

function hoursWorkedOnDate(employeeRecord, dateStamp) {
    const timeIn = employeeRecord.timeInEvents.find(day => day.date === dateStamp).hour;
    const timeOut = employeeRecord.timeOutEvents.find(day => day.date === dateStamp).hour;
    const hoursWorked = timeOut - timeIn; 

    if(hoursWorked % 100 === 0) {
        return hoursWorked / 100;
    } else {
        return hoursWorked;
    };
};

function wagesEarnedOnDate(employeeRecord, dateStamp) {
    const hours = hoursWorkedOnDate(employeeRecord, dateStamp);
    const payRate = employeeRecord.payPerHour;

    return hours * payRate;
};

function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(day => day.date);
    const totalPay = dates.reduce(function(memo, currentDate){return memo + wagesEarnedOnDate(employeeRecord, currentDate)}, 0);

    return totalPay;
};

function findEmployeeByFirstName(employeeRecords, firstName){
    return employeeRecords.find(employee => employee.firstName === firstName);
};

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function(memo, currentEmployee){return memo + allWagesFor(currentEmployee);}, 0);
}