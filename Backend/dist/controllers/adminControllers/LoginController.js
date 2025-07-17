"use strict";
// import { Request, Response } from "express"
// import jwt from "jsonwebtoken";
// export const isAuthenticated = async (req: Request, res: Response) => {
//     try {
//         const token = req.cookies.jwt!
//         console.log("JWT TOKEN :", token)
//         const secret = process.env?.JWT_SECRET
//         if (!secret) {
//             return res.status(500).json({ success: false, error: 'Server misconfigured' });
//         }
//         const decode = jwt.verify(token, secret, (err: any, decoded: any) => {
//             console.log("decoded ", decoded)
//             if (decoded?.role !== 'admin') {
//                 return res.status(403).json({ message: "Access denied", success: false });
//             }
//             return res.json({ token, success: true })
//         })
//     } catch (error) {
//         console.log("Is Authentication failed ", error)
//     }
// }
