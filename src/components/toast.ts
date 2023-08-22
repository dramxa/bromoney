import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const toast: UseToast = {
  success: function(text: string) {
    Toastify({
      text,
      style: {
        padding: '12px',
        background: '#2EA741',
        fontSize: '14px',
        fontWeight: '500',
        width: '100%',
        maxWidth: '300px',
        borderRadius: '6px'
      },
      offset: {
        x: 0,
        y: 70
      },
    }).showToast();
  },
  error: function(text: string) {
    Toastify({
      text,
      style: {
        padding: '12px',
        background: '#f43f5e',
        fontSize: '14px',
        fontWeight: '500',
        width: '100%',
        maxWidth: '300px',
        borderRadius: '6px'
      },
      offset: {
        x: 0,
        y: 70
      },
    }).showToast();
  }
}

export default toast

interface UseToast {
  success: Function
  error: Function
}