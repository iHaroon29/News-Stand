class SimpleImage {
  static get toolbox() {
    return {
      title: 'Image',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
    }
  }

  static get pasteConfig() {
    return {
      tags: ['IMG'],
      files: {
        mimeTypes: ['image/*'],
        extensions: ['gif', 'jpg', 'png'], // You can specify extensions instead of mime-types
      },
      patterns: {
        image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png)$/i,
      },
    }
  }

  static get sanitize() {
    return {
      url: {},
      caption: {
        b: true,
        a: {
          href: true,
        },
        i: true,
      },
    }
  }

  constructor({ data, api, config }) {
    this.api = api
    this.config = config || {}
    this.data = {
      url: data.url || '',
      caption: data.caption || '',
      withBorder: data.withBorder !== undefined ? data.withBorder : false,
      withBackground:
        data.withBackground !== undefined ? data.withBackground : false,
      stretched: data.stretched !== undefined ? data.stretched : false,
      delete: false,
    }

    this.wrapper = undefined
    this.settings = [
      {
        name: 'withBorder',
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8 10.592v2.043h2.35v2.138H15.8v2.232h-2.25v-2.232h-2.4v-2.138h2.4v-2.28h2.25v.237h1.15-1.15zM1.9 8.455v-3.42c0-1.154.985-2.09 2.2-2.09h4.2v2.137H4.15v3.373H1.9zm0 2.137h2.25v3.325H8.3v2.138H4.1c-1.215 0-2.2-.936-2.2-2.09v-3.373zm15.05-2.137H14.7V5.082h-4.15V2.945h4.2c1.215 0 2.2.936 2.2 2.09v3.42z"/></svg>`,
      },
      {
        name: 'stretched',
        icon: `<svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg"><path d="M13.568 5.925H4.056l1.703 1.703a1.125 1.125 0 0 1-1.59 1.591L.962 6.014A1.069 1.069 0 0 1 .588 4.26L4.38.469a1.069 1.069 0 0 1 1.512 1.511L4.084 3.787h9.606l-1.85-1.85a1.069 1.069 0 1 1 1.512-1.51l3.792 3.791a1.069 1.069 0 0 1-.475 1.788L13.514 9.16a1.125 1.125 0 0 1-1.59-1.591l1.644-1.644z"/></svg>`,
      },
      {
        name: 'withBackground',
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.043 8.265l3.183-3.183h-2.924L4.75 10.636v2.923l4.15-4.15v2.351l-2.158 2.159H8.9v2.137H4.7c-1.215 0-2.2-.936-2.2-2.09v-8.93c0-1.154.985-2.09 2.2-2.09h10.663l.033-.033.034.034c1.178.04 2.12.96 2.12 2.089v3.23H15.3V5.359l-2.906 2.906h-2.35zM7.951 5.082H4.75v3.201l3.201-3.2zm5.099 7.078v3.04h4.15v-3.04h-4.15zm-1.1-2.137h6.35c.635 0 1.15.489 1.15 1.092v5.13c0 .603-.515 1.092-1.15 1.092h-6.35c-.635 0-1.15-.489-1.15-1.092v-5.13c0-.603.515-1.092 1.15-1.092z"/></svg>`,
      },
      {
        name: 'delete',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" height="17"><g id="_01_align_center" data-name="01 align center"><path d="M22,4H17V2a2,2,0,0,0-2-2H9A2,2,0,0,0,7,2V4H2V6H4V21a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V6h2ZM9,2h6V4H9Zm9,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V6H18Z"/><rect x="9" y="10" width="2" height="8"/><rect x="13" y="10" width="2" height="8"/></g></svg>`,
      },
    ]
  }

  render() {
    this.wrapper = document.createElement('div')
    this.wrapper.classList.add('simple-image')
    if (this.data && this.data.url) {
      this._createImage(this.data.url, this.data.caption)
      return this.wrapper
    }
    const input = document.createElement('input')
    input.placeholder = this.config.placeholder || 'Paste an image URL...'
    input.addEventListener('paste', (event) => {
      this._createImage(event.clipboardData.getData('text'))
    })
    this.wrapper.appendChild(input)
    return this.wrapper
  }

  _createImage(url, captionText) {
    const image = document.createElement('img')
    const caption = document.createElement('div')
    image.src = url
    image.setAttribute('crossorigin', 'anonymous')
    caption.contentEditable = true
    caption.innerHTML = captionText || ''
    this.wrapper.innerHTML = ''
    this.wrapper.appendChild(image)
    this.wrapper.appendChild(caption)
    this._acceptTuneView()
  }

  save(blockContent) {
    const image = blockContent.querySelector('img')
    if (!image) return
    const caption = blockContent.querySelector('[contenteditable]')
    return Object.assign(this.data, {
      url: image.src,
      caption: caption.innerHTML || '',
    })
  }

  validate(savedData) {
    if (!savedData.url.trim()) {
      return false
    }
    return true
  }

  renderSettings() {
    const wrapper = document.createElement('div')
    this.settings.forEach((tune) => {
      let button = document.createElement('div')
      button.classList.add(this.api.styles.settingsButton)
      button.classList.toggle(
        this.api.styles.settingsButtonActive,
        this.data[tune.name]
      )
      button.innerHTML = tune.icon
      wrapper.appendChild(button)
      button.addEventListener('click', () => {
        this._toggleTune(tune.name)
        button.classList.toggle(this.api.styles.settingsButtonActive)
      })
    })

    return wrapper
  }

  _toggleTune(tune) {
    this.data[tune] = !this.data[tune]
    if (tune === 'delete') {
      this._deleteRequest()
      return this.api.blocks.delete()
    }
    this._acceptTuneView()
  }

  _acceptTuneView() {
    this.settings.forEach((tune) => {
      this.wrapper.classList.toggle(tune.name, !!this.data[tune.name])

      if (tune.name === 'stretched') {
        this.api.blocks.stretchBlock(
          this.api.blocks.getCurrentBlockIndex(),
          !!this.data.stretched
        )
      }
    })
  }

  async _makeRequest(dataURI) {
    try {
      const headers = new Headers()
      headers.append('Authorization', `Bearer ${this.config.token}`)
      headers.append('Content-type', 'application/json')
      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ upload: dataURI }),
        redirect: 'follow',
      }
      const resp = await fetch(
        `http://localhost:8000/api/v1/users/${this.config.userId}/image`,
        requestOptions
      )
      return await resp.json()
    } catch (e) {
      console.log(e.message)
    }
  }

  async _deleteRequest() {
    try {
      const img = this.wrapper.querySelector('img')
      if (!img) {
        return
      }
      const headers = new Headers()
      headers.append('Authorization', `Bearer ${this.config.token}`)
      const imageName = img.src.split('/').slice(-1)
      const resp = await fetch(
        `http://localhost:8000/api/v1/users/${this.config.userId}/image?imageName=${imageName}`,
        { headers, method: 'DELETE' }
      )
      return await resp.json()
    } catch (e) {
      console.log(e.message)
    }
  }

  onPaste(event) {
    switch (event.type) {
      case 'tag':
        const imgTag = event.detail.data
        this._createImage(imgTag.src)
        break
      case 'file':
        const file = event.detail.file
        const reader = new FileReader()
        reader.onload = async (loadEvent) => {
          const { url } = await this._makeRequest(loadEvent.target.result)
          this._createImage(url, 'Cool')
        }
        reader.readAsDataURL(file)
        break
      case 'pattern':
        const src = event.detail.data
        this._createImage(src)
        break
      default: {
        console.log('here')
      }
    }
  }
}

//text plugin

class Text {
  constructor({ data }) {
    this.data = {
      text: data.text || '',
      leftAlign: data.leftAlign !== undefined ? data.leftAlign : false,
      rightAlign: data.rightAlign !== undefined ? data.rightAlign : false,
      center: data.center !== undefined ? data.center : false,
      justify: data.justify !== undefined ? data.justify : false,
    }
    this.wrapper = undefined
    this.settings = [
      {
        name: 'leftAlign',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="17" height="17"><path d="M1,6H23a1,1,0,0,0,0-2H1A1,1,0,0,0,1,6Z"/><path d="M1,11H15a1,1,0,0,0,0-2H1a1,1,0,0,0,0,2Z"/><path d="M15,19H1a1,1,0,0,0,0,2H15a1,1,0,0,0,0-2Z"/><path d="M23,14H1a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z"/></svg>`,
      },
      {
        name: 'rightAlign',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="17" height="17"><path d="M1,6H23a1,1,0,0,0,0-2H1A1,1,0,0,0,1,6Z"/><path d="M23,9H9a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z"/><path d="M23,19H9a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z"/><path d="M23,14H1a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z"/></svg>`,
      },
      {
        name: 'center',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="17" height="17"><path d="M1,6H23a1,1,0,0,0,0-2H1A1,1,0,0,0,1,6Z"/><path d="M5,9a1,1,0,0,0,0,2H19a1,1,0,0,0,0-2Z"/><path d="M19,19H5a1,1,0,0,0,0,2H19a1,1,0,0,0,0-2Z"/><path d="M23,14H1a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z"/></svg>`,
      },
      {
        name: 'justify',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="17" height="17"><path d="M1,6H23a1,1,0,0,0,0-2H1A1,1,0,0,0,1,6Z"/><path d="M23,9H1a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z"/><path d="M23,19H1a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z"/><path d="M23,14H1a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z"/></svg>`,
      },
    ]
  }
  static get toolbox() {
    return {
      title: 'Text Block',
      icon: '<svg fill="#000000" width="17px" height="17px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><path d="M247 0h1426.286v501.943h-202.972V202.97H1072.6v1514.06h301.714V1920H543.23v-202.971h301.714V202.97H449.97v298.972H247z" fill-rule="evenodd"/></svg>',
    }
  }

  renderSettings() {
    try {
      const wrapper = document.createElement('div')
      this.settings.forEach((tune) => {
        let button = document.createElement('div')
        button.classList.add('cdx-settings-button')
        button.classList.toggle(
          'cdx-settings-button--active',
          this.data[tune.name]
        )
        button.innerHTML = tune.icon
        button.addEventListener('click', (e) => {
          this._tuneSetting(tune.name, wrapper)
          button.classList.toggle(
            'cdx-settings-button--active',
            this.data[tune.name]
          )
        })
        wrapper.appendChild(button)
      })
      return wrapper
    } catch (e) {
      console.log(e)
    }
  }

  save(blockContent) {
    return Object.assign(this.data, { text: blockContent.innerHTML })
  }
  render() {
    this.wrapper = this._createDiv()

    if (this.data && this.data.text) {
      return (this.wrapper = this._createText(this.data))
    }
    return this.wrapper
  }
  validate(savedData) {
    if (!savedData.text.trim()) {
      return false
    }
    return true
  }
  _createText({ text }) {
    const div = this._createDiv()
    div.innerText = text || ''
    this._acceptTune()
    return div
  }
  _createDiv() {
    this.wrapper = document.createElement('div')
    this.wrapper.classList.add('ce-paragraph', 'cdx-block', 'custom-text')
    this.wrapper.contentEditable = true
    return this.wrapper
  }
  _tuneSetting(tune, wrapper) {
    for (let i in this.data) {
      if (i === tune) {
        this.data[tune] = !this.data[tune]
      } else {
        this.data[i] = false
      }
    }
    ;[...wrapper.children].forEach((node) => {
      if (node.classList.contains('cdx-settings-button--active')) {
        node.classList.remove('cdx-settings-button--active')
      }
    })

    this._acceptTune()
  }
  _acceptTune() {
    this.settings.forEach((tune) => {
      this.wrapper.classList.toggle(tune.name, !!this.data[tune.name])
    })
  }
}

export { SimpleImage, Text }
