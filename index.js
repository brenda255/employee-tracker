const inquirer = require('inquirer');
const fs = require('fs');
// const markdown = require('./utils/generateMarkdown.js');
const mysql = require('mysql2');
// const prompts = require('prompts');
const table = require("console.table");
// const express = require('express');


const PORT = process.env.PORT || 3001;
// const app = express();


// middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

//connect to database
const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'process.env.DB_PASSWORD',
      database: 'employee_db',
    },
    console.log(`Connected to the employee_db database.`)
  );

  connection.connect(function(err){
    if (err) throw err;
    console.log("connection as id" + "connection.threadId" + "\n");
    askQuestions();

// Query database
connection.query('SELECT * FROM employees', function (err, results) {
    console.log(results);
  });
  
})
const askQuestions = () => {
    inquirer.prompt ([
      {
        type: 'list',
        name: 'choices', 
        message: 'What would you like to do?',
        choices: [
            'View all employees', 
            'Add an employee', 
            'Update employee role', 
            'View all roles', 
            'Add a role', 
            'View all departments', 
            'Add a department',
            'QUIT'
        ],
}])
.then(answers => {
    console.log(answers.choice);
    switch (answers.choice) {
     case "view all employees":
        viewEmployee()
        break;   
        case "view all departments":
            viewDepartment()
            break;   
            case "view all roles":
                viewRole()
                break;  
                case "add a department":
                    addDepartment()
                    break;
                    case "add a role":
                        addRole()
                        break;
                        case "add an employee":
                            addEmployee()
                            break;
                            case "update employee role":
                                updateRole()
                                break;  

default: 
connection.end() 
break;
}})}

const viewEmployee = () => {
  connection.query("SELECT * FROM employee", function (err,data) {
    console.table(data);
    askQuestions();
})
}

const viewDepartment= () => {
  connection.query("SELECT * FROM department", function (err, data) {
    console.table(data);
    askQuestions();
})
}

const addEmployee= () => {
  inquirer.prompt([{
          type: "input",
          name: "firstName",
          message: "What is the employees first name?"
      },
      {
          type: "input",
          name: "lastName",
          message: "What is the employees last name?"
      },
      {
          type: "number",
          name: "roleId",
          message: "What is the employees role ID"
      },
      {
          type: "number",
          name: "managerId",
          message: "What is the employees manager's ID?"
      }
  ]).then(function(res) {
      connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.managerId], function(err, data) {
          if (err) throw err;
          console.table("Successfully Inserted");
          askQuestions();
      })
  })
}

const addDepartment= () => {
  inquirer.prompt([{
      type: "input",
      name: "department",
      message: "What is the department that you want to add?"
  }, ]).then(function(res) {
      connection.query('INSERT INTO department (name) VALUES (?)', [res.department], function(err, data) {
          if (err) throw err;
          console.table("Successfully Inserted");
          askQuestions();
      })
  })
}

const addRole= () => {
  inquirer.prompt([
      {
          message: "enter title:",
          type: "input",
          name: "title"
      }, {
          message: "enter salary:",
          type: "number",
          name: "salary"
      }, {
          message: "enter department ID:",
          type: "number",
          name: "department_id"
      }
  ]).then(function (response) {
      connection.query("INSERT INTO roles (title, salary, department_id) values (?, ?, ?)", [response.title, response.salary, response.department_id], function (err, data) {
          console.table(data);
      })
      askQuestions();
  })

}

const updateEmployeeRole= () => {
  inquirer.prompt([
      {
          message: "Which employee would you like to update? (use first name only for now)",
          type: "input",
          name: "name"
      }, {
          message: "enter the new role ID:",
          type: "number",
          name: "role_id"
      }
  ]).then(function (response) {
      connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.name], function (err, data) {
          console.table(data);
      })
      askQuestions();
  })

}






  // // Default response for not found
  // app.use((req, res) => {
  //   res.status(404).end();
  // });
  
  // app.listen(PORT, () => {
  //   console.log(`Server running on port ${PORT}`);
  // });
