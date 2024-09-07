export const todosTable = `CREATE TABLE IF NOT EXISTS todos(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(200),
description VARCHAR(200),
status INT
);`;
