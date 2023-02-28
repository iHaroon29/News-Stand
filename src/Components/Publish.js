import React, { useState, forwardRef } from 'react'

const Publish = forwardRef((props, ref) => {
  const socket = ref.current
  const reset = {
    title: '',
    subtitle: '',
    authorName: '',
    description: '',
    tags: [],
  }
  const [formData, setFormData] = useState(reset)
  const updateFormData = (e) => {
    if (e.target.id === 'tags') {
      const tagsArray = [...formData.tags]
      if (!tagsArray.includes(e.target.value)) {
        tagsArray.push(e.target.value)
        setFormData({ ...formData, tags: tagsArray })
      }
      return
    }
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleFormExachange = (e) => {
    e.preventDefault()
    socket.send(
      JSON.stringify({ requestType: 'publish', messageData: formData })
    )
    setFormData(reset)
  }
  const closeHandler = (e) => {
    e.preventDefault()
    const tagsArray = [...formData.tags]
    tagsArray.splice(e.target.id, 1)
    setFormData({ ...formData, tags: tagsArray })
  }

  return (
    <form onSubmit={handleFormExachange} ref={ref}>
      <label htmlFor='title'>Title : </label>{' '}
      <input
        type='text'
        id='title'
        value={formData.title}
        onChange={updateFormData}
      />
      <label htmlFor='subtitle'>Subtitle : </label>{' '}
      <input
        type='text'
        id='subtitle'
        value={formData.subtitle}
        onChange={updateFormData}
      />
      <label htmlFor='authorName'>Author : </label>{' '}
      <input
        type='text'
        id='authorName'
        value={formData.authorName}
        onChange={updateFormData}
      />
      <div className='select-option-holder'>
        {formData.tags.map((node, index) => {
          return (
            <div className='option-holder'>
              <p>
                {node}
                <span className='close-btn' id={index} onClick={closeHandler}>
                  - X
                </span>
              </p>
            </div>
          )
        })}
      </div>
      <label htmlFor='tags'>Tags : </label>
      <select
        name='tags'
        id='tags'
        value={formData.tags[formData.tags.length - 1]}
        onChange={updateFormData}
      >
        <option value='Gaming'>Gaming</option>
        <option value='History'>History</option>
        <option value='Art'>Art</option>
      </select>
      <label htmlFor='description'>Description : </label>{' '}
      <textarea
        name='description'
        id='description'
        cols='30'
        rows='10'
        value={formData.description}
        onChange={updateFormData}
      ></textarea>
      <button className='primary-btn' type='submit'>
        Submit
      </button>
    </form>
  )
})

export default Publish
