import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row, Table } from 'reactstrap';
import Base from '../../Components/Base';
import ViewUserProfile from '../../Components/ViewUserProfile';
import userContext from '../../context/userContext';
import { getUser } from '../../services/user-service';

const ProfileInfo = () => {
  const object = useContext(userContext)

  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(userId).then((data) => {
      console.log(data);
      setUser({ ...data });
    }).catch(error => {
      console.log(error)
    })

  }, [])

  const userView = () => {
    return (
      <Row >
        <Col md={{ size: 6, offset: 3 }}>
          <ViewUserProfile user={user} />

        </Col>
      </Row>

    )
  }



  return (
    <Base>
      {user?userView():''}
    </Base>
  )
}

export default ProfileInfo;