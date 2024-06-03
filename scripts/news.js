'use strict'

// Lấy tham chiếu đến các HTML element
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const pageNum = document.getElementById('page-num');

// Khởi tạo số trang hiện tại và tổng số kết quả trả về
let currentPage = 1;
let totalResults;

// Đọc giá trị 'pageSize' và 'category' từ localStorage
let pageSize = Number(getFromStorage('newsPerPage', '5'));
let category = getFromStorage('newsCategory', 'technology');

// Khóa API
const API = "15872e08048344e9ab35c744ea942345";

// Hàm lấy dữ liệu từ API
async function fetchData(page) {
    // Tạo URL và thêm các tham số tìm kiếm
    const url = new URL("https://newsapi.org/v2/top-headlines");
    url.searchParams.set("country", "us");
    url.searchParams.set("category", category);
    url.searchParams.set("pageSize", pageSize);
    url.searchParams.set("page", page);
    url.searchParams.set("apiKey", API);

    // Gửi yêu cầu lấy dữ liệu
    const response = await fetch(url);
    // Parse dữ liệu JSON từ phản hồi
    const data = await response.json();
    // Lưu tổng số kết quả trả về
    totalResults = data.totalResults;
    // Hiển thị tin tức
    displayNews(data.articles);
    // Xử lý các nút chuyển trang
    handlePageButtons();

}

// Hàm hiển thị tin tức
async function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    for (let article of articles) {
        let newsDiv = document.createElement('div');
        newsDiv.className = 'card flex-row flex-wrap';

        let imgDiv = document.createElement('div');
        imgDiv.className = 'col-md-4';

        let imgTag = document.createElement('img');
        // imgTag.src = article.urlToImage;
        
        if(article.urlToImage) {
            // Nếu `article.urlToImage` tồn tại, gán nó vào thuộc tính src của imgTag
            imgTag.src = article.urlToImage;
        } else {
            // Ngược lại, sử dụng hình ảnh mặc định
            imgTag.src = '../img/default-image.png';  // Thay thế với url hình ảnh mặc định của bạn
        }
        imgTag.className = 'card-img';
        imgTag.alt = article.title;

        imgDiv.appendChild(imgTag);

        let contentDiv = document.createElement('div');
        contentDiv.className = 'col-md-8';

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        let h5Tag = document.createElement('h5');
        h5Tag.className = 'card-title';
        h5Tag.textContent = article.title;

        let pTag = document.createElement('p');
        pTag.className = 'card-text';
        pTag.textContent = article.description;

        let aTag = document.createElement('a');
        aTag.href = article.url;
        aTag.className = 'btn btn-primary';
        aTag.textContent = 'View';

        cardBody.appendChild(h5Tag);
        cardBody.appendChild(pTag);
        cardBody.appendChild(aTag);

        contentDiv.appendChild(cardBody);

        newsDiv.appendChild(imgDiv);
        newsDiv.appendChild(contentDiv);

        newsContainer.appendChild(newsDiv);
    }
}

// Hàm xử lý nút chuyển trang
function handlePageButtons() {
    btnPrev.style.display = currentPage === 1 ? 'none' : 'block';
    btnNext.style.display = currentPage >= totalResults / pageSize ? 'none' : 'block';
    pageNum.textContent = currentPage;  // Cập nhật số trang hiện tại
}

// Tạo sự kiện click cho nút prev
btnPrev.addEventListener("click", function () {
    currentPage -= 1;
    fetchData(currentPage);
});

// Tạo sự kiện click cho nút next
btnNext.addEventListener("click", function () {
    currentPage += 1;
    fetchData(currentPage);
});

// Lấy dữ liệu cho số trang hiện tại lần đầu
fetchData(currentPage);