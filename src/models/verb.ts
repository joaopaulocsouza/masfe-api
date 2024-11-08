// import generateId from "@utils/generateId/generateId"
// import { VerbProps } from "src/types/verbProps"
// import pool from "../config/db"

// // Funções CRUD
// const createVerb = async (userData: VerbProps) => {
//   const { dimension, garret, user_id, verb } = userData;
//   const id = generateId()
//   const result = await pool.query(
//     'INSERT INTO verb ("dimension", "garret", "user_id", "verb", "id") VALUES ($1, $2, $3, $4, $5) RETURNING *',
//     [dimension, garret, user_id, verb, id]
//   );
//   return result.rows[0];
// };

// const getAllVerbs = async () => {
//     const result = await pool.query('SELECT * FROM verb');
//     return result.rows;
// };

// const getVerbById = async (id: string) => {
//   const result = await pool.query('SELECT * FROM verb WHERE "id" = $1', [id]);
//   return result.rows[0];
// };

// // const updateUser = async (id: string, userData: UserProps) => {
// //   const { name, email, password, photo, gender, occupation, endereco, birthday } = userData;
// //   const result = await pool.query(
// //     'UPDATE users SET "name" = $1, "email" = $2, "password" = $3, "photo" = $4, "gender" = $5, "occupation" = $6, "endereco" = $7, "birthday" = $8 WHERE "id" = $9 RETURNING *',
// //     [name, email, password, photo, gender, occupation, endereco, birthday, id]
// //   );
// //   return result.rows[0];
// // };

// const deleteVerb = async (id: string) => {
//   const result = await pool.query('DELETE FROM verb WHERE "id" = $1 RETURNING *', [id]);
//   return result.rows[0];
// };

// export default {  createVerb, deleteVerb, getAllVerbs, getVerbById }
