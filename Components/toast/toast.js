import React, {useCallback, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';


const Toast = ({message, setMessage}) => {
    useEffect(
        () => {
            if(message ){
                switch (message.type) {
                    case 'success':
                        console.log('success');
                        toast.success(message.text)
                        break;
                    case 'info':
                        console.log('info');
                        toast.info(message.text)
                        break;
                    case 'warning':
                        console.log('warning');
                        toast.warning(message.text)
                        break;
                    case 'error':
                        console.log('error');
                        toast.error(message.text)
                        break;
                    case 'dark':
                        console.log('dark');
                        toast.dark(message.text)
                        break;
                    default:
                        console.log('default');
                        break;
                }
                setMessage(null);
            };
    }, [message])

    return (
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    )
}

export default Toast;