import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';
import Icon from '@mdi/react';
import { mdiAccount, mdiCloseCircle } from '@mdi/js';

import './style.scss';

const Notification = forwardRef((props, ref) => {

    const [showNotification, setShowNotification] = useState(false);

    const notificationRef = useRef(null);

    useEffect(_ => {
        setTimeout(() => {
            show(true);
        }, 100);
    }, [])

    useImperativeHandle(ref, _ => ({
        show: show,
        hide: hide
    }))

    const show = _ => {
        setShowNotification(true)
    }

    const hide = _ => {
        setShowNotification(false)
        setTimeout(() => {
            const parentNode = ReactDOM.findDOMNode(notificationRef.current).parentNode
            ReactDOM.unmountComponentAtNode(parentNode)
            parentNode.parentNode.removeChild(parentNode)
        }, 500);
    }

    const _handleDismissPressed = _ => {
        if (props.onDismiss) {
            props.onDismiss();
        }
        hide();
    }

    const _handleConfirmPressed = _ => {
        if (props.onConfirm) {
            props.onConfirm();
        }
        hide();
    }

    const shadow = '0 5px 10px 0 rgba(0,0,0,0.2)';

    return (
        <div ref={notificationRef} className={`Notification${props.darkMode ? ` darkMode` : ''}${showNotification ? ` show` : ''}`} id="Notification">
            <div className="blur"></div>
            <div className="bubble" style={{
                boxShadow: shadow,
                MozBoxShadow: shadow,
                WebkitBoxShadow: shadow,
            }}>
                <div className="content">
                    <h1>{props.title}</h1>
                    <hr />
                    <span>{props.message}</span>
                    {!props.isConfirm ?
                        <div className="dismiss" onClick={_handleDismissPressed} style={{
                            width: 36,
                            height: 36,
                        }}>
                            <Icon path={mdiCloseCircle}
                                title="Dismiss"
                                size={2}
                                color={props.darkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.75)"} />
                        </div>
                        : null}
                    {props.isConfirm ?
                        <div className="actions-container">
                            <div
                                className="action dismiss-action"
                                onClick={_handleDismissPressed}>
                                {props.dismissTitle}
                            </div>
                            <div
                                className="action confirm-action"
                                onClick={_handleConfirmPressed}>
                                {props.confirmTitle}
                            </div>
                        </div>
                        : null}
                </div>
            </div>
        </div>
    )
})

Notification.defaultProps = {
    title: "Notification Title",
    message: "Notification Message",
    darkMode: false,
    dismissTitle: "Dismiss",
    confirmTitle: "Confirm",
    isConfirm: false,
    onConfirm: null,
    onDismiss: null
}

export default Notification;