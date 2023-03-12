import React, { useEffect, useRef, useContext } from 'react'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import { toast } from 'react-toastify'
import AuthContext from '../../context'
import { Button } from '../../Components'
import { axiosInstance } from '../../utils/httpRequest'
import { Text, SimpleImage } from '../../utils/editorjs_plugin'
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
      type: 'text',
      data: {
        text: 'begin shit',
      },
    },
  ],
}

const EditorComponent = (props) => {
  const ejInstance = useRef()
  const { auth } = useContext(AuthContext)
  const initEditor = () => {
    try {
      const editor = new EditorJS({
        holder: 'editorjs',
        onReady: () => {
          ejInstance.current = editor
        },
        autofocus: true,
        data: DEFAULT_INITIAL_DATA || {},
        onChange: async () => {
          console.log(await editor.saver.save())
        },
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
          },
          image: {
            class: SimpleImage,
            inlineToolbar: true,
            config: {
              token: auth.token,
              userId: auth.userId,
            },
          },
          text: {
            class: Text,
            inlineToolbar: true,
          },
        },
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  const publishData = async () => {
    try {
      const data = await ejInstance.current.saver.save()

      const resp = await axiosInstance({
        url: `http://localhost:8000/api/v1/users/${auth.userId}/posts`,
        method: 'POST',

        data: {
          title: 'Haroon',
          tags: [1, 2, 3, 4],
          jsonData: JSON.stringify(data),
        },
        headers: {
          authorization: `Bearer ${auth.token}`,
          ...data.getHeaders(),
        },
      })
      if (resp instanceof Error) {
        throw new Error(resp.message)
      }
      console.log(resp)
    } catch (e) {
      toast.error(e.message, {
        position: toast.POSITION.TOP_LEFT,
      })
    }
  }
  const draftData = async () => {
    await ejInstance.current.saver.save()
  }
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
      <div id='editorjs'></div>
      <div className='button-holder'>
        <Button className='save-btn' onClick={publishData} primary={true}>
          Publish
        </Button>
        <Button className='draft-btn' onClick={draftData} primary={true}>
          Draft
        </Button>
      </div>
    </>
  )
}

export default EditorComponent
