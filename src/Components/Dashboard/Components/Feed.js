import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  grid-area: feeds;
  border-radius: 20px;
  box-shadow: 0px 0px 5px 1px #00000056;
  margin: 10px;
  overflow: scroll;
  padding: 10px;
  cursor: pointer;
  .feed {
    position: relative;
    border: 1px solid grey;
    margin: 10px;
    border-radius: 5px;
    padding: 10px;
  }
`
const Feed = (props) => {
  const { blogs } = props
  const navigate = useNavigate()
  const test = (e) => {
    const blogId = e.target.parentElement.id
    navigate(`/blog/${blogId}`)
  }

  return (
    <Wrapper>
      {blogs.map((node, index) => {
        return (
          <div
            className='feed'
            key={index + node.meta.wordCount}
            onClick={test}
            id={node.meta.userReferenceId}
          >
            <div
              className='overlay-test'
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
              }}
            ></div>
            <div className='feed-heading-holder'>
              <h2>{node.title}</h2>
              <div className='feed-meta-holder'>
                <p>
                  Author :{' '}
                  <span className='author-name'>{node.meta.authorName}</span>
                </p>
                <p>
                  Word Count :{' '}
                  <span className='word-count'>{node.meta.wordCount}</span>
                </p>
              </div>
              <div className='feed-description-holder'>
                <p>
                  {node.meta.wordCount > 10
                    ? node.description.slice(0, 80) + '...'
                    : node.description}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </Wrapper>
  )
}

export default Feed
