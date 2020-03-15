// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

class Engineer extends Employee {
    constructor(name, email, id, github, employeeType) {
        this.name = name;
        this.email = email;
        this.id = id;
        this.github = github;
        this.employeeType = "Engineer";
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

    getGitHub() {
        return this.github;
    };

    getEmployee() {
        return this.employeeType;
    };

};

var rich = new Engineer("Rich", "rich@rich.com", 5, "richGitHub", "Engineer")
console.log(rich);

module.exports = Engineer;