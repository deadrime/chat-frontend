import { createElement as $, useState, Fragment } from 'react'
import SEND_MESSAGE from '@/queries/SEND_MESSAGE.gql'
import { Mutation } from 'react-apollo'

const SendMessage = ({ chatId }) => {
  const [text, setText] = useState('')

  const handleChangeText = e => setText(e.target.value)
  const handleSendMessage = sendMessage => {
    sendMessage({ variables: { chatId, text } })
    setText('') 
  }

  return (
    $(Mutation, { 
      mutation: SEND_MESSAGE,
    },
    (sendMessage) =>
      $(Fragment, null,
        $('input', { placeholder: 'Message text', value: text, onChange: handleChangeText }),
        $('button', { onClick: () => handleSendMessage(sendMessage) }, 'Send message')))
  )
}

export default SendMessage