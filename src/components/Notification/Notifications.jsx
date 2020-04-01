import React from 'react';
import ReactDOM from 'react-dom';
import Notification from '.';

const Notifications = {

    show: (title, message, options) => {
        let notificationContainer = document.createElement('div')
        document.getElementById('App').appendChild(notificationContainer)
        ReactDOM.render(
            <Notification
                title={title}
                message={message}
                darkMode={options.darkMode} />,
            notificationContainer
        )
    },

    showConfirm: (title, message, onConfirm, onDismiss, options) => {
        let notificationContainer = document.createElement('div')
        document.getElementById('App').appendChild(notificationContainer)
        ReactDOM.render(
            <Notification
                title={title}
                message={message}
                onConfirm={onConfirm}
                onDismiss={onDismiss}
                darkMode={options.darkMode}
                dismissTitle={options.dismissTitle}
                confirmTitle={options.confirmTitle}
                isConfirm />,
            notificationContainer
        )
    },

}

export default Notifications