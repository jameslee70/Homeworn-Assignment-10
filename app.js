const Manager = require("./lib/manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const teamMembers = [];



const createManager = () => {
    return inquirer.prompt([{
            type: "input",
            name: "name",
            message: "What is your name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is your employee id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your direct office number?"
        },
    ]).then((userInput) => {
        const manager = new Manager(userInput.name, userInput.id, userInput.email, userInput.officeNumber)
        teamMembers.push(manager)
        createTeam();
    })

};


const createTeam = () => {
    return inquirer.prompt([{
        type: "list",
        name: "teamMember",
        message: "What type of team member would you like to add?",
        choices: ["Engineer", "Intern", "I do not want to add anymore members"]
    }]).then((userInput) => {
        switch (userInput.teamMember) {
            case "Engineer":
                createEngineer()
                break;
            case "Intern":
                createIntern()
                break;
                default:       
                writeFile()
        }
    })
}

const createEngineer = () => {
    return inquirer.prompt([{
        type: "input",
        name: "name",
        message: "What is your name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is your employee id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?"
    },
    {
        type: "input",
        name: "gitHub",
        message: "What is your GitHub UserName?"
    }]).then((userInput) => {
        const engineer = new Engineer(userInput.name, userInput.id, userInput.email, userInput.gitHub)
        teamMembers.push(engineer)
        createTeam();
        console.log(teamMembers)
    })

}

const createIntern = () => {
    return inquirer.prompt([{
        type: "input",
        name: "name",
        message: "What is your name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is your employee id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?"
    },
    {
        type: "input",
        name: "school",
        message: "What school are you attending?"
    }]).then((userInput) => {
        const intern = new Intern(userInput.name, userInput.id, userInput.email, userInput.school)
        teamMembers.push(intern)
        createTeam();
        console.log(teamMembers)
    });
};


const writeFile = () =>{
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
      }
      fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
}

createManager();