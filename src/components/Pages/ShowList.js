import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShowList = ({ books, setBooks, cart = [], addToCart = () => { } }) => {
  const [filteredBooks, setFilteredBooks] = React.useState([]);
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [filterType, setFilterType] = React.useState('title');
  const [sortType, setSortType] = React.useState('');
  const [languageFilter, setLanguageFilter] = React.useState('ALL');
  const [showAvailableOnly, setShowAvailableOnly] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  const navigate = useNavigate();
  const itemsPerPage = 10;

  React.useEffect(() => {
    if (!books || books.length === 0) return;

    let updatedBooks = [...books];

    if (searchKeyword) {
      updatedBooks = updatedBooks.filter((book) =>
        book[filterType]?.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    if (showAvailableOnly) {
      updatedBooks = updatedBooks.filter((book) => book.loan_available === '대여 가능');
    }

    if (languageFilter !== 'ALL') {
      updatedBooks = updatedBooks.filter((book) => book.language === languageFilter);
    }

    if (sortType === 'title_asc') {
      updatedBooks = updatedBooks.sort((a, b) => a.title.localeCompare(b.title, 'ko', { sensitivity: 'base' }));
    } else if (sortType === 'control_number_asc') {
      updatedBooks = updatedBooks.sort((a, b) => parseInt(a.control_number, 10) - parseInt(b.control_number, 10));
    } else if (sortType === 'publication_year_asc') {
      updatedBooks = updatedBooks.sort((a, b) => a.publication_year - b.publication_year);
    }

    const uniqueBooks = [];
    const seenControlNumbers = new Set();
    updatedBooks.forEach((book) => {
      if (!seenControlNumbers.has(book.control_number)) {
        seenControlNumbers.add(book.control_number);
        uniqueBooks.push(book);
      }
    });

    setFilteredBooks((prev) => {
      const isSame = JSON.stringify(prev) === JSON.stringify(uniqueBooks);
      return isSame ? prev : uniqueBooks;
    });

    setCurrentPage(1);
  }, [books, searchKeyword, filterType, showAvailableOnly, languageFilter, sortType]);

  const displayedBooks = filteredBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  const changePage = (pageNumber) => setCurrentPage(pageNumber);

  const startPage = 1;
  const endPage = totalPages;

  return (
    <div className="container">
      <div
        className="header"
        style={{
          display: 'flex',
          gap: '10px',
          padding: '10px',
        }}
      >
        <img
          src="/pic.png"
          alt="logo"
          style={{
            width: '3rem',
            height: '3rem',
          }}
        />
        <h1 style={{ margin: 0 }}>도서 리스트</h1>
      </div>
      <div
        className="filters"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '10px',
        }}
      >
        <div>
          <input
            type="text"
            placeholder="검색어 입력"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <select onChange={(e) => setFilterType(e.target.value)} value={filterType}>
            <option value="title">제목</option>
            <option value="author">저자</option>
            <option value="publisher">출판사</option>
          </select>
          <select onChange={(e) => setSortType(e.target.value)} value={sortType} style={{ marginLeft: '10px' }}>
            <option value="">기본순</option>
            <option value="title_asc">책 제목 가나다순</option>
            <option value="control_number_asc">자료 코드순</option>
            <option value="publication_year_asc">출판 연도순</option>
          </select>
          <select
            onChange={(e) => setLanguageFilter(e.target.value)}
            value={languageFilter}
            style={{ marginLeft: '10px' }}
          >
            <option value="ALL">모든 언어</option>
            <option value="한국어">한국어</option>
            <option value="영어">영어</option>
          </select>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', marginLeft: '10px' }}>
            <input
              type="checkbox"
              checked={showAvailableOnly}
              onChange={(e) => setShowAvailableOnly(e.target.checked)}
              style={{ transform: 'translateY(2px)' }}
            />
            <p style={{ margin: 0 }}>대여 가능 도서만 보기</p>
          </label>

        </div>
        <div>
          <button className="btn btn-primary" onClick={() => navigate('/cart')} style={{ marginRight: '10px' }}>
            장바구니 보기
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/rental')}>
            대여 리스트 보기
          </button>
        </div>
      </div>

      <div id="data-list" style={{ marginTop: "20px" }}>
        {displayedBooks.map((book) => (
          <div
            key={book.control_number}
            className="book-item"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              borderBottom: "1px solid #ccc",
              padding: "10px 0",
            }}
          >
            <div style={{ maxWidth: "70%" }}>
              <strong style={{ display: "block", wordWrap: "break-word", whiteSpace: "normal" }}>
                {book.title.length > 100 ? `${book.title.slice(0, 100)}\n${book.title.slice(100)}` : book.title}
              </strong>
              <p>{`${book.author} / ${book.publisher}`}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ marginBottom: '10px' }}>
                <button
                  className="btn btn-warning"
                  onClick={() => addToCart(book)}
                  disabled={
                    cart.some((item) => item.control_number === book.control_number) ||
                    book.loan_available !== '대여 가능'
                  }
                  style={{ marginRight: '10px' }}
                >
                  {cart.some((item) => item.control_number === book.control_number) ? '장바구니에 있음' : '장바구니 추가'}
                </button>
                <button
                  className="btn btn-info"
                  onClick={() => navigate(`/book/${book.control_number}`)}
                >
                  상세보기
                </button>
              </div>
              <span
                style={{
                  color: book.loan_available === "대여 가능" ? "green" : "red",
                }}
              >
                {book.loan_available}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: endPage }, (_, i) => startPage + i).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`page-btn ${currentPage === pageNumber ? 'active' : ''}`}
            onClick={() => changePage(pageNumber)}
            style={{
              marginRight: '5px',
              backgroundColor: currentPage === pageNumber ? '#007bff' : '',
              opacity: currentPage === pageNumber ? 1 : 0.7,
            }}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShowList;