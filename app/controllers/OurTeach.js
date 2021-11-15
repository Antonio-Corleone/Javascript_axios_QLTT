var service = new getListUserApi();

function getELE(id){
  return document.getElementById(id);
}

//Lấy thông tin GV từ API
function getUserInfo() {
  service.getListUser()
    .then(function(result){
      // console.log(result.data)
      renderData(result.data);
    })
    .catch(function(error){
      console.log(error)
    })
}

//Hiện thị thông tin GV lên giao diện
function renderData(data){
  var htmls = '';
  data.forEach(function(user){
    //Kiểm loại người dùng có phải là GV không
    if (user.loaiND == "GV"){
      htmls += `
    <div class="col-12 col-sm-6 col-lg-3 p-4">
      <div class="people__card">
        <div class="card-img">
          <img src="../../assets/img/${user.hinhAnh}" alt="${user.hinhAnh}" />
        </div>
        <div class="card-text">
          <span>${user.ngonNgu}</span>
          <h2>${user.hoTen}</h2>
          <p>
          ${user.moTa}
          </p>
        </div>
      </div>
    </div>`
    }
    // else{
    //   console.log('Khong tim thay GV')
    // }
  });
  getELE("ourTeach").innerHTML = htmls;
}
getUserInfo();


