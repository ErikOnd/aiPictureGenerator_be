import express from "express";
import openaiRouter from "./routes/openAiRouter.js";
import cors from "cors";

const port = process.PORT || 5001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const whitelist = [process.env.FE_DEV_URL, process.env.FE_PROD_URL];
app.use(
  cors({
    origin: (currentOrigin, corsNext) => {
      if (!currentOrigin || whitelist.indexOf(currentOrigin) !== -1) {
        corsNext(null, true);
      } else {
        corsNext(
          console.log(`Origin ${currentOrigin} is not in the whitelist!`)
        );
      }
    },
  })
);

app.use("/openai", openaiRouter);

app.listen(port, () => console.log(`server started on port ${port}`));
