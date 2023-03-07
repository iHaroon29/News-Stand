class SimpleImage {
  static get toolbox() {
    return {
      title: 'Image',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
    }
  }
  constructor({ data }) {
    this.data = data
    this.wrapper = undefined
  }
  render() {
    console.log('here')
    this.wrapper = document.createElement('div')
    const input = document.createElement('input')
    if (this.data && this.data.url) {
      this._createImage(this.data.url, this.data.caption)
      return this.wrapper
    }
    this.wrapper.classList.add('simple-image')
    this.wrapper.appendChild(input)
    input.value = this.data && this.data.url ? this.data.url : ''
    input.addEventListener('paste', (e) => {
      this._createImage(e.clipboardData.getData('text'))
    })
    return this.wrapper
  }

  _createImage(url) {
    const image = document.createElement('img')
    const caption = document.createElement('input')

    image.src = url
    caption.placeholder = 'Caption...'

    this.wrapper.innerHTML = ''
    this.wrapper.appendChild(image)
    this.wrapper.appendChild(caption)
  }
  save(blockContent) {
    const image = blockContent.querySelector('img')
    const caption = blockContent.querySelector('input')

    return {
      url: image.src,
      caption: caption.value,
    }
  }

  validate(savedData) {
    if (!savedData.url.trim()) {
      return false
    }

    return true
  }
}

class TextWithInline {
  constructor({ data }) {
    this.data = data
    this.wrapper = undefined
  }
  static get toolbox() {
    return {
      title: 'TextWithSize',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
    }
  }
  save(blockContent) {
    return { text: blockContent.querySelector('div').innerText }
  }
  render() {
    this.wrapper = document.createElement('div')
    const textarea = document.createElement('div')
    if (this.data && this.data.text) {
      console.log('here')
      this._createText(this.data.text)
      return this.wrapper
    }
    this.wrapper.classList.add('text-with-size')
    textarea.style.overflowWrap = 'break-word'
    textarea.contentEditable = true
    this.wrapper.appendChild(textarea)
    return this.wrapper
  }
  validate(savedData) {
    if (!savedData.text.trim()) {
      return false
    }
    return true
  }
  _createText(text) {
    const div = document.createElement('div')
    div.contentEditable = false
    div.innerText(text)
    return div
  }
}

export { SimpleImage, TextWithInline }
