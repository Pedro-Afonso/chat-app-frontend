export const Environment = {
  /*
   * Configures the path to the messages api
   */
  messagesBaseUrl: apiUrl('api/messages'),
  /*
   * Configures the path to the users api
   */
  usersBaseUrl: apiUrl('api/users'),
  /*
   * Configures the path to the chats api
   */
  chatsBaseUrl: apiUrl('api/chats')
}

//  This function joins return base url
function apiUrl(path?: string) {
  // const url = import.meta.env.VITE_APP_API_CHAT_baseUrl
  const url = 'http://localhost:5000'

  // if (!url) {
  //   const message =
  //     "Can't locate VITE_APP_API_CHAT_URL. Make sure it is defined in .env"
  //   throw new Error(message)
  // }

  if (path) {
    return url + '/' + path
  }

  return url
}
