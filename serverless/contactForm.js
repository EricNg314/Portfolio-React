'use strict';
// const http = require('http');
const axios = require('axios');

module.exports.sendContactForm = async (event, context) => {

  const CONTACT_FORM_URL = process.env.CONTACT_FORM_URL;

  let parsed;

  try {
    parsed = JSON.parse(event.body);
  } catch (err) {
    console.error(`Failed to parse JSON ${event.body}: ${err.stack}`);
    return {
      statusCode: 500,
      error: `Could not parse JSON.`
    };
  };

  async function sendForm() {
    // Validating variables information
    const formName = parsed.name;
    const formEmail = parsed.email;
    let formTypeOfProfOther = parsed.typeOfProfOther;
    let formTypeOfProf = parsed.typeOfProf;
    const formMessage = parsed.message;

    if (formTypeOfProfOther !== '') {
      formTypeOfProf = '__other_option__'
    };

    // Creating form object to be posted.
    let formData = {};
    formData[process.env.CONTACT_FORM_NAME_KEY] = formName;
    formData[process.env.CONTACT_FORM_EMAIL_KEY] = formEmail;
    formData[process.env.CONTACT_FORM_TYPEOFPROFESSION_OTHER_KEY] = formTypeOfProfOther;
    formData[process.env.CONTACT_FORM_TYPEOFPROFESSION_KEY] = formTypeOfProf;
    formData[process.env.CONTACT_FORM_MESSAGE_KEY] = formMessage;

    try {
      // TODO: Fix post of form.
      console.log(`FormData: ${formData.toString()}`)
      let postFormRes = await axios.post(CONTACT_FORM_URL, formData);

      console.log(`StatusCode: ${postFormRes.status}`)

    } catch (err) {
      console.error("Post error:")
      console.error(err)
      return {
        statusCode: 400,
        error: `Invalid Captcha Response`
      }
    }
  }


  // Validating recaptcha from client.
  if (parsed['recaptcha']) {
    try {
      const reCapUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CONTACT_FORM_RECAPTCHA_KEY}&response=${parsed['recaptcha']}`;

      let verifyResult = await axios.post(reCapUrl);

      // reCaptcha response with object key "success" as true or false.
      if (verifyResult.data["success"] === true) {
        console.log("captcha valid");
        sendForm();
      } else {
        console.error("captcha failed validation");
        console.error(`reCaptcha Error Response: ${verifyResult.data['error-codes'].toString()}`);
      }

    } catch (err) {
      return {
        statusCode: 400,
        error: `Invalid Captcha Response`
      }
    }
  }


  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      // message: 'To Be Continued.'
      message: parsed
    }),
  };
};