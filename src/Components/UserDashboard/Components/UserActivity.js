import React from 'react'
import styled from 'styled-components'

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
const UserActivity = (props) => {
  return (
    <UserActivityWrapper>
      <div className='activity-holder'>
        <h2>My Activity</h2>
        {props.posts.map((node) => {
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
