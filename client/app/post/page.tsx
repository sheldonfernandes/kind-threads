"use client";
import React, { useState } from "react";
import { Container,Card, Button, Row, Col, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from 'moment'; 
import './post.css'


const sampleData = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  username: `User${i + 1}`,
  postDate: new Date().toLocaleDateString(),
  postDetails: `This is a detailed post number ${i + 1}`,
  pointsEarned: Math.floor(Math.random() * 100),
  distanceTravelled: `${(Math.random() * 50).toFixed(2)} kg CO2e`,
  speed: `${(Math.random() * 20).toFixed(2)} gal`,
  profilePic: `https://i.pravatar.cc/150?img=${i + 1}`
}));

const PostCard = ({ post }) => {
  const formattedDate = moment(post.postDate).format('dddd, MMMM Do YYYY, h:mm A');  // Format date

  return (
    <Card className="mb-3">
    <Card.Body>
      <Row>
        <Col xs={12} className="d-flex align-items-center">
          <Image src={post.profilePic} roundedCircle fluid style={{ width: '30px', height: '30px', marginRight: '10px' }} />
          <div>
              <Card.Title  style={{ fontSize: '14px'}}>{post.username}</Card.Title>
              <Card.Subtitle style={{ fontSize: '12px', color: '#b0b0b0' }}>
                {formattedDate}
              </Card.Subtitle>
            </div>        
        </Col>
      </Row>
      <Row className="mt-2">
        <Col xs={12}>
          <Card.Text>{post.postDetails}</Card.Text>
          <Card.Text>
          <Row>
          <Col xs={4} className="align-items-center">
          <div style={{ fontSize: '12px' }}>Points</div> <div style={{fontSize: '14px' , fontWeight: 'bold' }}>{post.pointsEarned}</div>
          </Col>
          <Col xs={4} className="align-items-center">
          <div style={{ fontSize: '12px' }}>Water</div> <div style={{fontSize: '14px' , fontWeight: 'bold' }}>{post.distanceTravelled}</div>
          </Col>
          <Col xs={4} className="align-items-center">
          <div style={{ fontSize: '12px' }}>Carbon</div> <div style={{fontSize: '14px' , fontWeight: 'bold' }}>{post.speed}</div>
          </Col> 
          </Row>
            
          </Card.Text>
          <div className="mt-3 p-2 d-flex justify-content-between" style={{ backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
              <Button variant="light" size="sm">👍</Button> |
              <Button variant="light" size="sm">💬</Button> |
              <Button variant="light" size="sm">🔗</Button>
            </div>
        </Col>
      </Row>
    </Card.Body>
  </Card>
  );
};

export const InfiniteScrollPosts = () => {
  const [posts, setPosts] = useState(sampleData);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (posts.length >= 50) {
      setHasMore(false);
      return;
    }

    // Simulate fetching new data
    const newPosts = Array.from({ length: 10 }).map((_, i) => ({
      id: i + posts.length,
      username: `User${i + 1 + posts.length}`,
      postDate: new Date().toLocaleDateString(),
      postDetails: `This is a detailed post number ${i + 1 + posts.length}`,
      pointsEarned: Math.floor(Math.random() * 100),
      distanceTravelled: `${(Math.random() * 50).toFixed(2)} kg CO2e`,
      speed: `${(Math.random() * 20).toFixed(2)} gal`,
      profilePic: `https://i.pravatar.cc/150?img=${i + 1 + posts.length}`
    }));

    setTimeout(() => {
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    }, 1500);
  };

  return (
          <InfiniteScroll
      dataLength={posts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading more posts...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>You have seen it all!</b>
        </p>
      }
    >
      {posts.map((post) => (
         <PostCard key={post.id} post={post} />
      ))}
      </InfiniteScroll>
  );
};


export default InfiniteScrollPosts;
