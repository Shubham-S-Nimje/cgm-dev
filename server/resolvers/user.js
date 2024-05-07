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
    getUser: async () => {
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

      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return {
            success: false,
            message: "User with this email already exists",
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

        await newUser.save();

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

      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        const token = jwt.sign(
          { email: email },
          process.env.JWT_SECRET_KEY_USER,
          { expiresIn: "1d" }
        );

        return { token };
      } catch (error) {
        console.error("Error signing in user:", error);
        throw new Error("Could not sign in user");
      }
    },

    UserFollow: async (_, args) => {
      const { email } = args.input;

      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("User not found");
        }

        user.follows += 1;
        await user.save();

        return {
          success: true,
          message: "User follows updated successfully",
        };
      } catch (error) {
        console.error("Error updating user follows:", error);
        return {
          success: false,
          message: "Could not update user follows",
        };
      }
    },
  },
};
