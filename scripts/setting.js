'use strict'

// Các thành phần nút, trang và input từ giao diện người dùng
const btnSubmit = document.getElementById('btn-submit');
const inputPageSize = document.getElementById('input-page-size');
const inputCategory = document.getElementById('input-category');

// Sự kiện nhấp nút đăng ký
btnSubmit.addEventListener('click', (e) => {
    // Ngăn chặn sự kiện mặc định của form (ngăn ngừa việc gửi form)
    e.preventDefault();

    // Lấy dữ liệu từ form: số tin tức mỗi trang và danh mục tin tức
    let newsPerPage = inputPageSize.value;
    let newsCategory = inputCategory.value;

    // Kiểm tra xem giá trị có phải là số dương
    if (newsPerPage <= 0) {
        alert('Number of news per page cannot be less than 0!');
        return;
    }
    // Lưu dữ liệu vào localStorage
    saveToStorage("newsPerPage", newsPerPage);
    saveToStorage("newsCategory", newsCategory);

    // Hiển thị thông báo thành công
    alert('Settings saved successfully!')

    // Tải lại trang để áp dụng cài đặt mới
    location.reload();
    
});

// Khi trang web tải xong
window.onload = function() {
    // Lấy dữ liệu đã lưu từ localStorage và điền vào form
    inputPageSize.value = getFromStorage('newsPerPage', '');
    inputCategory.value = getFromStorage('newsCategory', '');
}