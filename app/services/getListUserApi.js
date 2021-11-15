function getListUserApi () {
  this.getListUser = function(){
    return axios({
      url: 'https://6183caea91d76c00172d1b5f.mockapi.io/api/users',
      method: 'GET'
    });
  };
  this.deleteUserApi = function(id){
    return axios({
      url: `https://6183caea91d76c00172d1b5f.mockapi.io/api/users/${id}`,
      method: 'DELETE'
    });
  };
  this.addUserApi = function(user){
    return axios({
      url: 'https://6183caea91d76c00172d1b5f.mockapi.io/api/users',
      method: 'POST',
      data: user
    });
  };
  this.viewUserApi = function(id){
    return axios({
      url: `https://6183caea91d76c00172d1b5f.mockapi.io/api/users/${id}`,
      method: 'GET'
    });
  };
  this.updateUserApi = function(user){
    return axios({
      url: `https://6183caea91d76c00172d1b5f.mockapi.io/api/users/${user.id}`,
      method: 'PUT',
      data: user
    });
  };
}