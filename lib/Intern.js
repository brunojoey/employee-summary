// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

class Intern extends Employee {
    constructor(name, email, id, school, employeeType) {
        this.name = name;
        this.email = email;
        this.id = id;
        this.school = school;
        this.employeeType = "Intern";
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

    getSchool() {
        return this.school;
    };

    getEmployee() {
        return this.employeeType;
    };

};

var alice = new Intern("Alice", "alice@alice.com", 7, "University of South Dakota", "Intern")
console.log(alice);

module.exports = Intern;