import { createElement as $ } from 'react'
import MyChats from '@/components/MyChats'
import { Query } from 'react-apollo'
import MY_CHATS from '@/queries/MY_CHATS.gql'
import SubscribeToNewMessages from './SubscribeToNewMessages'

const Main = () =>
  $(Query, { query: MY_CHATS },
    ({ loading, error, data }) => {
      if (loading) return 'Loading...'
      if (error) return 'Error'

      const chats = data.myChats

      return (
        $('div', null,
          $(SubscribeToNewMessages, { chatIds: chats.map(i => i.id) }),
          $(MyChats, { data: chats })
        ))
    })

export default Main