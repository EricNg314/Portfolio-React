const axios = require('axios');

export function getAllProjects(){
  return axios.get('api/projects/all')
};






