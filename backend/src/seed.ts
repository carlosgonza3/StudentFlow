import dotenv from "dotenv"
import mongoose from "mongoose"
import { Student } from "./models/Student.js"

dotenv.config()

const students = [
    { id: "S1", name: "Alice Johnson", creditsCompleted: 30 },
    { id: "S2", name: "Brian Smith", creditsCompleted: 45 },
    { id: "S3", name: "Carla Gomez", creditsCompleted: 60 },
    { id: "S4", name: "David Lee", creditsCompleted: 15 },
    { id: "S5", name: "Emma Brown", creditsCompleted: 75 },
]

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("MongoDB connected for seeding")

        await Student.deleteMany({})
        console.log("Existing students removed")

        await Student.insertMany(students)
        console.log("Sample students inserted successfully")

        await mongoose.disconnect()
        console.log("MongoDB disconnected")
    } catch (error) {
        console.error("Seeding error:", error)
        process.exit(1)
    }
}

seedDatabase()