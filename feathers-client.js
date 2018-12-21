import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

export const host = process.env.NODE_ENV === 'production' ? process.env.SERVER_URL : 'http://localhost:3030'

const socket = io(host, {
  transports: ['websocket'],
  extraHeaders: {
    origin: origin || ''
  }
})

const feathersClient = feathers()
  .configure(socketio(socket))

export default feathersClient
