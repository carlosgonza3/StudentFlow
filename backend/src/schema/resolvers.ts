import { Student } from "../models/Student.js";

type AddStudentArgs = {
    id: string;
    name: string;
    creditsCompleted: number;
};

type GetStudentArgs = {
    id: string;
};

export const resolvers = {
    Query: {
        students: async () => {
            return await Student.find();
        },

        student: async (_parent: unknown, args: GetStudentArgs) => {
            return await Student.findOne({ id: args.id });
        },
    },

    Mutation: {
        addStudent: async (_parent: unknown, args: AddStudentArgs) => {
            const existingStudent = await Student.findOne({ id: args.id });

            if (existingStudent) {
                throw new Error("Student ID already exists");
            }

            const student = await Student.create({
                id: args.id,
                name: args.name,
                creditsCompleted: args.creditsCompleted,
            });

            return student;
        },
    },
};