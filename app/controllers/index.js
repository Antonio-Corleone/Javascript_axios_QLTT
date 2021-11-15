var service = new getListUserApi();

function getELE(id) {
  return document.getElementById(id);
}

//Lấy thông tin User từ API
function getUserInfo() {
  service.getListUser()
    .then(function (result) {
      // console.log(result.data)
      renderData(result.data);
    })
    .catch(function (error) {
      console.log(error)
    })
}

//Hiện thị thông tin User lên giao diện
function renderData(data) {
  var htmls = '';
  data.forEach(function (user, index) {
    htmls += `<tr>
      <td>${index + 1}</td>
      <td>${user.taiKhoan}</td>
      <td>${user.matKhau}</td>
      <td>${user.hoTen}</td>
      <td>${user.email}</td>
      <td>${user.ngonNgu}</td>
      <td>${user.loaiND}</td>
      <td>
        <button class="btn btn-danger" onclick="deleteUser(${user.id})">Xóa</button>
        <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="viewUserModal(${user.id})">Chỉnh sửa</button>
      </td>
    </tr>`
  });
  // console.log(htmls);
  getELE("tblDanhSachNguoiDung").innerHTML = htmls;
}
getUserInfo();

//Xóa User
function deleteUser(id) {
  service.deleteUserApi(id)
    .then(function (result) {
      console.log(result);
      alert('Xóa thành công');
      getUserInfo();
    })
    .catch(function (error) {
      console.log(error);
    })
}
//Thêm User
function addUserModal() {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm người dùng";
  let btnAddModal = `<button class="btn btn-success" onclick="addListUser()">Thêm</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAddModal;
}

function addListUser() {
  console.log('Added')
  var taiKhoan = getELE("TaiKhoan").value;
  var hoTen = getELE("HoTen").value;
  var matKhau = getELE("MatKhau").value;
  var email = getELE("Email").value;
  var loaiND = getELE("loaiNguoiDung").value;
  var ngonNgu = getELE("loaiNgonNgu").value;
  var moTa = getELE("MoTa").value;
  var hinhAnh = getELE("HinhAnh").value;
  let user = new User('', taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);
  console.log(user)
  service.addUserApi(user)
    .then(function (result) {
      console.log(result)
      document.getElementsByClassName("close")[0].click();
      alert('Thêm thành công');
      getUserInfo();
    })
    .catch(function (error) {
      console.log(error)
    })
}

//Xem thông tin User
function viewUserModal(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Cập nhật thông tin";
  service.viewUserApi(id)
    .then(function (result) {
      // console.log(result.data)
      getELE("TaiKhoan").value = result.data.taiKhoan;
      getELE("HoTen").value = result.data.hoTen;
      getELE("MatKhau").value = result.data.matKhau;
      getELE("Email").value = result.data.email;
      getELE("loaiNguoiDung").value = result.data.loaiND;
      getELE("loaiNgonNgu").value = result.data.ngonNgu;
      getELE("MoTa").value = result.data.moTa;
      getELE("HinhAnh").value = result.data.hinhAnh;
    })
    .catch(function (error) {
      console.log(error)
    })
  let btnUpdateModal = `<button class="btn btn-info" onclick="updateListUser(${id})">Cập nhật</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdateModal;
}
//Cập nhật thông tin User
function updateListUser(id) {
  var taiKhoan = getELE("TaiKhoan").value;
  var hoTen = getELE("HoTen").value;
  var matKhau = getELE("MatKhau").value;
  var email = getELE("Email").value;
  var loaiND = getELE("loaiNguoiDung").value;
  var ngonNgu = getELE("loaiNgonNgu").value;
  var moTa = getELE("MoTa").value;
  var hinhAnh = getELE("HinhAnh").value;
  let user = new User(id, taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);
  
  service.updateUserApi(user)
    .then(function (result) {
      console.log(result);
      alert('Cập nhật thành công');
      document.getElementsByClassName("close")[0].click();
      getUserInfo();
    })
    .catch(function (error) {
      console.log(error);
    })
}