import React, { useState } from 'react'
import { useEffect, useRef } from 'react';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import Base from '../Components/Base'
import userContext from '../context/userContext';
import { loadPost, updatePost } from '../services/post-service';
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap';
import JoditEditor from 'jodit-react';
import { loadAllCategories } from '../services/category-service';




function UpdateBlog() {
    const editor = useRef(null);

    const { blogId } = useParams();
    const object = useContext(userContext);
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        loadAllCategories().then(data => {
            console.log(data);
            setCategories(data);
        }).catch(error => {
            console.log(error)
        })

        //load the blog from databse
        loadPost(blogId).then((data) => {
            setPost({ ...data ,categoryId:data.category.categoryId})
        }).catch(error => {
            console.log(error);
            toast.error("error in loading the blog")
        })

    }, [])

    useEffect(() => {
        if (post) {
            if (post.user.id != object.user.data.id) {
                toast.error("this is not your post!!..");
                navigate("/")
            }
        }

    }, [post])

    const handleChange=(event,fieldName)=>{
        setPost({
            ...post,
            [fieldName]:event.target.value
        })

    }

    const updatePostH =(event)=>{
        event.preventDefault();
        console.log(post);
        updatePost({...post,category:{categoryId:post.categoryId}},post.postId).then((res)=>{
            console.log(res);
            toast.success("Post Updated")
        }).catch(error=>{
            console.log(error);
            toast.error("error in updating post");
        })


    }

    const updateHtml = () => {
        return (
            <div className='wrapper'>
                <Card className='shadow-sm mt-3'>
                    <CardBody>
                   

                        <h3>Update Post from here</h3>
                        <Form onSubmit={updatePostH}>
                            <div className='my-3'>
                                <Label for='title' >Post Title</Label>
                                <Input type='text' id='title' placeholder='Enter Here' 
                                name="title" className='rounded-0' value={post.title}
                                    onChange={(event)=>handleChange(event,'title')} />
                            </div>
                            <div className='my-3'>
                                <Label for='content' >Post Content</Label>
                                {/* <Input type='textarea' id='content' placeholder='Enter Here'
                                className='rounded-0' style={{ height: "300px" }} /> */}
                                <JoditEditor
                                    ref={editor}
                                    value={post.content}

                                    onChange={newContent=>setPost({...post,content:newContent})}

                                />
                            </div>
                            {/* file field */}

                            <div className="mt-3">
                                <Label for='image'>Select Post banner</Label>
                                <Input id='image' type='file' onChange={''} />
                            </div>

                            

                            <div className='my-3'>
                                <Label for='category' >Post Category</Label>
                                <Input type='select' id='category' className='rounded-0'
                                    name="categoryId" placeholder='Enter Here' onChange={(event)=>handleChange(event,'categoryId')} defaultValue={0}
                                    value={post.categoryId}
                                    >
                                    <option disabled value={0}>--Select Category</option>
                                    {
                                        categories.map((category) => (
                                            <option value={category.categoryId} key={category.categoryId}>
                                                {category.categoryTitle}
                                            </option>
                                        ))
                                    }

                                </Input>

                            </div>
                            <Container className='text-center'>
                                <Button type='submit' color='primary' className='rounded-0'>Update Post</Button>
                                <Button color='danger' className='rounded-0 ms-2'>Reset Content</Button>

                            </Container>



                        </Form>
                    </CardBody>
                </Card>
            </div>
        )
    }

    return (
        <Base>

            <Container>
                {post && updateHtml()}
            </Container>
        </Base>
    )
}

export default UpdateBlog