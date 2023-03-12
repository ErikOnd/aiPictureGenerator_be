import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const { prompt, n, size } = req.body;

  try {
    console.log("req.body", req.body);
    const response = await openai.createImage({
      prompt,
      n,
      size,
    });

    res.status(200).json({
      success: true,
      data: response.data.data,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(400).json({
      success: false,
      error: "The image could not be generated",
    });
  }
};

export default generateImage;
