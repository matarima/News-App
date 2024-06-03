'use strict';

// Các thành phần nút, trang và input từ giao diện người dùng
const btnSubmit = document.getElementById('btn-submit');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const pageNum = document.getElementById('page-num');
const inputQuery = document.getElementById('input-query');
const newsContainer = document.getElementById('news-container');

// Trạng thái ban đầu bao gồm trang hiện tại, tổng số kết quả và số lượng mỗi trang
const state = {
    currentPage: 1,
    totalResults: 0,
    pageSize: 5
};

// Khóa API
const API_KEY = "15872e08048344e9ab35c744ea942345";

// Xử lý sự kiện cho nút tìm kiếm và điều hướng
btnSubmit.addEventListener('click', handleSearchSubmit);
btnPrev.addEventListener('click', handlePrevPage);
btnNext.addEventListener('click', handleNextPage);

// Hàm lấy dữ liệu từ API
async function searchNewsAPI(query, page, pageSize) {
    const url = new URL("https://newsapi.org/v2/everything");
    url.searchParams.set("q", query);
    url.searchParams.set("page", page);
    url.searchParams.set("pageSize", pageSize);
    url.searchParams.set("apiKey", API_KEY);

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // Update total results
    state.totalResults = data.totalResults;
    return data.articles;
}

// Hàm xử lý khi gửi yêu cầu tìm kiếm
function handleSearchSubmit(e) {
    e.preventDefault();
    // Start from the first page on a new search
    state.currentPage = 1;
    state.totalResults = 0;
    const searchQuery = inputQuery.value;
    if (!searchQuery) {
        alert('Please enter a search query');
        return;
    }

    searchNewsAPI(searchQuery, state.currentPage, state.pageSize)
        .then(renderSearchResults)
        .catch(console.error);
}

// Xử lý cho nút trang trước 
function handlePrevPage() {
    if (state.currentPage > 1) {
        state.currentPage--;
        searchNewsAPI(inputQuery.value, state.currentPage, state.pageSize)
            .then(renderSearchResults)
            .catch(console.error);
    }
}

// Xử lý cho nút trang sau 
function handleNextPage() {
    if (state.currentPage < Math.ceil(state.totalResults/state.pageSize)) {
        state.currentPage++;
        searchNewsAPI(inputQuery.value, state.currentPage, state.pageSize)
            .then(renderSearchResults)
            .catch(console.error);
    }
}


// Hàm hiển thị kết quả tìm kiếm
function renderSearchResults(articles) {
    newsContainer.innerHTML = null;
    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('card', 'mb-3');

        newsItem.innerHTML = `
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${article.urlToImage}" class="card-img" alt="${article.title}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description}</p>
                        <a href="${article.url}" class="btn btn-primary">View</a>
                    </div>
                </div>
            </div>
        `;
        newsContainer.appendChild(newsItem);
    });

    btnPrev.style.display = state.currentPage === 1 ? 'none' : 'block';
    btnNext.style.display = state.currentPage >= state.totalResults / state.pageSize ? 'none' : 'block';
    pageNum.textContent = state.currentPage;
}

// Khởi động chức năng tìm kiếm với yêu cầu trống
searchNewsAPI(`''`, state.currentPage, state.pageSize)
.then(renderSearchResults)
.catch(console.error);