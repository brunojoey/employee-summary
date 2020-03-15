// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

class Manager extends Employee {
    constructor(name, email, id, officeNumber, employeeType) {
        this.name = name;
        this.email = email;
        this.id = id;
        this.officeNumber = officeNumber;
        this.employeeType = "Manager";
    };

    getName() {
        return this.name;
    };

    getID() {
        return this.id;
    };

    getEmail() {
        return this.email;
    };

    getOffice() {
        return this.officeNumber;
    };

    getEmployee() {
        return this.employeeType;
    };

};

var carl = new Manager("Carl", "carl@carl.com", 1, 54, "Manager")
console.log(carl);

module.exports = Manager;