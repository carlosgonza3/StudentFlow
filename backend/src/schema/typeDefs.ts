export const typeDefs = `#graphql
  type Student {
    id: ID!
    name: String!
    creditsCompleted: Int!
  }

  type Query {
    students: [Student!]!
    student(id: ID!): Student
  }

  type Mutation {
    addStudent(
      id: ID!
      name: String!
      creditsCompleted: Int!
    ): Student!
  }
`;