import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../features/createSlice";

const Add = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(formData));
    // Clear form after submission if needed
    setFormData({
      fname: "",
      lname: "",
      email: "",
      password: "",
    });

    navigate("/");
  };

  return (
    <div className="usertable">
      <Link to={"/"} className="btn btn-dark">
        {" "}
        Back{" "}
      </Link>
      <h1>Add New User</h1>
      <form onSubmit={handleSubmit}>
        <div className="form d-flex">
          <input
            className="form-control"
            onChange={inputHandler}
            type="text"
            placeholder="First Name"
            name="fname"
          />
          <input
            className="form-control"
            onChange={inputHandler}
            type="text"
            placeholder="Last Name"
            name="lname"
          />
          <input
            className="form-control"
            onChange={inputHandler}
            type="email"
            placeholder="Email"
            name="email"
          />
          <input
            className="form-control"
            onChange={inputHandler}
            type="password"
            placeholder="password"
            name="password"
          />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
