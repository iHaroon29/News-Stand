import React, { useEffect, useRef } from 'react'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import { SimpleImage, TextWithInline } from '../../utils/editorjs_plugin'
import '../../utils/editor.css'
const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: 'header',
      data: {
        text: 'Time to Blog!',
        level: 1,
      },
    },
    {
      type: 'paragraph',
      data: {
        text: 'begin shit',
      },
    },
  ],
}

const EditorComponent = (props) => {
  const ejInstance = useRef()

  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        ejInstance.current = editor
      },
      autofocus: true,
      data: DEFAULT_INITIAL_DATA,
      onChange: async () => {
        const data = await editor.saver.save()
        console.log(data)
      },
      tools: {
        header: Header,
        image: SimpleImage,
        ti: TextWithInline,
      },
    })
  }

  // This will run only once
  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor()
    }

    return () => {
      ejInstance?.current?.destroy()
      ejInstance.current = null
    }
  }, [])

  return (
    <>
      <div id='editorjs' style={{ ...props.style }}></div>
    </>
  )
}

export default EditorComponent
