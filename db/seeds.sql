-- INSERT INTO department (name)
-- VALUES  ('finance'),
--         ('legal'),
--         ('sales'),
--         ('engineering');


-- INSERT INTO role (title, department_id, salary )
-- VALUES  ('accountant', 1, 1.2),
--         ('lawyer', 2, 3.0),
--         ('salesman', 3, 4.0),
--         ('software engineer', 4, 5.0 );



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Mark', 'Brown', 2, null),
        ('Laura', 'Nicholson', 1, 1),
        ('Jacob', 'Burns', 3, null),
        ('Kyron', 'Bonilla', 3, 3),
        ('Beth', 'Shannon', 4, null),
        ('Teddy', 'Brock', 4, 4),
        ('Kevin', 'Peck', 1, null),
        ('Betsy', 'Lawson', 2, 2);