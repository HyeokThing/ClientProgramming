import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

const PostView = () => {
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const { id } = param;
  console.log(id);

  const callAPI = () => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts/" + id)
      .then((response) => response.json())
      .then((json) => {
        setPost(json);
        setLoading(false);
      });
  };

  useEffect(() => {
    callAPI();
  }, []);

  if (loading) {
    return <h1 className="text-center">Loading...</h1>;
  }
  return (
    <div className="componentWrap">
      <h1>Post View</h1>
      <Card>
        <Card.Header>
          <span>Num : {post.id}</span>
          <h3>{post.title}</h3>
        </Card.Header>
        <Card.Body>
          <p>{post.body}</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PostView;
