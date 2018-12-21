import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

export const host = process.env.VUE_APP_SERVER_URL

console.log(host)

const socket = io(host, {
  transports: ['websocket'],
  extraHeaders: {
    origin: origin || ''
  }
})

const feathersClient = feathers()
  .configure(socketio(socket))

export default feathersClient
