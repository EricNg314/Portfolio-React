'use strict';

module.exports.sendContactForm = async (event, context) => {

  const CONTACT_FORM_URL = process.env.CONTACT_FORM_URL;

  let formData = {}
  formData[process.env.CONTACT_FORM_NAME_KEY] = 'Name'
  formData[process.env.CONTACT_FORM_EMAIL_KEY] = 'Email'
  formData[process.env.CONTACT_FORM_TYPEOFPROFESSION_KEY] = 'Type Of Profession'
  formData[process.env.CONTACT_FORM_TYPEOFPROFESSION_OTHER_KEY] = 'Type Of Profession Other'
  formData[process.env.CONTACT_FORM_MESSAGE_KEY] = 'Message'


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

