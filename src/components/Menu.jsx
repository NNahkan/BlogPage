import axios from "axios";
import React, { useEffect, useState } from "react";

const Menu = ({ cat, postId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/posts/?cat=${cat}`);
        setPosts(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cat]);

  console.log(posts);
  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map(
        (post) =>
          post.id !== postId && (
            <div key={post.id} className="post">
              <img src={post.image} alt="" />
              <h2>{post.title}</h2>
              <button>Read more</button>
            </div>
          )
      )}
    </div>
  );
};

export default Menu;
