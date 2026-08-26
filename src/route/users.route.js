import { Router } from "express";
import * as userController from "../controller/users.controller.js";
import { validate, createUserRules, updateUserRules } from "../middleware/validate.js";
import { updateUser } from "../service/users.service.js";

const router = Router();


router.get("/", userController.getAllUsers);
router.get("/:id/", userController.getUserById);
router.post("/", validate(createUserRules), userController.createUser);
router.patch("/:id", validate(updateUserRules), userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;