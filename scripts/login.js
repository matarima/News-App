'use strict'

// Lấy tham chiếu đến các HTML element
const btnSubmit = document.getElementById('btn-submit');
const userInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');

// Key để lấy thông tin về mảng người dùng từ localStorage
const KEY = "USER_ARRAY";
// Lấy mảng người dùng từ localStorage
let userArr = getFromStorage(KEY , []);

// Hàm kiểm tra xem các trường dữ liệu có rỗng hay không. Nếu rỗng, trả về thông báo lỗi
function validateLogin(username , password) {
    if (!username || !password) {
        return "Vui lòng không để trường hợp nào trống";
    }
    return null;
}

// Hàm kiểm tra thông tin đăng nhập. Nếu đúng, trả về thông tin người dùng, ngược lại thì trả về null
function checkLogin(username, password, users) {
    return users.find((user) => user.username === username && user.password === password);
}

// Sự kiện click cho nút submit
btnSubmit.addEventListener('click', (e) => {
    // Ngăn chặn trình duyệt gửi form
    e.preventDefault();

    // Lấy dữ liệu từ form
    const username = userInput.value;
    const password = passwordInput.value;

    // Kiểm tra các trường có rỗng hay không
    const validateError = validateLogin(username, password);
    if (validateError) {
        alert(validateError);
        return;
    }    

    // Kiểm tra thông tin đăng nhập
    const currentUser = checkLogin(username, password, userArr)

    if (!currentUser) {
        alert("Tên đăng nhập hoặc mật khẩu không đúng!")
    } else {
        // Nếu thông tin đăng nhập chính xác, lưu thông tin người dùng hiện tại vào localStorage
        saveToStorage("CURRENT_USER", currentUser);
        // Chuyển hướng đến trang chủ
        window.location.href = '../index.html';
    }
});