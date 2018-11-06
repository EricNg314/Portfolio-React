'use strict';

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

  // Validating variables information
  const formName = parsed.name;
  const formEmail = parsed.email;
  let formTypeOfProfOther = parsed.typeOfProfOther;
  let formTypeOfProf = parsed.typeOfProf;
  const formMessage = parsed.message;

  if (formTypeOfProfOther !== ''){
    formTypeOfProf = '__other_option__'
  };

  console.log(formName);

  // Creating form object to be posted.
  let formData = {};
  formData[process.env.CONTACT_FORM_NAME_KEY] = formName;
  formData[process.env.CONTACT_FORM_EMAIL_KEY] = formEmail;
  formData[process.env.CONTACT_FORM_TYPEOFPROFESSION_OTHER_KEY] = formTypeOfProfOther;
  formData[process.env.CONTACT_FORM_TYPEOFPROFESSION_KEY] = formTypeOfProf;
  formData[process.env.CONTACT_FORM_MESSAGE_KEY] = formMessage;

  // TODO: Send HTTP Request.


  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      message: 'To Be Continued.'
    }),
  };
};

