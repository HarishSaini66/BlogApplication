import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Col, Row, Pagination, PaginationItem, PaginationLink, Container } from 'reactstrap'
import { loadAllPost } from '../services/post-service'
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from './Post'
import { deletePosts } from '../services/post-service';
import loadPostData from '../Pages/user-routes/UserDashboard'
import userContext from '../context/userContext';

function NewFeed() {

    
    const [postContent, setPostContent] = useState({
        content: [],
        totalElement:'',
        totalPages:'',
        pageSize:'',
        lastPage:false,
        pageNumber:'',
    })

    const [currentPage,setCurrentPage]=useState(0);

    useEffect(() => {
        //load all the server
        changePage(currentPage);

    }, [currentPage])


    const changePage=(pageNumber=0,pageSize=5)=>{
            if(pageNumber>postContent.pageNumber && postContent.lastPage){
                return;
            }
            if(pageNumber<postContent.pageNumber && postContent.pageNumber==0){
                return;
            }
            loadAllPost(pageNumber,pageSize).then(data=>{
                setPostContent({
                    content:[...postContent.content,...data.content],
                    totalElement:data.totalElement,
                    totalPages:data.totalPages,
                    pageSize:data.pageSize,
                    lastPage:data.lastPage,
                    pageNumber:data.pageNumber,
                })
                
            }).catch(error=>{
                toast.error("Error in loading post")
            })
    }

    const changePageInfinite=()=>{
        console.log("page changed")
        setCurrentPage(currentPage+1)
    }

    const deletePost=(post)=>{
        //going to delete post
        deletePosts(post.postId).then(res=>{
            console.log(res);
            toast.success("post deleted !!...");
           let newPostContents=postContent.content.filter(p=>p.postId!=post.postId);
           setPostContent({...postContent,content:newPostContents})
        }).catch(error=>{
            console.log(error);
            toast.error("error in deleting post");
        })
    }



    return (
        <div className="container-fluid">
            <Row>
                <Col md={{ size: 12 }}>
                    <h1>Blog counts ({postContent?.totalElement}) </h1>
                    <InfiniteScroll
                        dataLength={postContent.content.length}
                        next={changePageInfinite}
                        hasMore={!postContent.lastPage}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                                <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                                </p>
                                }
                    >
                    {
                        postContent.content.map((post) => (
                            <Post deletePost={deletePost} post={post} key={post.postId} />
                        ))
                    }

                    </InfiniteScroll>
                   

                    {/* <Container className=' mt-3'>
                        <Pagination>
                            <PaginationItem onClick={()=>changePage(postContent.pageNumber-1)} disabled={postContent.pageNumber===0}>
                                <PaginationLink previous>
                                    Prevoius
                                </PaginationLink>
                            </PaginationItem>
                            {
                                [...Array(postContent.totalPages)].map((item,index)=>(
                                    <PaginationItem onClick={()=>changePage(index)} active={postContent.pageNumber===index} key={index}>
                                        <PaginationLink>
                                            {index+1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))
                            }
                                
                            <PaginationItem onClick={()=>changePage(postContent.pageNumber+1)} disabled={postContent.lastPage}>
                                <PaginationLink next>
                                     Next
                                </PaginationLink>
                            </PaginationItem>
                        </Pagination>
                    </Container> */}
                </Col>
            </Row>
        </div>
    )
}

export default NewFeed
