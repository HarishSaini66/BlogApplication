import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Base from '../Components/Base'
import { Col, Container, Row } from "reactstrap";
import CategorySideMenu from '../Components/CategorySideMenu';
import NewFeed from '../Components/New-Feed';
import { loadPostCategoryWise } from '../services/post-service';
import { toast } from 'react-toastify';
import Post from '../Components/Post';
import { deletePosts } from '../services/post-service';
function Categories() {

  const {categoryId}=useParams();
  const [posts,setPosts]=useState([]);

  useEffect(()=>{
    console.log(categoryId);
    loadPostCategoryWise(categoryId).then(data=>{
      setPosts([...data])
    }).catch(error=>{
      console.log(error);
      toast.error("error in loading");

    })

  },[categoryId])

  const deletePost=(post)=>{
    //going to delete post
    deletePosts(post.postId).then(res=>{
        console.log(res);
        toast.success("post deleted !!...");
        let newPost = posts.filter(p=>p.postId !=post.postId);
        setPosts([...newPost]);
       
    }).catch(error=>{
        console.log(error);
        toast.error("error in deleting post");
    })
}


  return (
    <Base>
    <Container className="mt-3">
        <Row>
          <Col md={2} className='pt-5'>
            <CategorySideMenu />
          </Col>
          <Col md={10}>
          <h1>Blog Count: {posts.length}</h1>
            {
              posts && posts.map((post,index)=>{
                return(
                  <Post deletePost={deletePost} key={index} post={post} />
                )
              })
            }
            {posts.length<=0?<h1>No Post in the category</h1>:''}
          </Col>
        </Row>
      </Container>

    </Base>
  )
}

export default Categories