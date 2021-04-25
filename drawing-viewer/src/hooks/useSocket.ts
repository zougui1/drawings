import { io } from 'socket.io-client';
import { useEffect } from 'react';

import { SOCKET_URL, SOCKET_URL_FALLBACK } from '../constants';

const socketUrl = window.location.hostname === 'localhost'
  ? SOCKET_URL
  : SOCKET_URL_FALLBACK;

const socket = io(socketUrl, { transports: ['websocket'] });

export const useSocket = (event: string, listener: (data: unknown) => any, dependencies: any[] = []): void => {
  useEffect(() => {
    socket.on(event, listener);

    return () => {
      socket.off(event, listener);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
