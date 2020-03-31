import React from 'react';
import ReactDOM from 'react-dom';
import Notification from '.';

const Notifications = {

    show: (title, message, options) => {
        let notificationContainer = document.createElement('div')
        document.getElementById('App').appendChild(notificationContainer)
        ReactDOM.render(
            <Notification title={title} message={message} darkMode={options.darkMode} />,
            notificationContainer
        )
    },

}

export default Notifications