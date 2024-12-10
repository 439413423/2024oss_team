import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

const CreateUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "남",
    nationality: "내국인",
  });

  const apiUrl = "https://672819d3270bd0b975545f98.mockapi.io/api/vi/users";
  const navigate = useNavigate();

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const birthDateRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInput = () => {
    if (!formData.firstName) {
      alert("이름을 입력하세요.");
      firstNameRef.current.focus();
      return false;
    }
    if (!formData.lastName) {
      alert("성을 입력하세요.");
      lastNameRef.current.focus();
      return false;
    }
    if (!formData.birthDate) {
      alert("생년월일을 입력하세요.");
      birthDateRef.current.focus();
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInput()) return;

    try {
      await axios.post(apiUrl, formData); 
      alert("추가 성공");
      navigate("/list");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancel = () => {
    navigate("/list");
  };

  return (
    <div className="container">
      <h1>데이터 추가</h1>
      <div className="mb-3">
        <label>이름:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          ref={firstNameRef}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>성:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          ref={lastNameRef}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>생년월일:</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          ref={birthDateRef}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>성별:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="form-control"
        >
          <option value="남">남</option>
          <option value="여">여</option>
        </select>
      </div>
      <div className="mb-3">
        <label>국적:</label>
        <select
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          className="form-control"
        >
          <option value="내국인">내국인</option>
          <option value="외국인">외국인</option>
        </select>
      </div>
      <button className="btn btn-primary me-2" onClick={handleSubmit}>
        저장하기
      </button>
      <button className="btn btn-secondary" onClick={handleCancel}>
        취소하기
      </button>
    </div>
  );
};

export default CreateUser;