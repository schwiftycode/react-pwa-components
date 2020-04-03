import React from 'react';
import ReactDOM from 'react-dom';
import Toast from '.';

const Toasts = {

    show: (message, options) => {
        options = options || {}
        let toastContainer = document.createElement('div')
        document.getElementById('App').appendChild(toastContainer)
        ReactDOM.render(
            <Toast
                message={message}
                duration={options.duration} />,
            toastContainer
        )
    }

}

export default Toasts