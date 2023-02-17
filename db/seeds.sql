INSERT INTO department (name)
VALUES  ('Finance'),
        ('Legal'),
        ('Sales'),
        ('Engineering');


INSERT INTO role (title, department_id, salary )
VALUES  ('Accountant', 1, 1.2),
        ('Lawyer', 2, 3.0),
        ('Salesman', 3, 4.0),
        ('Software engineer', 4, 5.0 );



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Mark', 'Brown', 2, null),
        ('Laura', 'Nicholson', 1, 1),
        ('Jacob', 'Burns', 3, null),
        ('Kyron', 'Bonilla', 3, 3),
        ('Beth', 'Shannon', 4, null),
        ('Teddy', 'Brock', 4, 4),
        ('Kevin', 'Peck', 1, null),
        ('Betsy', 'Lawson', 2, 2);