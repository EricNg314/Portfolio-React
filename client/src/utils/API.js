const axios = require('axios');

export function getAllProjects(){
  return axios.get('api/projects/all')
};

// Serverless function for temporary use while backend gets setup.
export function getAllProjectsAWS(){
  return axios.get( 'https://uwr1s5qnb4.execute-api.us-west-1.amazonaws.com/production/projects');

};

export function postContactForm(data){
  return axios.post('https://xhpo1xy1m3.execute-api.us-west-1.amazonaws.com/dev/projects/contact', data);
  // return axios.post('https://uwr1s5qnb4.execute-api.us-west-1.amazonaws.com/production/projects/contact', data);
}



