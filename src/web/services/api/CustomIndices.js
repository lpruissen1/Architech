import axios from 'axios';

export default
{
  GetIndex(id) {
    return axios.get(`http://localhost:8081/api/v1/index/${id}`)
      .then((response) => response.data);
  },
};
