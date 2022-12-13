
import { useContext } from "react";
import Base from "../Components/Base";
import userContext from "../context/userContext";

const About = () => {
  const user = useContext(userContext)
  return (
    <userContext.Consumer>
      {(Object) => (
        <Base>
          <h2>This is about page</h2>
          <p>We are building the blog website</p>
          {console.log(Object)}
          <h1>Welcome user:{Object.user && Object.user.data.user.name}</h1>
        </Base>
      )

      }
    </userContext.Consumer>
  )
}

export default About;
