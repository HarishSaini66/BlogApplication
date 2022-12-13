import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from '../services/category-service';

function CategorySideMenu() {

    const [category,setCategory] = useState([]);

    useEffect(()=>{
        loadAllCategories().then((data)=>{
            console.log(data)
            setCategory([...data]);
        }).catch(error=>{
            console.log(error)
            toast.error("error in loading category!!....");
        })

    },[])


  return (
    <div>
      <ListGroup>
        <ListGroupItem tag={Link} to="/" action={true} className='border-0'>
            All Blog item
        </ListGroupItem>
        {category && category.map((cat,index)=>{
            return(
                <ListGroupItem tag={Link} to={'/categories/'+cat.categoryId} className='border-0 mt-1' key={index} action={true}>
                    {cat.categoryTitle}
                </ListGroupItem>
            )

        })}
      </ListGroup>
    </div>
  )
}

export default CategorySideMenu
