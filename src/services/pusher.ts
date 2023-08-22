import Pusher from "pusher-js";
import Echo from "laravel-echo";

declare global {
  interface Window {
    Pusher: any
    Echo: any
  }
}

export default function initPusher(): void {
    window.Pusher = Pusher;
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: import.meta.env.VITE_PUSHER_KEY,
        cluster: 'mt1',
        forceTLS: true,
        encrypted: false,
        wsHost: import.meta.env.VITE_PUSHER_HOST,
        wssHost: import.meta.env.VITE_PUSHER_HOST,
        wsPort: 6001,
        wssPort: 6001,
        pongTimeout: 500,
        disableStats: true,
        enabledTransports: ['ws', 'wss']
    });
}