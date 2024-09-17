const pool = require("./pool");
const { v4: uuidv4 } = require("uuid");

const createId = () => {
  const generatedId = uuidv4();
  return generatedId;
};

const findAll = async (table) => {
  const data = await pool.query(`SELECT * FROM ${table}`);
  return data;
};

const findOne = async (table, column, value) => {
  const data = await pool.query(
    `SElECT * FROM ${table} WHERE ${column} = $1 `,
    [value]
  );
  return data;
};

const insertRecord = async (table, data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);

  const query = `INSERT INTO ${table} (${keys
    .map((key) => `"${key}"`)
    .join(", ")}) 
    VALUES (${values.map((_, index) => `$${index + 1}`).join(", ")})
    RETURNING *`;

  const newRecord = await pool.query(query, values);
  return newRecord.rows[0];
};

const updateRecord = async (table, data, column, value) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  values.push(value);

  const SET_CLAUSE = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  const updatedRecord = await pool.query(
    `UPDATE ${table} SET ${SET_CLAUSE} WHERE ${column} = $${
      keys.length + 1
    } RETURNING *`,
    values
  );

  return updatedRecord.rows[0];
};

const deleteRecord = async (table, column, value) => {
  const deletedRecord = await pool.query(
    `DELETE FROM ${table} WHERE ${column} = $1 RETURNING *`,
    [value]
  );

  return deletedRecord;
};

module.exports = {
  createId,
  findAll,
  findOne,
  insertRecord,
  updateRecord,
  deleteRecord,
};
