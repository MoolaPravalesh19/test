const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");

createRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pro@2003",
});

let schema = connection.connect((err, result) => {
  if (err) console.log(err);
  console.log("Connected successfully");
  let createdatabase = "create database datainfo";
  connection.query(createdatabase, (err, result) => {
    if (err) throw err;
    console.log("Database created");
    connection.query("use datainfo", (err, result) => {
      const createTableQuery = `
      CREATE TABLE IF NOT EXISTS tabledata (
        id varchar(50)  PRIMARY KEY,username VARCHAR(50),email VARCHAR(50),password varchar(50))`;
      connection.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log("Table created");
        const insertQuery =
          "INSERT INTO tabledata(id,username,email,password) VALUES (?,?,?,?)";
        connection.query(insertQuery, createRandomUser(), (err, result) => {
          if (err) throw err;
          console.log(result);
        });
      });
    });
  });
});

module.exports = schema;

//module.exports = connection;
