const inquirer = require('inquirer');
const connection = require('./db/connection')

require("console.table");

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
    console.log(answers.choices);
    switch (answers.choices) {
     case 'View all employees':
        viewEmployee()
        break;   
        case 'View all departments':
            viewDepartment()
            break;   
            case 'View all roles':
                viewRole()
                break;  
                case 'Add a department':
                    addDepartment()
                    break;
                    case 'Add a role':
                        addRole()
                        break;
                        case 'Add an employee':
                            addEmployee()
                            break;
                            case 'Update employee role':
                                updateRole()
                                break;  

default: 
connection.end() 
break;
}})}

askQuestions();

const viewEmployee = () => {
  connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id")
  .then(function([data]){
    console.table(data);
    askQuestions();
  })


}

const viewDepartment= () => {
  connection.promise().query("SELECT * FROM department")
  .then(function ([data]) {
    console.table(data);
    askQuestions();
})
}

const viewRole = () => {
    connection.promise().query("SELECT role.id, role.title, role.salary, department.name AS department_name FROM role LEFT JOIN department ON role.department_id = department.id ")
    .then(function([data]){
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
