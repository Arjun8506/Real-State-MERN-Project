// import jwt from "jsonwebtoken"
// import User from "../models/user.model.js";
// import { errorHandler } from "../utils/errorHandler.js";

// const signedInUser = async (req, res, next)=>{
//     try {
//         const token = req.cookies.jwt;
//         if (!token) return next(errorHandler(400, "Unauthorised - Login First"))
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         if (!decoded || !decoded.userid) return next(errorHandler(401, "Invalid Token"))
//         const user = await User.findById(decoded?.userid).select("-password");
//         if (!user) return next(errorHandler(401, "User Not Found in protectRoute"))
//         req.user = user
//         next();
//     } catch (error) {
//         console.log("error in protectRoute component", error.message);
//         return res.status(500).json({error: "Internal Server Error!"})
//     }
// }

// export default signedInUser;