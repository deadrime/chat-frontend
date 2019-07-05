import { createElement as $ } from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import SubscribeToNewMessages from './SubscribeToNewMessages'
import CHAT_QUERY from '@/queries/CHAT_QUERY.gql'
import SendMessage from '@/components/SendMessage'

const ChatMembers = ({ members }) =>
  members.map(user =>
    $('div', { key: user.id }, user.username))

const ChatMessages = ({ messages, fetchMoreMessages }) => {
  const lastId = messages.length && messages[messages.length - 1].id
  
  return (
    $('div', null,
      messages.map(message =>
        $('div', { key: message.id }, message.text)),
      $('button', { onClick: () => fetchMoreMessages(lastId) }, 'Load more'))
  )
}

const fetchMoreMessages = (fetchMore, chatId, lastId) => fetchMore({
  variables: {
    chatId,
    lastId,
  },
  updateQuery: (prev, { fetchMoreResult }) => {
    if (!fetchMoreResult) return prev
    const newMessages = fetchMoreResult.chat.messages
    return {
      chat: {
        ...prev.chat,
        messages: [...prev.chat.messages, ...newMessages],
      },
    }
  }
})

const Main = ({ match }) =>
  $(Query, { query: CHAT_QUERY, variables: { chatId: match.params.id } },
    ({ fetchMore, loading, error, data }) => {
      if (loading) return 'Loading...'
      if (error) return 'Error'

      const { title, messages, members } = data.chat

      return (
        $('div', null,
          $(Link, { to: '/' }, '⇦ Back'),
          $('div', null, title),
          $(SubscribeToNewMessages, { chatIds: match.params.id, CHAT_QUERY }),
          $(ChatMembers, { members }),
          $(SendMessage, { chatId: match.params.id }),
          $(ChatMessages, {
            messages,
            fetchMoreMessages: lastId => fetchMoreMessages(fetchMore, match.params.id, lastId),
          }))
      )
    })

export default Main