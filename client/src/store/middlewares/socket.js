import io from 'socket.io-client';
import {
  SOCKET_LEAVE,
  SOCKET_EMIT,
  SOCKET_LISTENER,
  SOCKET_REMOVE_LISTENER,
} from 'store/socket/socketActions';

export default function socketMiddleware() {
  const socket = io(process.env.REACT_APP_SOCKET_ADDRESS);

  return ({ dispatch }) => next => action => {
    if (typeof action === 'function') {
      return next(action);
    }
    const {
      event, type, handler, payload, ...rest
    } = action;

    if (!event) {
      return next(action);
    }
    switch (type) {
      case SOCKET_LEAVE:
        console.log('%c SOCKET LEAVE', 'background:#FFA09E', event);
        socket.removeListener(event);
        break;
      case SOCKET_EMIT:
        console.log('%c SOCKET EMIT', 'background:#90D6E8', event, {
          ...payload,
          ...rest,
        });
        if (handler) {
          socket.emit(event, { ...payload, ...rest }, handler);
        } else {
          socket.emit(event, { ...payload, ...rest });
        }
        break;
      case SOCKET_LISTENER:
        socket.on(event, data => {
          if (data.error) {
            dispatch({ type: 'ERROR', payload: data.error });
            return;
          }
          console.log('%c SOCKET LISTENER', 'background:#C1FFAB', event, data);
          const readyData = { data, socketId: socket.id };
          handler(readyData);
        });

        break;
      case SOCKET_REMOVE_LISTENER:
        socket.off(event);
        break;
      default:
        throw Error('No type defined');
    }

    return next(action);
  };
}

// PoC of key lookup with functions
/**
 *     const types = {};
    types[SOCKET_LEAVE] = () => {
      // console.log("types socket leave");
    };
    types[SOCKET_EMIT] = () => {
      // console.log("types socket emit");
    };
    types[SOCKET_LISTENER] = () => {
      // console.log("types socket listener");
    };
    types[type]();

 */
