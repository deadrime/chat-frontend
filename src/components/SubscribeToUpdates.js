import { createElement as $ } from 'react'
import { Subscription } from 'react-apollo'
import gql from 'graphql-tag'
import CHAT_QUERY from '@/queries/CHAT_QUERY.gql'

const UPDATES_SUBSCTIPTION = gql`
  subscription {
    update {
      type
      data {
        __typename
        ... on Message {
          id
          text
          chatId
        }
        ... on Chat {
          id
        }
      }
    }
  }
`

const updateChatCache = (client, chatId, message) => {
  // console.log(chat)
  client.writeQuery({
    query: CHAT_QUERY,
    data: {
      chat: {
        id: chatId,
        messages: [message],
      },
    }
  })
}

const SubscribeToUpdates = () =>
  $(Subscription, {
    subscription: UPDATES_SUBSCTIPTION,
    onSubscriptionData: ({ client, subscriptionData: { data: { update } } }) => {
      if (update.type === 'messageAdded') {
        const chatId = update.data.chatId
        updateChatCache(client, chatId, update.data)
      }
    }
  })

export default SubscribeToUpdates