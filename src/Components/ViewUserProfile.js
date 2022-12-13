import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Row, Table } from 'reactstrap';
import { getCurrentUserDetails, isLoggedIn } from '../auth';


function ViewUserProfile({ user }) {

    const [currentUser, setCurrentUser] = useState(null);
    const [login, setLogin] = useState(false);

    useEffect(() => {
        setCurrentUser(getCurrentUserDetails());
        setLogin(isLoggedIn());

    }, [])


    return (
        <Card className='mt-3 rounded-0 shadow-sm border-0'>
            <CardBody>
                <h3 className='text-uppercase'>User Information</h3>
                <Container className='text-center'>
                    <img style={{ maxWidth: '150px', maxHeight: '150px' }} className='img-fluid rounded-circle' src={user.image ? user.image : 'https://st.depositphotos.com/1052233/2815/v/600/depositphotos_28158459-stock-illustration-male-default-profile-picture.jpg'} alt='user profile ' />
                </Container>
                <Table responsive striped hover bordered={true} className=' text-center mt-5'>
                    <tbody>
                        <tr>
                            <td>LCWDBlog ID</td>
                            <td>LCWD{user.id}</td>
                        </tr>
                        <tr>
                            <td>USER NAME</td>
                            <td>{user.name}</td>
                        </tr>
                        <tr>
                            <td>USER EMAIL</td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td>ABOUT</td>
                            <td>{user.about}</td>
                        </tr>
                        <tr>
                            <td>ROLE</td>
                            <td>{user.role.map((rol) => {
                                return (
                                    <span key={rol.id}>{rol.name}</span>
                                )
                            })}</td>
                        </tr>

                    </tbody>
                </Table>
                {
                    currentUser ? (currentUser.id==user.id)?(
                        <CardFooter className='text-center'>
                            <Button color='warning'>Update Profile</Button>
                        </CardFooter>
                    ):'' : ''
                }

            </CardBody>
        </Card>
    )
}

export default ViewUserProfile