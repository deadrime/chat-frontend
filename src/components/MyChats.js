import { createElement as $ } from 'react'
import { Link } from 'react-router-dom'
import AddChat from './CreateNewChat'


const MyChats = ({ data }) =>
  $('div', null,
    data.map(chat =>
      $(Link, { to: `/chat/${chat.id}`, key: chat.id },
        $('div', null,
          $('span', null, chat.title),
          $('span', null, chat.messages[0] && chat.messages[0].text))
      )),
    $(AddChat),
  )


export default MyChats