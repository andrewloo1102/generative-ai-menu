const {OpenAI} = require("openai");
const asyncHandler = require("express-async-handler");
const { get } = require("lodash");

//function to test if I'm having an issue parsing the JSON data
function tryParseJSONObject (jsonString){
    try {
        var o = JSON.parse(jsonString);
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }

    return false;
};

const openai = new OpenAI();

//Define Controller
// use chatGPT to generate 7 menu items and their description and return in JSON format

exports.menu = asyncHandler(async (req, res, next) => {

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: 'Your task is to generate a dinner menu based on "The Restaurant at the End of the Universe."'},
      { role: "user", content: 'Give 7 menu items and their description without the word "smashed."'}
    ],
    model: "gpt-3.5-turbo",
    functions: [
      {
        name: "tonightsMenu",
        parameters: {
          type: "object",
          properties: {
            menu_item1: {
              type: "string"
            },
            description1: {
              type: "string"
            },
            menu_item2: {
              type: "string"
            },
            description2: {
              type: "string"
            },
            menu_item3: {
              type: "string"
            },
            description3: {
              type: "string"
            },
            menu_item4: {
              type: "string"
            },
            description4: {
              type: "string"
            },
            menu_item5: {
              type: "string"
            },
            description5: {
              type: "string"
            },
            menu_item6: {
              type: "string"
            },
            description6: {
              type: "string"
            },
            menu_item7: {
              type: "string"
            },
            description7: {
              type: "string"
            }
          }
        }
      }
    ],
    function_call: {name: "tonightsMenu"}
  });

  // Define all the dalle_inputs 1 through 7
  const dalle_inputs1 = {
    model: "dall-e-3",
    n: 1,
    size: "1024x1024"
  }

  const dalle_inputs2 = {
    model: "dall-e-3",
    n: 1,
    size: "1024x1024"
  }
  const dalle_inputs3 = {
    model: "dall-e-3",
    n: 1,
    size: "1024x1024"
  }
  const dalle_inputs4 = {
    model: "dall-e-3",
    n: 1,
    size: "1024x1024"
  }
  const dalle_inputs5 = {
    model: "dall-e-3",
    n: 1,
    size: "1024x1024"
  }

  console.log(completion.choices[0].message.function_call.arguments);
  const openai_res = JSON.parse(completion.choices[0].message.function_call.arguments);
  console.log(tryParseJSONObject(completion.choices[0].message.function_call.arguments));

  dalle_inputs1.prompt = openai_res.menu_item1 + " - " + openai_res.description1;
  dalle_inputs2.prompt = openai_res.menu_item2 + " - " + openai_res.description2;
  dalle_inputs3.prompt = openai_res.menu_item3 + " - " + openai_res.description3;
  dalle_inputs4.prompt = openai_res.menu_item4 + " - " + openai_res.description4;
  dalle_inputs5.prompt = openai_res.menu_item5 + " - " + openai_res.description5;

  //get images from dalle
  const image_res1 = await openai.images.generate(dalle_inputs1);
  const image_res2 = await openai.images.generate(dalle_inputs2);
  const image_res3 = await openai.images.generate(dalle_inputs3);
  const image_res4 = await openai.images.generate(dalle_inputs4);
  const image_res5 = await openai.images.generate(dalle_inputs5);

  //define variable for image_url
  openai_res.image1 = String(image_res1.data[0].url);
  openai_res.image2 = String(image_res2.data[0].url);
  openai_res.image3 = String(image_res3.data[0].url);
  openai_res.image4 = String(image_res4.data[0].url);
  openai_res.image5 = String(image_res5.data[0].url);

  //send data

  res.send(JSON.stringify(openai_res));

  });