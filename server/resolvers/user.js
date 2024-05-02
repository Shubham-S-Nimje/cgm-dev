const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.usersResolvers = {
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
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return {
            success: false,
            message: "Could not create user",
          };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

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
          success: true,
          message: "User created successfully",
        };
      } catch (error) {
        console.error("Error creating user:", error);
        return {
          success: false,
          message: "Could not create user",
        };
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
};
