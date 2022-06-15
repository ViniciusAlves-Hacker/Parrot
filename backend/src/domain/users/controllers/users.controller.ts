import { Request, Response } from "express";
import { userService } from "../services";

export const UserController = {

  async login(req: Request, res: Response) {
    try {
      const accessToken = await userService.loginUser(req.body);

      if(!accessToken){
        return res.status(401).json("E-mail ou senha inválido, verifique e tente novamente");
      }
      return res.status(200).json(accessToken);
    } catch (error) {

      return res.status(500).json(error);
    }
  },

  async create(req: Request, res: Response) {
    try {
      const newUser = await userService.registerUser(req.body);
      return res.status(201).json(newUser);
    } catch (error) {

      return res.status(500).json(error);
    }
  },
  
  async update(req: Request, res: Response) {
    try {
      const alteredUser = await userService.alterUser(req.body, req.params);
      return res.status(200).json(alteredUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  async delete(req: Request, res: Response) {
    try {      
      await userService.excludeUser(req.params);
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  async getAll(req: Request, res: Response) {
    try {
      const users = await userService.allUsers();
      return res.json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  async getOne(req: Request, res: Response) {
    try {
      const user = await userService.oneUser(req.params);
      return res.json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};