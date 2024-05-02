export const typeDefs = ` type User {
  id: ID!
  fname: String!
  lname: String!
  email: String!
  password: String!
  pnumber: Int!
  username: String!
  follows: Int!
  followers: Int!
}

input UserSignup {
  fname: String!
  lname: String!
  email: String!
  password: String!
  pnumber: Int!
  username: String!
}

input UserSignin {
  email: String!
  password: String!
}

type AuthPayload {
  token: String!
}

type Query {
  getUsers: [User]
}

type Mutation {
  UserSignup(input: UserSignup!): User
  UserSignin(input: UserSignin!): User
}
`;
