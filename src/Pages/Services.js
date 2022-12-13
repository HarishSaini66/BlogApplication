import React from 'react'
import Base from '../Components/Base'
import userContext from '../context/userContext'

function Services() {
  return (
    <userContext.Consumer>
      {
        (user) => (
          <Base>
            <div>
              <h1>This is servies</h1>
              <h1>Welcome {user.user.login &&user.user.data.user.name}</h1>
            </div>
          </Base>
        )
      }
    </userContext.Consumer>
  )
}

export default Services
