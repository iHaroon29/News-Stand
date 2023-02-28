import React, { useState, useEffect } from 'react'
import { Button } from './Components'
const tags = ['Gaming', 'History', 'Art', 'Science', 'Technology', 'LifeStyle']
const tagsUser = ['Gaming', 'History']
const Tags = () => {
  const [active, setActive] = useState(false)
  const [userTags, setUserTags] = useState(tagsUser)
  return (
    <div className='tags-section-wrapper'>
      <div className='tags-holder'>
        {tags.map((node) => {
          const commonTag = tagsUser.find((tag) => tag === node)
          if (!commonTag) {
            return (
              <div className='tag'>
                <span>{node}</span>
              </div>
            )
          }
        })}
      </div>
      <div className='tags-section-btn'>
        {tags.length === 0 ? (
          <Button primary={true} />
        ) : (
          <button>Update</button>
        )}
      </div>
    </div>
  )
}

export default Tags
