import React from 'react'

const Feed = (props) => {
  return props.updates.map((node, index) => {
    return (
      <div className='feed' key={index + node.meta.wordCount}>
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
              <a href='#'> Read More</a>
            </p>
          </div>
        </div>
      </div>
    )
  })
}

export default Feed
