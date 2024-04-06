const {OpenAI} = require("openai");
const asyncHandler = require("express-async-handler");

const openai = new OpenAI();

exports.get_image = asyncHandler(async (req, res, next) => {
  console.log("start of dalle"+ req.query.img_descript);
  const image_res = await openai.images.generate({
    model: "dall-e-3",
    prompt: req.query.img_descript,
    n: 1,
    size: "1024x1024",
  });
  console.log(image_res.data[0].url);
  //console.log("data:" + image_res.data[9]);
  //console.log("data.data[0]:" + image_res.data.data[0]);
  //console.log("data[0]:" + image_res.data[0]);
  image_url = image_res.data[0].url;
  res.send(image_url);

});

/*
const axios = require('axios');

//exports.getImage = (req, res, next) => {
    //const {amount, id, currency}= req.body; 

    //add headers
    const options = {
        method : 'POST',
        url: 'https://stablediffusionapi.com/api/v3/text2img',
        headers: {'Content-Type': 'application/json'}
    };

    const body = {
        key: "7ikSuuyuNEvEFQEMcaVXWbt5KrlRULnLOgysLdVNK2vdXfG82v6rNkyjsSGm",
        prompt: "ultra realistic close up portrait ((beautiful pale cyberpunk female with heavy black eyeliner))",
        negative_prompt: null,
        width: "512",
        height: "512",
        samples: "1",
        num_inference_steps: "20",
        seed: null,
        guidance_scale: 7.5,
        safety_checker: "yes",
        multi_lingual: "no",
        panorama: "no",
        self_attention: "no",
        upscale: "no",
        embeddings_model: null,
        webhook: null,
        track_id: null
    };

   axios.post('https://stablediffusionapi.com/api/v3/text2img', body, options)
      .then((response) => {
        //receive response
        console.log(response);
        res.status(200).json({ status: 'success' });

      })
      .catch((error) => {
        console.log(error)
      });
//}

//getImage();
*/