import React, { useState } from 'react'; // useState 임포트
import { Link } from 'react-router-dom';

function RentalPage() {
  const [rentedBooks, setRentedBooks] = useState([]);

  return (
    <div>
      <h2>대여 목록</h2>
      <ul>
        {rentedBooks.map((book) => (
          <li key={book.id}>
            {book.title}
            <button onClick={() => setRentedBooks(rentedBooks.filter((item) => item.id !== book.id))}>반납</button>
          </li>
        ))}
      </ul>
      <Link to="/home">도서 리스트로 돌아가기</Link>
    </div>
  );
}

export default RentalPage;
