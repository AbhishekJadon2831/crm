
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import StudentsModel from "../models/Students.model.js";

export const register = async (req, res) => {
    try {
        const { name, lastname, workEmail, password, confirmpassword } = req.body;

        if (password !== confirmpassword) {
            return res.status(500).json({ message: "Password and Confirmpassword is not match" })
        }






        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = await StudentsModel.create({
            name,
            lastname,
            workEmail,
            password: hashedPassword,
            confirmpassword, hashedPassword
        });


        const token = jwt.sign(
            { userId: newUser._id },
            process.env.REFRESH_SECRPT_KEY,
            { expiresIn: "1h" }
        );


        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                lastname: newUser.lastname,
                workEmail: newUser.workEmail,
                profileImage: newUser.profileImage,
                role: newUser.role,
            },
            token,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
};



export const login = async (req, res) => {
    try {
        const { workEmail, password } = req.body;

        const user1 = await StudentsModel.findOne({ workEmail });
        if (!user1) {
            return res.status(400).json({ message: "User not found" });
        }


        const isMatch = await bcrypt.compare(password, user1.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Password" });
        }


        const token = jwt.sign(
            {
                userId: user1._id,
                name: user1.name,
                lastname: user1.lastname,
                workEmail: user1.workEmail,
                image1: user1.profileImage,
                role: user1.role
            },
            process.env.REFRESH_SECRPT_KEY,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user1._id,
                name: user1.name,
                workEmail: user1.workEmail,
                image1: user1.profileImage,


            },
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
};




export const ResetPass= async (req, res) => {
  const { workEmail, password, newPassword } = req.body

  console.log(workEmail, password, newPassword)


  const user = await StudentsModel.findOne({ workEmail })
  console.log(user.password, password)
  const checkPass = await bcrypt.compare(password, user.password)



  const hashpass2 = await bcrypt.hash(newPassword, 10)



  if (!checkPass) {
    return res.status(400).json({ message: "password is incorect" })
  }
  user.password = hashpass2

  await user.save()

  return res.status(200).json({ message: "chnage succesfull" })

}