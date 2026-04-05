import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import { connectDB } from "./config/db.js";
import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./schema/resolvers.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 4000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

async function startServer() {
    await connectDB();
    await server.start();

    app.use(cors());
    app.use(express.json());

    app.use("/graphql", expressMiddleware(server));

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/graphql`);
    });
}

startServer().catch((error) => {
    console.error("Server startup error:", error);
});