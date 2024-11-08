// import generateId from "@utils/generateId/generateId";
// import { encrypt } from "@utils/hash/hash";
// import { UserProps } from "src/types/userProps"
// import pool from "../config/db"


// // Funções CRUD
// const createUser = async (userData: UserProps) => {
//   const { name, email, password, photo, gender, occupation, endereco, birthday } = userData;
//   const id = generateId()
//   const passwordEncrypted = await encrypt(password)
//   const result = await pool.query(
//     'INSERT INTO users ("name", "email", "password", "photo", "gender", "occupation", "endereco", "birthday", "id") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
//     [name, email, passwordEncrypted, photo, gender, occupation, endereco, birthday, id]
//   );
//   return result.rows[0];
// };

// const getAllUsers = async () => {
//     const result = await pool.query('SELECT * FROM users');
//     return result.rows;
// };

// const getUserById = async (id: string) => {
//   const result = await pool.query('SELECT * FROM users WHERE "id" = $1', [id]);
//   return result.rows[0];
// };

// const updateUser = async (userData: UserProps) => {
//   const { name, email, password, photo, gender, occupation, endereco, birthday, id } = userData;
//   const result = await pool.query(
//     'UPDATE users SET "name" = $1, "email" = $2, "password" = $3, "photo" = $4, "gender" = $5, "occupation" = $6, "endereco" = $7, "birthday" = $8 WHERE "id" = $9 RETURNING *',
//     [name, email, password, photo, gender, occupation, endereco, birthday, id]
//   );
//   return result.rows[0];
// };

// const deleteUser = async (id: string) => {
//   const result = await pool.query('DELETE FROM users WHERE "id" = $1 RETURNING *', [id]);
//   return result.rows[0];
// };

// export default { createUser, getAllUsers, getUserById, updateUser, deleteUser };
