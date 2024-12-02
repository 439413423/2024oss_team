import React, { useState, useEffect } from 'react'; // useState와 useEffect 임포트
import { Link } from 'react-router-dom';

function MainPage() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // API 호출 및 데이터 설정 (예시 데이터 사용)
    fetch('https://api.example.com/books')
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  const filteredBooks = books
    .filter((book) => book.title.includes(search))
    .filter((book) => (filter === 'available' ? book.available : true))
    .slice(0, 20); // 처음 20개만 표시

  return (
    <div>
      <h2>메인 페이지</h2>
      <input type="text" placeholder="도서명 검색" value={search} onChange={(e) => setSearch(e.target.value)} />
      <label>
        <input type="checkbox" onChange={(e) => setFilter(e.target.checked ? 'available' : '')} />
        대여 가능 도서만 보기
      </label>
      <ul>
        {filteredBooks.map((book) => (
          <li key={book.id}>
            {book.title} - {book.author}
            <Link to={`/book/${book.id}`}>상세 정보</Link>
            <button>장바구니 추가</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainPage;
