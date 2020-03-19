const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

async function startApp() {
    const questions = [
        {
            type: "confirm",
            message: "Would you like to create a new employee?",
            name: "newEmployee",
        },
        {
            type: "list",
            message: "Which employee would we like to create?",
            name: "employeeType",
            choices: [
                { name: "Intern", checked: false },
                { name: "Engineer", checked: false },
                { name: "Manager", checked: false }
            ]
        },
        {
            type: "confirm",
            message: "Would you like to create another employee?",
            name: "anotherEmployee",
        }
    ];

    const engineerQuestions = [
        {
            type: "input",
            message: "Please enter your name.",
            name: "name"
        },
        {
            type: "input",
            message: "Please enter your work ID.",
            name: "id"
        },
        {
            type: "input",
            message: "Please enter your work email.",
            name: "email"
        },
        {
            type: "input",
            message: "Please enter your work GitHub.",
            name: "github"
        }
    ];

    const managerQuestions = [
        {
            type: "input",
            message: "Please enter your name.",
            name: "name"
        },
        {
            type: "input",
            message: "Please enter your work ID.",
            name: "id"
        },
        {
            type: "input",
            message: "Please enter your work email.",
            name: "email"
        },
        {
            type: "input",
            message: "Please enter your manager office number.",
            name: "office"
        }
    ];

    const internQuestions = [
        {
            type: "input",
            message: "Please enter your name.",
            name: "name"
        },
        {
            type: "input",
            message: "Please enter your work ID.",
            name: "id"
        },
        {
            type: "input",
            message: "Please enter your work email.",
            name: "email"
        },
        {
            type: "input",
            message: "Please enter the school you are attending.",
            name: "school"
        }
    ];

    const employees = [];
    var exit = true;
    do {
        const begin = await inquirer.prompt(questions[0]);
        const { newEmployee } = begin;
        if (newEmployee === true) {
            const type = await inquirer.prompt(questions[1]);
            const { employeeType } = type;
            if (employeeType === "Intern") {
                const internObject = await inquirer.prompt(internQuestions);
                const { name, id, email, school } = internObject;
                const newIntern = new Intern(name, id, email, school);
                employees.push(newIntern);
                const runAgain = await inquirer.prompt(questions[2]);
                const { anotherEmployee } = runAgain
                exit = anotherEmployee;

            }
            else if (employeeType === "Engineer") {
                const engineerObject = await inquirer.prompt(engineerQuestions);
                const { name, id, email, github } = engineerObject;
                const newEngineer = new Engineer(name, id, email, github);
                employees.push(newEngineer);
                const runAgain = await inquirer.prompt(questions[2]);
                const { anotherEmployee } = runAgain
                exit = anotherEmployee;
            }
            else if (employeeType === "Manager") {
                const managerObject = await inquirer.prompt(managerQuestions);
                const { name, id, email, office } = managerObject;
                const newManager = new Manager(name, id, email, office);
                employees.push(newManager);
                const runAgain = await inquirer.prompt(questions[2]);
                const { anotherEmployee } = runAgain
                exit = anotherEmployee;
            }
        } else if (newEmployee === false) {
            console.log("Finished creating employees..." + "You have " + employees.length + " employees.");
            exit = false;
        };
    }
    while (exit === true);
    const teamHTML = await render(employees);
    fs.writeFile(outputPath, teamHTML, "utf8", function (err) {
        if (err) {
            return console.log("Something went wrong.");
        }
        console.log("Success!");
    });

};

startApp();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
