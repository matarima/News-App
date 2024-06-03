'use strict'

// Lấy các phần tử từ HTML
const btnAdd = document.getElementById('btn-add');
const taskInput = document.getElementById('input-task');
const todoListContainer = document.getElementById('todo-list');

// Khóa để lưu danh sách công viêc và người dùng hiện tại từ localStorage
const KEY = "TODO_LIST";
let todoList = getFromStorage(KEY , []);
const currUser = getFromStorage("CURRENT_USER" , []);

// Sự kiện click cho nút thêm
btnAdd.addEventListener('click', (e) => {
    // Ngăn trình duyêt refresh lại trang
    e.preventDefault();
    // Lấy nhiệm vụ từ input
    const task = taskInput.value;
     // Kiểm tra nếu input rỗng
     if (!task.trim()) {  
        // Hiển thị thông báo lỗi và dừng hàm
        alert("Vui lòng nhập nhiệm vụ trước khi thêm!");
        return;
    }
    // Thêm nhiệm vụ vào danh sách công việc
    todoList.push(new Task(task, currUser.username));
    // Lưu danh sách công việc vào localStorage
    saveToStorage(KEY, todoList);
    // Vẽ lại danh sách công việc
    renderToList();
    // Xóa giá trị của input
    taskInput.value = "";
});

// Hàm vẽ danh sách công việc
function renderToList() {
    // Xóa nội dung hiện đãi của danh sách
    todoListContainer.innerHTML = "";
    // Với mỗi công việc trong danh sách
    todoList.forEach((task, index) => {
       // Chỉ vẽ những công việc của người dùng hiện tại
       if (task.owner === currUser.username) {
            // tạo một phần tử danh sách
            const listItem = document.createElement('li');
            // Set nội dung là công việc
            listItem.textContent = task.task;
            // Tạo nút xóa
            const deleteBtn = document.createElement('span');
            deleteBtn.textContent = 'x';
            deleteBtn.className = 'close';
            // Xử lý sự kiện click cho nút xóa
            deleteBtn.addEventListener('click', () => {
                // Xóa công việc ra khỏi danh sách
                todoList.splice(index, 1);
                // Lưu lại danh sách công việc
                saveToStorage(KEY, todoList);
                // Vẽ lại danh sách công việc
                renderToList();
            });
            // Thêm nút xóa vào phần tử danh sách
            listItem.appendChild(deleteBtn);
            // Thêm phần tử danh sách vào danh sách công việc
            todoListContainer.appendChild(listItem);
            // Đánh dấu đã hoàn thành nếu công việc đã được hoàn thành
            if (task.isDone) {
                listItem.classList.add("checked");
            }
            // Xử lý sự kiện click cho công việc
            listItem.addEventListener("click", function () {
                // Đảo trạng thái hoàn thành của công việc
                this.classList.toggle('checked');
                // Cập nhật trạng thái hoàn thành trong dữ liệu công việc
                task.isDone = !task.isDone;
                // Lưu lại danh sách công việc
                saveToStorage(KEY, todoList);
            });
        }   
    });
}

// Vẽ teo danh sách công việc lúc bắt đầu
renderToList();