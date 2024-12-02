import React, { useState } from 'react'; // useState 임포트
import { Link } from 'react-router-dom';

function CartPage() {
  const [cart, setCart] = useState([]);

  return (
    <div>
      <h2>장바구니</h2>
      <ul>
        {cart.map((book) => (
          <li key={book.id}>
            {book.title}
            <button onClick={() => setCart(cart.filter((item) => item.id !== book.id))}>삭제</button>
          </li>
        ))}
      </ul>
      <button>대여하기</button>
      <Link to="/home">도서 리스트로 돌아가기</Link>
    </div>
  );
}

export default CartPage;
