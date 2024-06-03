'use strict'

// Lấy tham chiếu đến các HTML element
const loginModal = document.getElementById('login-modal');
const mainContent = document.getElementById('main-content');
const welcomeMessage = document.getElementById('welcome-message');
const logoutBtn = document.getElementById('btn-logout');
    
// Đặt các key được dùng trong localStorage 
const KEY = "CURRENT_USER";

window.onload = function() {
    // Hàm kiểm tra người dùng có đang đăng nhập hay không
    const isUserLoggedIn = function () {
        // Thử lấy thông tin người dùng từ localStorage
        let loggedInUser = getFromStorage(KEY , null);
        // Nếu thông tin người dùng tồn tại thì trả về true, nếu không trả về false.
        return loggedInUser !== null;
    }
    // Hàm lấy tên người dùng
    const getUserFirstName = function() {
        // Thử lấy thông tin người dùng từ localStorage
        let loggedInUser = getFromStorage(KEY , null);
        // Nếu thông tin người dùng tồn tại, trả về tên người dùng.
        return loggedInUser ? loggedInUser.firstName : 'Guest';
    }
    // Khi trang tải xong...
    if (isUserLoggedIn()) {
        // Nếu người dùng đã đăng nhập, ẩn modal đăng nhập và hiển thị nội dung chính.
        loginModal.style.display = 'none';
        mainContent.style.display = 'block';
        logoutBtn.style.display = 'block'; // Hiển thị nút logout
        // Chào mừng người dùng
        welcomeMessage.textContent = `Welcome, ${getUserFirstName()}!`;
        
        // Khi nhấn vào nút logout...
        logoutBtn.onclick = function() {
            // Xóa thông tin người dùng hiện tại khỏi localStorage
            localStorage.removeItem(KEY);
            // Chuyển hướng người dùng về trang chính
            window.location.href = "./index.html";
            // Tải lại trang hiện tại
            location.reload();
        }
    } else {
        // Nếu người dùng không đăng nhập, hiển thị modal đăng nhập và ẩn nội dung chính.
        loginModal.style.display = 'block';
        mainContent.style.display = 'none';
        logoutBtn.style.display = 'none'; // Ẩn nút logout
    }
}