import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/readSlice";
import { deleteUser } from "../features/deleteSlice";

const User = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.read);

  useEffect(() => {
    dispatch(fetchUsers()).catch((error) => {
      console.error("Error fetching users:", error);
    });
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId))
      .then(() => {
        // Handle successful delete if needed
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div className="usertable">
      <Link to={"/add"} className="btn btn-primary addbtn">
        Add User
      </Link>
      <div className="tbl">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th scope="row">{index + 1}</th>
                <td>
                  {user.fname} {user.lname}
                </td>
                <td>{user.email}</td>
                <td>
                  <Link to={`/edit/${user._id}`} className="btn btn-info edt">
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
