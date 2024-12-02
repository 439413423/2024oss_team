import React, { useState, useEffect } from 'react'; // useState와 useEffect 임포트
import { useParams, Link } from 'react-router-dom';

function DetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);

  useEffect(() => {
    // 도서 상세 정보 호출
    fetch(`https://api.example.com/books/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data));

    // 비슷한 도서 추천 호출
    fetch(`https://api.example.com/books?genre=${book?.genre}`)
      .then((response) => response.json())
      .then((data) => setSimilarBooks(data.slice(0, 5))); // 5권 추천
  }, [id, book?.genre]);

  return (
    <div>
      <h2>도서 상세 페이지</h2>
      {book ? (
        <div>
          <h3>{book.title}</h3>
          <p>저자: {book.author}</p>
          <p>출판사: {book.publisher}</p>
          <p>발행년도: {book.year}</p>
          <p>언어: {book.language}</p>
          <p>대여 가능 여부: {book.available ? '가능' : '대여중'}</p>
          <button>장바구니 추가</button>
          <Link to="/cart">장바구니로 이동</Link>
        </div>
      ) : (
        <p>도서 정보를 불러오는 중...</p>
      )}
      <h3>비슷한 도서 추천</h3>
      <ul>
        {similarBooks.map((similarBook) => (
          <li key={similarBook.id}>{similarBook.title}</li>
        ))}
      </ul>
      <Link to="/home">도서 리스트로 돌아가기</Link>
    </div>
  );
}

export default DetailPage;
