import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import AuthContext from '../../context'
const UserActivityWrapper = styled.div`
  grid-area: sidebar;
  overflowy: scroll;
  margin: 10px;
  padding: 10px;
  background: white;
  .activity-holder {
    box-shadow: 0px 0px 5px 2px grey;
    border-radius: 10px;
    height: 100%;
    width: 100%;
    padding: 10px;
    background: #fff9;
    .activity {
      width: 100%;
      height: 5%;
    }
  }
`
const UserActivity = () => {
  const [userActivity, setUserActivity] = useState([])
  const authContext = useContext(AuthContext)
  useEffect(() => {
    const headers = new Headers()
    headers.append('Content-type', 'application/json')
    headers.append('authorization', authContext.token)
    const options = { headers, method: 'GET' }
    fetch(
      `http://localhost:8000/api/v1/users/63fd8d10ab24cf7c77802d6a/posts`,
      options
    )
      .then((resp) => resp.json())
      .then((data) => setUserActivity((prev) => [...data.posts]))
      .catch((e) => console.log(e.message))
  }, [authContext.token])
  return (
    <UserActivityWrapper>
      <div className='activity-holder'>
        <h2>My Activity</h2>
        {userActivity.map((node) => {
          return (
            <div id={node._id} key={node._id} className='activity'>
              <h3>{node.title}</h3>
              <p>
                {node.meta.wordCount > 50
                  ? node.description.slice(0, 80) + '...'
                  : node.description}
              </p>
            </div>
          )
        })}
      </div>
    </UserActivityWrapper>
  )
}

export default UserActivity
