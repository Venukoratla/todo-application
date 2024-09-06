export const usersTable = `CREATE TABLE IF NOT EXISTS users(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(200),
email VARCHAR(200),
mobile_no VARCHAR(200),
password VARCHAR(200)
);`;
