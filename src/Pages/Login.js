import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../Components/Base";
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";

const Login = () => {

  const userContextData = useContext(userContext);

  const navigate = useNavigate();

  const [loginDetail,setLoginDetail]=useState({
    username:'',
    password:''
  })


  const handleChange=(event,field)=>{
    let actualValue=event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]:actualValue
    })
  }

  const handleReset=()=>{
    setLoginDetail({
      username:'',
      password:''
    })

  }

  const handleFormSubmit=(event)=>{
    event.preventDefault();
    console.log(loginDetail)

    //validation
    if(loginDetail.username.trim()=='' || loginDetail.password.trim()==''){
      toast.error("Email or Password is required!!");
      return;
    }

    //submit to the server
    loginUser(loginDetail).then((jwtTokenData)=>{
          console.log("user login!!...")
          console.log(jwtTokenData);
          //save the data to localstorage
          doLogin(jwtTokenData,()=>{
                console.log("login details saved to localstorage");
                //redirect to user dashboard

                userContextData.setUser({
                  data:jwtTokenData.user,
                  login:true
                })

                navigate("/user/dashboard");

          })
          
          toast.success("Login Successfully!!");
    }).catch(error=>{
      console.log(error);
      if(error.response.status==400 ||error.response.status==404){
        toast.error(error.response.data.message);
      }else{
        toast.error("Something went wrong!! ");
      }
      
    })

  }







  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col sm={{size:6,offset:3}}>
            <Card color="dark" inverse>
              <CardHeader>
                <h3>Login Here!!</h3>
                <CardBody >
                  <Form onSubmit={handleFormSubmit}>
                    {/* email field */}
                    <FormGroup>
                      <Label for="email">Enter Email</Label>
                      <Input type="text" id="email" value={loginDetail.username}
                       onChange={(e)=>handleChange(e,'username')} />
                    </FormGroup>
                    {/* password field */}
                    <FormGroup>
                      <Label for="password">Enter Password</Label>
                      <Input type="password" id="password" value={loginDetail.password}
                       onChange={(e)=>handleChange(e,'password')} />
                    </FormGroup>
                    <Container className="text-center">
                      <Button color="light" outline>Login</Button>
                      <Button onClick={handleReset} color="secondary" type="reset" className="ms-2">Reset</Button>

                    </Container>
                  </Form>
                </CardBody>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </Container>
      
    </Base>
  )
}

export default Login;
