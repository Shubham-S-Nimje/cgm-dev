const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

const server = new ApolloServer({
  typeDefs: `
    type User {
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
      UserSignup(input: UserSignup!): AuthPayload!
      UserSignin(input: UserSignin!): AuthPayload!
    }
  `,
  resolvers: {
    Query: {
      getUsers: async () => {
        try {
          const users = await User.find();
          return users;
        } catch (error) {
          console.error("Error fetching users:", error);
          throw new Error("Could not fetch users");
        }
      },
    },
    Mutation: {
      UserSignup: async (_, args) => {
        const { fname, lname, email, password, pnumber, username } = args.input;

        // console.log(fname, lname, email, password, pnumber, username);

        try {
          // Check if the user already exists
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return {
              success: false,
              message: "Could not create user",
            };
          }

          //hash password
          const hashedPassword = await bcrypt.hash(password, 10);

          // Create a new user
          const newUser = new User({
            fname,
            lname,
            email,
            password: hashedPassword,
            pnumber,
            username,
            follows: 0,
            followers: 0,
          });

          const savedUser = await newUser.save();

          return {
            token: email,
          };
        } catch (error) {
          console.error("Error creating user:", error);
          return email;
        }
      },

      UserSignin: async (_, args) => {
        const { email, password } = args.input;
        // console.log(email, password);

        try {
          const user = await User.findOne({ email });

          // console.log(user);

          if (!user) {
            throw new Error("Invalid email, User not found");
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);
          // console.log(isPasswordValid);

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          const token = jwt.sign(
            { email: email },
            process.env.JWT_SECRET_KEY_USER,
            { expiresIn: "1d" }
          );

          // console.log(token);

          return { token };
        } catch (error) {
          console.error("Error signing in user:", error);
          throw new Error("Could not sign in user");
        }
      },
    },
  },
});

const startServer = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
      optionsSuccessStatus: 204,
    })
  );

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  mongoose
    .connect(
      "mongodb+srv://shubhamsnimje:uNeZ5i4DjedHqzVy@cluster-cgm-dev.svrlgl5.mongodb.net"
    )
    .then(() => {
      console.log("Mongoose Connected");
      app.listen(4000, () => console.log("Server Started at PORT 4000"));
    })
    .catch((err) => {
      console.error("Mongoose Connection Error:", err);
    });
};

startServer();
