import React from 'react';

import '../style.scss';

const Overlay = props => {
    return (
        <div className="page" style={{
            background: 'green',
        }}>
            <h1>Overlay Screen</h1>
            <input type="button" onClick={_ => {
                props.switcher.current.dismissOverlay()
            }} />
        </div>
    )
}

export default Overlay