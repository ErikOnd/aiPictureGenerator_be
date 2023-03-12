import express from "express";
import generateImage from "../controllers/openAiController.js";
const openAiRouter = express.Router();

openAiRouter.post("/generateImage", generateImage);

export default openAiRouter;
