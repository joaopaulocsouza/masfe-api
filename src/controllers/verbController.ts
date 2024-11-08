// import { Request, Response } from "express";
// import Verb from '@models/verb'

// const createVerb = async (req: Request, res: Response) => {
//   try {
//     const newUser = await Verb.createVerb(req.body);
//     res.status(201).json(newUser);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };

// const getVerb = async (req: Request, res: Response) => {
//   const {id} = req.query

//   if(id){
//     try {
//       const user = await Verb.getVerbById(id.toString());
//       if (user) {
//         res.status(200).json(user);
//       } else {
//         res.status(404).json({ message: 'User not found' });
//       }
//     } catch (err: any) {
//       res.status(500).json({ error: err.message });
//     }
//   } else {
//     try {
//       const users = await Verb.getAllVerbs();
//       res.status(200).json(users);
//     } catch (err: any) {
//       res.status(500).json({ error: err.message });
//     }
//   }
// };

// // const updateUser = async (req: Request, res: Response) => {
// //   console.log(req.body)
// //   try {
// //     const updatedUser = await User.updateUser(req.body);
// //     if (updatedUser) {
// //       res.status(200).json(updatedUser);
// //     } else {
// //       res.status(404).json({ message: 'User not found' });
// //     }
// //   } catch (err: any) {
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// const deleteVerb = async (req: Request, res: Response) => {
//   const { id } = req.query
//   console.log(id)
//   if(!id){
//     res.status(404).json({ message: 'User not found' });
//   }
//   try {
//     const deletedVerb = await Verb.deleteVerb(id!.toString());
//     if (deletedVerb) {
//       res.status(200).json(deletedVerb);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export default {createVerb, deleteVerb, getVerb}
