import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardText } from 'reactstrap';
import { getCurrentUserDetails, isLoggedIn } from '../auth';
import userContext from '../context/userContext';

function Post({post={id:-1,title:"this is defual ttitle",content:"this is defual tcontent"},deletePost}) {

  const userContextData = useContext(userContext);
  const [user,setUser] = useState(null);
  const [login,setLogin] = useState(null);

  useEffect(()=>{
    setUser(getCurrentUserDetails());
    setLogin(isLoggedIn());

  },[])

  return (
    <Card>
        <CardBody className='border-0 shadow-0 mt-3'>
            <h1>{post.title}</h1>
            <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,60)+"..."}}>
                
            </CardText>
            <div>
                <Link  className='btn btn-secondary border-0' to={'/post/'+post.postId}>Read More</Link>
                {userContextData.user.login && (user &&user.id===post.user.id?<Button onClick={()=>deletePost(post)}
                 color='danger' className='ms-2'>Delete</Button>:'')}
                 {userContextData.user.login && (user &&user.id===post.user.id?<Button tag={Link} 
                 to={`/user/update-blog/${post.postId}`} color='warning' className='ms-2'>Update</Button>:'')}


            </div>
        </CardBody>
    </Card>
  )
}

export default Post;
