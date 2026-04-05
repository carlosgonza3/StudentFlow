import { gql } from "@apollo/client"

export const GET_STUDENTS = gql`
  query GetStudents {
    students {
      id
      name
      creditsCompleted
    }
  }
`

export const GET_STUDENT_BY_ID = gql`
  query GetStudentById($id: ID!) {
    student(id: $id) {
      id
      name
      creditsCompleted
    }
  }
`

export const ADD_STUDENT = gql`
  mutation AddStudent($id: ID!, $name: String!, $creditsCompleted: Int!) {
    addStudent(id: $id, name: $name, creditsCompleted: $creditsCompleted) {
      id
      name
      creditsCompleted
    }
  }
`