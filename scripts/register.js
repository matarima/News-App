'use strict'

// Lấy tham chiếu đến các HTML element
const btnSubmit = document.getElementById('btn-submit');
const inputFirstName = document.getElementById('input-firstname');
const inputLastName = document.getElementById('input-lastname');
const inputUsername = document.getElementById('input-username');
const inputPassword = document.getElementById('input-password');
const inputConfirmPassword = document.getElementById('input-password-confirm');

// Key để lấy mảng người dùng từ localStorage
const KEY = "USER_ARRAY";

// Lấy người dùng từ localStorage
let userArr = getFromStorage(KEY , []);

// Kiểm tra các trường nhập liệu
function validate(firstName, lastName, username, password, confirmPassword){
    if (!firstName || !lastName || !username || !password || !confirmPassword) {
        return "Vui lòng không để trường trống";
    }
    if (userArr.find(user => user.username === username)) {
        return "Người dùng đã tồn tại";
    }
    if (password != confirmPassword) {
        return "Mật khẩu và mật khẩu xác nhận không trừng khớp";
    }
    if (password.length < 8) {
        return "Mật khẩu phải chứa ít nhất 8 kí tự";
    }
    return null;
}

// Chuyển đổi dữ liệu thành đối tượng User
function parseUser(userData) {
    const user = new User(userData.firstname, userData.lastname, userData.username, userData.password);
    return user;
}

// Sự kiện nhấp nút đăng ký
btnSubmit.addEventListener('click', (e) => {
    // Ngăn chặn trình duyệt gửi form
    e.preventDefault();
    
    // Lấy dữ liệu từ các trường form
    const firstName = inputFirstName.value;
    const lastName = inputLastName.value;
    const username = inputUsername.value;
    const password = inputPassword.value;
    const confirmPassword = inputConfirmPassword.value;
  
    // Kiểm tra dữ liệu nhập vào form
    const validationError = validate(firstName, lastName, username, password, confirmPassword);
  
    if (validationError) {
      // Nếu có lỗi xảy ra trong quá trình kiểm tra, hiển thị thông báo lỗi
      alert(validationError);
      return;
    }
    
    // Tạo đối tượng người dùng mới và thêm vào mảng người dùng
    const user = new User(firstName, lastName, username, password);
    userArr.push(user);
  
    // Sử dụng hàm saveToStorage đã được cung cấp
    saveToStorage("USER_ARRAY", userArr);
    // Chuyển hướng người dùng đến trang đăng nhập
    window.location.href = '../pages/login.html';
});