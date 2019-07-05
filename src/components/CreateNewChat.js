import { createElement as $, useState, Fragment } from 'react'
import MY_CHATS from '@/queries/MY_CHATS.gql'
import ADD_CHAT from '@/queries/ADD_CHAT.gql'
import { Mutation } from 'react-apollo'

const addChatToCache = (cache, result) =>
  cache.writeQuery({
    query: MY_CHATS,
    data: {
      myChats: [
        ...cache.readQuery({ query: MY_CHATS }).myChats,
        result.data.createChat
      ]
    }
  })

const AddChat = () => {
  const [title, setTitle] = useState('')

  const handleChangeTitle = e => setTitle(e.target.value) 
  const handleCreateChat = createChat => {
    createChat({ variables: { title } })
    setTitle('') 
  }

  return (
    $(Mutation, { 
      mutation: ADD_CHAT,
      update: addChatToCache
    },
    (createChat) =>
      $(Fragment, null,
        $('input', { placeholder: 'Chat title', value: title, onChange: handleChangeTitle }),
        $('button', { onClick: () => handleCreateChat(createChat) }, 'Add chat')))
  )
}

export default AddChat