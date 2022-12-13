import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Container } from 'reactstrap'
import { getCurrentUserDetails } from '../../auth'
import AddPost from '../../Components/AddPost'
import Base from '../../Components/Base'
import NewFeed from '../../Components/New-Feed'
import Post from '../../Components/Post'
import { deletePosts, loadPostUserWise } from '../../services/post-service'

const UserDashboard = () => {

    const [user,setUser]=useState({})
    const [posts,setPosts]=useState([]);

    useEffect(()=>{
        console.log(getCurrentUserDetails())
        setUser(getCurrentUserDetails());
        loadPostData();

    },[])


    const loadPostData=()=>{
        
        loadPostUserWise(getCurrentUserDetails().id).then((data)=>{
            console.log(data);
            setPosts([...data]);
        }).catch(error=>{
            console.log(error);
            toast.error("error in loading user post ")
        })
    }

    //function to delete post
    const deletePost=(post)=>{
        //going to delete post
        deletePosts(post.postId).then(res=>{
            console.log(res);
            toast.success("post deleted !!...");
            loadPostData();
        }).catch(error=>{
            console.log(error);
            toast.error("error in deleting post");
        })
    }


    return (
        <Base>
            <Container>
                <AddPost />
                <h2 className='my-3'>Post count:{posts.length}</h2>
                {
                    posts.map((post,index)=>{
                        return(
                            <Post post={post} key={index} deletePost={deletePost} />
                        )
                    })
                }
                
            </Container>
        </Base>
    )
}

export default UserDashboard
