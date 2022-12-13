import { useEffect, useState } from "react";
import {
  Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label,
  Row
} from "reactstrap";
import Base from "../Components/Base";
import { signUp } from "../services/user-service";
import {toast} from 'react-toastify';
const SignUp = () => {


   

    const [data,setData] =  useState({
          name:'',
          email:'',
          password:'',
          about:''
         
  })

    const [error,setError] = useState({
      errors:{},
      isError:false
    })

    useEffect(()=>{
          console.log(data);
    },[data])

    //handle change
    const handleChange=(event,field)=>{
      //dynamic setting values
      setData({...data,[field]:event.target.value});
    }

    //resetting the form
    const resetData=()=>{
      setData({
          name:'',
          email:'',
          password:'',
          about:''
      })
    }

    //submitting the form
    const submitForm=(event)=>{
        event.preventDefault();

        // if(error.isError){
        //   toast.error("Form data is invalid,correct all details then submit");
        //   setError({...error,isError:false})
        //   return;
        // }



        console.log(data);
        //data validate



        //call server api for sending data
        signUp(data).then((resp)=>{
            console.log(resp);
            console.log("success log")
            toast.success("User registered successfully!!!"+resp.id);
            setData({
              name:'',
              email:'',
              password:'',
              about:''
            })
        }).catch((error)=>{
          console.log(error);
          console.log("error Log")
          //handle error in props
          setError({
            errors:error,
            isError:true
          })
        });
    }




  return (
    <Base>
      <div>
        <Container>
        
          <Row className="mt-4">
            <Col sm={{ size: 6, offset: 3 }}>
              <Card  color="dark" inverse>
                <CardHeader>
                  <h3>Fill Information to Register !!</h3>
                </CardHeader>
                <CardBody>
                  {/* creating form */}
                  <Form onSubmit={submitForm}>
                    {/* Name field */}
                    <FormGroup>
                      <Label for="name">Enter Name</Label>
                      <Input type="text" id="name" placeholder="Enter Here"
                       onChange={(e)=>handleChange(e,'name')} value={data.name} 
                       invalid={error.errors
                       ?.response?.data?.name?true:false} />
                       <FormFeedback>{error.errors?.response?.data?.name}</FormFeedback>
                    </FormGroup>
                    {/* email field */}
                    <FormGroup>
                      <Label for="email">Enter Email</Label>
                      <Input type="email" id="email" placeholder="Enter Here" 
                      onChange={(e)=>handleChange(e,'email')} value={data.email} 
                      invalid={error.errors
                       ?.response?.data?.email?true:false}
                      />
                       <FormFeedback>{error.errors?.response?.data?.email}</FormFeedback>

                    </FormGroup>
                    {/* password filed */}
                    <FormGroup>
                      <Label for="password">Enter Password</Label>
                      <Input type="password" id="password" placeholder="Enter Here"
                       onChange={(e)=>handleChange(e,'password')}  value={data.password}
                       invalid={error.errors
                       ?.response?.data?.password?true:false}
                       />
                       <FormFeedback>{error.errors?.response?.data?.password}</FormFeedback>

                    </FormGroup>
                    {/* about field */}
                    <FormGroup>
                      <Label for="about">Enter About Yourself</Label>
                      <Input type="textarea" id="about" style={{ height: "200px" }} 
                      placeholder="Enter Here" onChange={(e)=>handleChange(e,'about')} value={data.about} 
                      invalid={error.errors
                       ?.response?.data?.about?true:false}
                      />
                       <FormFeedback>{error.errors?.response?.data?.about}</FormFeedback>

                    </FormGroup>
                    <Container className="text-center">
                      <Button color="light" outline>Register</Button>
                      <Button onClick={resetData} color="secondary" type="reset" className="ms-2">Reset</Button>

                    </Container>
                  </Form>
                </CardBody>
              </Card>

            </Col>
          </Row>

        </Container>
      </div>
    </Base>
  )
}

export default SignUp;
