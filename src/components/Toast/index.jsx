import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';

import './style.scss';

const Toast = forwardRef((props, ref) => {

    const [showToast, setShowToast] = useState(false);

    const toastRef = useRef(null);

    useEffect(_ => {
        setTimeout(_ => {
            show(true);
            setTimeout(_ => {
                hide()
            }, props.duration || 2000)
        }, 100);

    }, [])

    useImperativeHandle(ref, _ => ({
        show: show,
        hide: hide
    }))

    const show = _ => {
        setShowToast(true)
    }

    const hide = _ => {
        setShowToast(false)
        setTimeout(() => {
            const parentNode = ReactDOM.findDOMNode(toastRef.current).parentNode
            ReactDOM.unmountComponentAtNode(parentNode)
            parentNode.parentNode.removeChild(parentNode)
        }, 500);
    }

    return (
        <div ref={toastRef} className={`Toast${showToast ? ` show` : ''}`} id="Toast">
            <div className="content">
                {props.message}
            </div>
        </div>
    )
})

export default Toast;