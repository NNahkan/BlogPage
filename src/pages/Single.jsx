import React, { useContext, useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/posts/${postId}`);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/posts/${postId}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="single">
      <div className="content">
        <img src={post?.image} alt="" />
        <div className="user">
          {post.userImage && <img src={post.userImage} alt="" />}
          <div className="info">
            <span>{post.name}</span>
            <p>Posted {moment(post.createdAt).fromNow()}</p>
          </div>
          {/* {currentUser.name && currentUser.name === post.name && ( */}
          <div className="edit">
            <Link to={`/write?edit=2`}>
              <img src={Edit} alt="" />
            </Link>
            <img onClick={handleDelete} src={Delete} alt="" />
          </div>
          {/* )} */}
        </div>
        <h1>{post.title}</h1>
        {post.content}
      </div>
      <Menu cat={post.categoryName} postId={post.id} />
    </div>
  );
};

export default Single;
