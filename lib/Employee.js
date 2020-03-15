// TODO: Write code to define and export the Employee class

class Employee {
    constructor (name, email, employeeType, id) {
        this.name = name; 
        this.id = id;
        this.email = email;
        this.employeeType = employeeType;
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

    getEmployee() {
        return this.role;
    };
};

var alex = new Employee ("Alex", "alex@alex.com", "Engineer", 2);
console.log(alex);