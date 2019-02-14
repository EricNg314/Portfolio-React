'use strict';
let AWS = require("aws-sdk");
let axios = require('axios');
let config = require('./config.json');

AWS.config.update({
  region: config.aws.region
});
let SES = new AWS.SES();

module.exports.sendContactForm = async (event, context) => {
  let parsed;
  let fnComplete = false;

  try {
    parsed = event.body;
  } catch (err) {
    console.error(`Failed to parse JSON ${event.body}: ${err.stack}`);
    console.error(`User Input:`);
    for (let key in event.body) {
      console.error(`key: ${key}, value: ${event.body[key]}`)
    }
    return {
      statusCode: 500,
      error: `Could not parse JSON.`
    };
  }

  // Validating variables information
  let formInfo = {
    formName: parsed.name,
    formEmail: parsed.email,
    formTypeOfProfOther: parsed.typeOfProfOther,
    formTypeOfProf: parsed.typeOfProf,
    formMessage: parsed.message
  }

  if (formInfo.formTypeOfProfOther !== '') {
    formInfo.formTypeOfProf = '__other_option__';
  }

  // Validating recaptcha from client.
  if (parsed['recaptcha']) {
    try {
      const reCapUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CONTACT_FORM_RECAPTCHA_KEY}&response=${parsed['recaptcha']}`;

      let verifyResult = await axios.post(reCapUrl);
      let sesResult = "";
      // reCaptcha responds with object key "success" as true or false. If true send an email.
      if (verifyResult.data["success"] === true) {
        console.log("reCaptcha valid");
        sesResult = await sendSES(formInfo);
        console.log(`result of sesSend: ${sesResult}`);
      } else {
        console.error("captcha validation failed");
        console.error(`reCaptcha Error Response: ${verifyResult.data['error-codes'].toString()}`);
        return {
          statusCode: 400,
          error: `Captcha Validation Failed`
        }
      }

      // Sending user's input to myself.
      let sesUserMsgResult = "";
      if (sesResult === true) {
        console.log("reCaptcha valid");
        sesUserMsgResult = await sendMsgInfoSES(formInfo);
        console.log(`result of sesUserMsgResult: ${sesUserMsgResult}`);
        fnComplete = true;
      } else {
        console.error("ERROR: Failed to send email to user or self.");
        return {
          statusCode: 400,
          error: `Email failed to send.`
        }
      }
    } catch (err) {
      return {
        statusCode: 400,
        error: `Invalid Captcha Response`
      }
    }
  } else {
    console.error(`Missing captcha response from client.`)
    return {
      statusCode: 400,
      error: `Missing Captcha Response`
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: {
      success: fnComplete,
      message: 'Confirmed validation and sent information.'
    }
  };
};

function sendSES(formData) {
  console.log("entered SES sendSES function");

  let params = contactParams(formData)
  let sendEmail = SES.sendEmail(params).promise();
  let confirmation = sendEmail.then(data => {
      console.log("email submitted to SES", data);
      return true;
    })
    .catch(error => {
      console.log("email failed to submit");
      console.log(error);
      return false;
    });

  return confirmation;
}
function sendMsgInfoSES(formData) {
  console.log("entered SES sendMsgInfoSES function");

  let params = contactUserMsgParams(formData)
  let sendEmail = SES.sendEmail(params).promise();
  let confirmation = sendEmail.then(data => {
      console.log("email submitted to SES", data);
      return true;
    })
    .catch(error => {
      console.log("email failed to submit");
      console.log(error);
      return false;
    });

  return confirmation;
}

function contactParams(formData) {
  const msgResponse = {
    subject: 'Contact form submitted.',
    html: `<!DOCTYPE html>
    <html><body>
      <h3>Hello ${formData.formName},</h3>
      <p>Thank you for trying to reach me through my contact form. Please allow up to 48 hours for me to respond regarding your message.</p>
      <br> 
      <p style='color:red'>If you did not fill out the contact form at eric-ng.io, you may disregard this email and my follow up. Sorry for the inconvenience.</p>
    </body></html>`,
    text: `Hello ${formData.formName}, Thank you for trying to reach me through my contact form. Please allow up to 48 hours for me to respond regarding your message. If you did not fill out the contact form at eric-ng.io, you may disregard this email and my follow up. Sorry for the inconvenience.`
  }

  let params = {
    Destination: {
      ToAddresses: [formData.formEmail],
      BccAddresses: config.contactFormEmailParams.BccAddresses
    },
    ReplyToAddresses: config.contactFormEmailParams.ReplyToAddresses,
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: msgResponse.html
        },
        Text: {
          Charset: "UTF-8",
          Data: msgResponse.text
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: msgResponse.subject
      }
    },
    Source: config.contactFormEmailParams.Source
  };

  return params;
}

// Function to send email as text only without formats to self only.
function contactUserMsgParams(formData) {
  var userInfo = JSON.stringify(formData)

  const msgResponse = {
    subject: `Contact form submitted. User message.`,
    text: userInfo
  }

  let params = {
    Destination: {
      ToAddresses: config.contactFormEmailParams.myEmails
    },
    ReplyToAddresses: [formData.formEmail],
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: msgResponse.text
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: msgResponse.subject
      }
    },
    Source: config.contactFormEmailParams.Source
  };

  return params;
}
