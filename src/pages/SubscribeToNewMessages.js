import { createElement as $ } from 'react'
import { Subscription } from 'react-apollo'
import gql from 'graphql-tag'
import CHAT_QUERY from '@/queries/CHAT_QUERY.gql'

const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription newMessage($chatIds: [ID]) {
    newMessage(chatIds: $chatIds) {
      id
      text
      chatId
    }
  }
`

const SubscribeToNewMessages = ({ chatIds }) => {
  console.log({ chatIds })

  return $(Subscription, {
    subscription: NEW_MESSAGE_SUBSCRIPTION,
    variables: { chatIds },
    onSubscriptionData: ({ client, subscriptionData: { data: { newMessage } } }) => {
      console.log({ newMessage })
      const { chat } = client.readQuery({ query: CHAT_QUERY, variables: { chatId: newMessage.chatId } })
    
      client.writeQuery({
        query: CHAT_QUERY,
        data: {
          chat: {
            ...chat,
            messages: [newMessage, ...chat.messages],
          },
        }
      })
    }
  })
}

export default SubscribeToNewMessages