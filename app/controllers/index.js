let service = new getListUserApi();
let validation = new Validation();

function getELE(id) {
  return document.getElementById(id);
}

//Lấy thông tin User từ API
function getUserInfo() {
  service.getListUser()
    .then(function (result) {
      renderData(result.data);
    })
    .catch(function (error) {
      console.log(error)
    })
}

//Hiện thị thông tin User lên giao diện
function renderData(data) {
  let htmls = '';
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
  let btnAddModal = `<button type="button" class="btn btn-success" onclick="addListUser()">Thêm</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAddModal;
  getELE('TaiKhoan').disabled = false;
  getELE('formQLTT').reset();
  resetSpan();
}

function addListUser() {
  let taiKhoan = getELE("TaiKhoan").value;
  let hoTen = getELE("HoTen").value;
  let matKhau = getELE("MatKhau").value;
  let email = getELE("Email").value;
  let loaiND = getELE("loaiNguoiDung").value;
  let ngonNgu = getELE("loaiNgonNgu").value;
  let moTa = getELE("MoTa").value;
  let hinhAnh = getELE("HinhAnh").value;
  // Validation
  service.getListUser()
  .then(function (result) {
    let isValid = true;
    isValid &= validation.checkEmpty(taiKhoan, 'Tài khoản không được để trống', 'tbTK') && validation.checkID(taiKhoan, 'Tài khoản không được trùng', 'tbTK', result.data);
    isValid &= validation.checkEmpty(hoTen, 'Họ tên không được để trống', 'tbTen') && validation.checkName(hoTen, 'Tên sai định dạng', 'tbTen');
    isValid &= validation.checkEmpty(matKhau, 'Mật khẩu không được để trống', 'tbMK') && validation.checkPass(matKhau, 'Mật khẩu sai định dạng', 'tbMK');
    isValid &= validation.checkEmpty(email, 'Email không được để trống', 'tbEmail') && validation.checkEmail(email, 'Email sai định dạng', 'tbEmail');
    isValid &= validation.checkEmpty(hinhAnh, 'Tên hình không được để trống', 'tbHinh');
    isValid &= validation.checkSelected('loaiNguoiDung', 'Phải chọn loại người dùng', 'tbLoaiND');
    isValid &= validation.checkSelected('loaiNgonNgu', 'Phải chọn loại ngôn ngữ', 'tbloaiNN');
    isValid &= validation.checkEmpty(moTa, 'Mô tả không được để trống', 'tbMT') && validation.checkDescription(moTa, 'Mô tả không được nhiều hơn 60 ký tự', 'tbMT');
    if (isValid) {
      let user = new User('', taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);
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
  })
  .catch(function (error) {
    console.log(error)
  })
}

//Xem thông tin User
function viewUserModal(id) {
  resetSpan();
  document.getElementsByClassName("modal-title")[0].innerHTML = "Cập nhật thông tin";
  let btnUpdateModal = `<button type="button" class="btn btn-info" onclick="updateListUser(${id})">Cập nhật</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdateModal;
  getELE("TaiKhoan").disabled = true;
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
}
//Cập nhật thông tin User
function updateListUser(id) {
  let taiKhoan = getELE("TaiKhoan").value;
  let hoTen = getELE("HoTen").value;
  let matKhau = getELE("MatKhau").value;
  let email = getELE("Email").value;
  let loaiND = getELE("loaiNguoiDung").value;
  let ngonNgu = getELE("loaiNgonNgu").value;
  let moTa = getELE("MoTa").value;
  let hinhAnh = getELE("HinhAnh").value;
  // Validation
  let isValid = true;
  isValid &= validation.checkEmpty(hoTen, 'Họ tên không được để trống', 'tbTen') && validation.checkName(hoTen, 'Tên sai định dạng', 'tbTen');
  isValid &= validation.checkEmpty(matKhau, 'Mật khẩu không được để trống', 'tbMK') && validation.checkPass(matKhau, 'Mật khẩu sai định dạng', 'tbMK');
  isValid &= validation.checkEmpty(email, 'Email không được để trống', 'tbEmail') && validation.checkEmail(email, 'Email sai định dạng', 'tbEmail');
  isValid &= validation.checkEmpty(hinhAnh, 'Tên hình không được để trống', 'tbHinh');
  isValid &= validation.checkSelected('loaiNguoiDung', 'Phải chọn loại người dùng', 'tbLoaiND');
  isValid &= validation.checkSelected('loaiNgonNgu', 'Phải chọn loại ngôn ngữ', 'tbloaiNN');
  isValid &= validation.checkEmpty(moTa, 'Mô tả không được để trống', 'tbMT') && validation.checkDescription(moTa, 'Mô tả không được nhiều hơn 60 ký tự', 'tbMT');
  if (isValid) {
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
}
//Tìm kiếm user theo tài khoản
function searchUser(tuKhoa) {
  service.getListUser()
  .then(function (result) {
    let mangTK = [];
    let tk = tuKhoa.trim().toLowerCase();
    result.data.map(function(user){
      let tenTK = user.taiKhoan.trim().toLowerCase();
      if (tenTK.includes(tk)){
        mangTK.push(user);
      }
    })
    renderData(mangTK);
  })
  .catch(function (error) {
    console.log(error)
  })
}
getELE("txtSearch").onkeyup = function(){
  var tuKhoa = getELE("txtSearch").value;
  searchUser(tuKhoa);
}
//Reset span thông báo
function resetSpan() {
  var x = document.querySelectorAll(".sp-thongbao");
  for (var i = 0; i < x.length; i++) {
    x[i].innerHTML = "";
    x[i].style.display = "none";
  }
}