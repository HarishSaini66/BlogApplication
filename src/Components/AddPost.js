import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap';
import { loadAllCategories } from '../services/category-service';
import JoditEditor from 'jodit-react';

import { getCurrentUserDetails } from '../auth';
import { toast } from 'react-toastify';
import { createPostSe, uploadImage } from '../services/post-service';

const AddPost = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const[user,setUser]=useState(undefined);


    const [categories, setCategories] = useState([]);
    const [post,setPost]=useState({
        title:"",
        content:"",
        categoryId:""
    })

    const [image,setImage] =useState(null);

   

    useEffect(() => {
        setUser(getCurrentUserDetails())
        loadAllCategories().then(data => {
            console.log(data);
            setCategories(data);
        }).catch(error => {
            console.log(error)
        })
    }, [])

    //field change function
    const fieldChange=(event)=>{
        setPost({...post,[event.target.name]:event.target.value})

    }

    const contentFieldChanged=(data)=>{
        setPost({...post,'content':data})
    }

    //create post function
    const createPost=(event)=>{
        event.preventDefault();
        if(post.title.trim()===''){
            toast.error("post title is required !!")
            return;
        }

        if(post.content.trim()===''){
            toast.error("Post content is required !!")
            return;
        }

        if(post.categoryId.trim()===''){
            toast.error("Post Category is required!!")
            return;
        }

        //submit the form
        post['userId'] =user.id;
        createPostSe(post).then(data=>{

            uploadImage(image,data.postId).then((data)=>{
                toast.success("Image uploaded!!..");
            }).catch(error=>{
                toast.error("error in uploading post");
                console.log(error);
            })

            toast.success("Post created");
            
            setPost({
                title:"",
                content:"",
                categoryId:""
            })
        }).catch(error=>{
            toast.error("error")
            
        })


    }

    //handling file change event
    const handleFileChange=(event)=>{
        console.log(event.target.files[0])
        setImage(event.target.files[0]);

    }

    return (
        <div className='wrapper'>
            <Card className='shadow-sm mt-3'>
                <CardBody>
                
                    <h3>What's going  in your mind</h3>
                    <Form onSubmit={createPost}>
                        <div className='my-3'>
                            <Label for='title' >Post Title</Label>
                            <Input type='text' id='title' placeholder='Enter Here' name="title" className='rounded-0'
                            onChange={fieldChange} />
                        </div>
                        <div className='my-3'>
                            <Label for='content' >Post Content</Label>
                            {/* <Input type='textarea' id='content' placeholder='Enter Here'
                                className='rounded-0' style={{ height: "300px" }} /> */}
                            <JoditEditor
                                ref={editor}
                                value={post.content}
                                
                                onChange={contentFieldChanged}
                               
                             />
                        </div>
                        {/* file field */}

                        <div className="mt-3">
                        <Label for='image'>Select Post banner</Label>
                            <Input id='image' type='file' onChange={handleFileChange} />
                        </div>
                        


                        <div className='my-3'>
                            <Label for='category' >Post Category</Label>
                            <Input type='select' id='category' className='rounded-0' 
                            name = "categoryId" placeholder='Enter Here'  onChange={fieldChange}  defaultValue={0}>
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
                            <Button type='submit' color='primary' className='rounded-0'>Create Post</Button>
                            <Button color='danger' className='rounded-0 ms-2'>Reset Content</Button>

                        </Container>

                    

                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default AddPost
