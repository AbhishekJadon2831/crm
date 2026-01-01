import { configDotenv } from "dotenv";
import express from "express"
import cors from "cors"
import StudentsModel from "./schema.js";
import connectDB from "./db.js";
import jwt from "jsonwebtoken"
import TaskModel from "./Dashboard.js";
import LeadModel from "./LeadSchema.js";
import PipelineModel from "./pipelineSchema.js";
import TaskModel1 from "./task.js";

configDotenv()
console.log(process.env.MONGO_DB);
connectDB()



const app = express()
app.use(cors());


app.use(express.json())




app.post("/register", async (req, res) => {
  try {
    const { name, workEmail, password, confirmpassword } = req.body;




    const newUser = StudentsModel.create({ name, workEmail, password, confirmpassword })




    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRPT_KEY,
      { expiresIn: "1h" }
    )

    return res.json({
      message: "User registered successfully",
      user: { email: newUser.email },
      token,
    });

  }
  catch (error) {
    console.log(error);

  }




})


app.post("/task", async (req, res) => {
  const { name1, date, priority, company } = req.body;
  try {
    const task = TaskModel.create({ name1, date, priority, company })




    return res.status(200).json({ message: "task added" })
  } catch (error) {
    res.status(500).json({ message: error.message })

  }

})


app.get("/item", async (req, res) => {

  try {
    const item = await TaskModel.find();
    res.json(item)

  } catch (error) {
    res.status(500).json({ message: error.message });

  }

})



app.post("/lead", async (req, res) => {
  const { fullname, email, number, linkdin, status } = req.body;
  // console.log(fullname, email, number, linkdin, status);


  const Lead = LeadModel.create({ fullname, email, number, linkdin, status })

  return res.status(200).json({ message: "Lead added" })


})


app.get("/item3", async (req, res) => {
  try {
    const item1 = await LeadModel.find();
    res.json(item1);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});







app.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(id);

  const { name1, date, priority, company } = req.body;
  console.log(name1, date, priority, company);


  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { name1, date, priority, company },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



app.post("/pipeline", async (req, res) => {
  const { name, value, stage, company } = req.body;

  const pipeline = await PipelineModel.create({ name, value, stage, company })

  res.status(200).json({ message: "add Pipeline" })
})


app.get("/api/pipeline", async (req, res) => {
  try {
    const data = await PipelineModel.find()
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


app.post("/api/task", async (req, res) => {
  const { name1,task,secondtask, date, priority, discription } = req.body;
  console.log(name1, date, priority, discription);


  const result = TaskModel1.create({ name1,task,secondtask, date, priority, discription })

  res.status(200).json({ message: "task add" })
})

app.get("/api/data/item", async (req, res) => {
  try {
    const itemData =await TaskModel1.find()

    res.json( itemData )

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

})



app.post("/login", async (req, res) => {
  const { workEmail, password } = req.body
  const user1 = await StudentsModel.findOne({ workEmail });


  const token = jwt.sign(
    { userId: user1._id, name: user1.name, workEmail: user1.workEmail },
    process.env.JWT_SECRPT_KEY,
    { expiresIn: "1h" }
  )

  return res.status(200).json({ token, user1 });


})




app.listen(3000, () => {
  console.log("server is on http://localhost:3000");
});