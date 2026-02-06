import { useEffect, useRef } from 'react';

interface WebSocketMessage {
  type: string;
  message: any;
}

interface UseWebSocketOptions {
  url: string;
  onMessage?: (data: WebSocketMessage) => void;
  onError?: (error: Event) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

export const useWebSocket = ({
  url,
  onMessage,
  onError,
  onOpen,
  onClose,
}: UseWebSocketOptions) => {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;
  const baseReconnectDelay = 1000;

  useEffect(() => {
    let isMounted = true;

    const connect = () => {
      if (!isMounted || wsRef.current?.readyState === WebSocket.OPEN) return;

      const ws = new WebSocket(url);

      ws.onopen = () => {
        if (isMounted) {
          console.log('WebSocket connected');
          reconnectAttemptsRef.current = 0;
          onOpen?.();
        }
      };

      ws.onmessage = (event) => {
        if (isMounted) {
          try {
            const data = JSON.parse(event.data);
            onMessage?.(data);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        }
      };

      ws.onerror = (error) => {
        if (isMounted) {
          console.error('WebSocket error:', error);
          onError?.(error);
        }
      };

      ws.onclose = () => {
        if (isMounted) {
          console.log('WebSocket disconnected');
          onClose?.();

          if (reconnectAttemptsRef.current < maxReconnectAttempts) {
            const delay = baseReconnectDelay * Math.pow(2, reconnectAttemptsRef.current);
            console.log(`Reconnecting in ${delay}ms (attempt ${reconnectAttemptsRef.current + 1}/${maxReconnectAttempts})`);
            reconnectAttemptsRef.current++;
            reconnectTimeoutRef.current = setTimeout(connect, delay);
          }
        }
      };

      wsRef.current = ws;
    };

    connect();

    return () => {
      isMounted = false;
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [url, onMessage, onError, onOpen, onClose]);
};
