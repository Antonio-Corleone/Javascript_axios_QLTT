function Validation() {
  //Kiểm tra rỗng
  this.checkEmpty = function (value, message, spanID) {
    if (value.trim() != '') {
      document.getElementById(spanID).innerHTML = '';
      document.getElementById(spanID).style.display = 'none';
      return true;
    }
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = 'block';
    return false;
  };
  //Kiểm tra định dạng tên User
  this.checkName = function (value, message, spanID) {
    let pattern = '^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$';
    let reg = new RegExp(pattern);
    if (reg.test(value)) {
      document.getElementById(spanID).innerHTML = '';
      document.getElementById(spanID).style.display = 'none';
      return true;
    }
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = 'block';
    return false;
  };
  //Kiểm tra định dạng mail
  this.checkEmail = function (value, message, spanID) {
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(pattern)) {
      document.getElementById(spanID).innerHTML = '';
      document.getElementById(spanID).style.display = 'none';
      return true;
    }
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = 'block';
    return false;
  };
  //Kiểm tra định dạng mật khẩu
  this.checkPass = function (value, message, spanID) {
    let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/;
    if (value.match(pattern)) {
      document.getElementById(spanID).innerHTML = '';
      document.getElementById(spanID).style.display = 'none';
      return true;
    }
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = 'block';
    return false;
  }
  //Check selected
  this.checkSelected = function (selectID, message, spanID) {
    if (document.getElementById(selectID).selectedIndex != 0) {
      document.getElementById(spanID).innerHTML = '';
      document.getElementById(spanID).style.display = 'none';
      return true;
    }
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = 'block';
    return false;
  }
  //Kiểm tra định dạng mô tả
  this.checkDescription = function (value, message, spanID) {
    let pattern = /^[a-zA-Z,.].{5,60}$/
    if (value.match(pattern)) {
      document.getElementById(spanID).innerHTML = '';
      document.getElementById(spanID).style.display = 'none';
      return true;
    }
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = 'block';
    return false;
  }
}