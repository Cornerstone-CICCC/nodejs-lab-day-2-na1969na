import { Request, Response } from "express";
import UserModel from "../models/user.model";

class UserController {
  private userModel: UserModel;

  constructor(userModel: UserModel) {
    this.userModel = userModel;
  }

  async addUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, password, firstname, lastname } = req.body;
      const existingUser = await this.userModel.findByUsername(username);
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }
      const newUser = await this.userModel.create({
        username,
        password,
        firstname,
        lastname,
      });
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const user = await this.userModel.login(username, password);
      if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
      res.cookie("username", user.username, { httpOnly: true });
      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  logout(req: Request, res: Response): void {
    res.clearCookie("username");
    res.status(200).json({ message: "Logout successful" });
  }

  async getUserByUsername(req: Request, res: Response): Promise<void> {
    try {
      const { username } = req.cookies;
      if (!username) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const user = await this.userModel.findByUsername(username);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default UserController;
