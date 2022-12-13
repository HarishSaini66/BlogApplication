import { myAxois } from "./helper";

export const createPostSe = (postData) => {
    return myAxois.post(`/api/v1/users/${postData.userId}/category/${postData.categoryId}/posts`, postData).then((response) => response.data)


};

export const loadAllPost=(pageNumber,pageSize)=>{
        return myAxois.get(`/api/v1/posts?&pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`).then((response)=>response.data)
}

//load all post
export const loadPost=(postId)=>{
    return myAxois.get(`/api/v1/posts/`+postId).then((response)=>response.data);

}


export const createComment=(comment,postId)=>{
    return myAxois.post(`/api/v1/post/${postId}/comments`,comment).then((response)=>response.data);

}


//upload post banner image

export const uploadImage=(image,postId)=>{
    let formData = new FormData();
    formData.append('image',image);
    return myAxois.post(`/api/v1/post/image/upload/${postId}`,formData,{headers:{'Content-Type':'multipart/form-data'}})
    .then((response)=>response.data);

}


//get the post by category
export const loadPostCategoryWise=(categoryId)=>{
    return myAxois.get(`/api/v1/category/${categoryId}/posts`).then((res)=>res.data)

}


export const loadPostUserWise=(userId)=>{
    return myAxois.get(`/api/v1/user/${userId}/posts`).then((res)=>res.data);
}

export const deletePosts=(postId)=>{
    return myAxois.delete(`/api/v1/posts/${postId}`).then((res)=>res.data);

}

export const updatePost=(post,postId)=>{
    return myAxois.put(`/api/v1/posts/${postId}`,post).then((res)=>res.data);
}