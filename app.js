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
                { name: "Manager", checked: false },
                { name: "Engineer", checked: false },
                { name: "Intern", checked: false }
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
            if (employeeType === "Manager") {
                const managerObject = await inquirer.prompt(managerQuestions);
                const { name, id, email, office } = managerObject;
                const newManager = new Manager(name, id, email, office);
                employees.push(newManager);
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
            else if (employeeType === "Intern") {
                const internObject = await inquirer.prompt(internQuestions);
                const { name, id, email, school } = internObject;
                const newIntern = new Intern(name, id, email, school);
                employees.push(newIntern);
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