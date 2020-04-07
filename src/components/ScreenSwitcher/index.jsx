import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Animations from '../Scripts/Animations';
import Easings from '../Scripts/Easings';

import './style.scss';

const ScreenNavigator = forwardRef((props, ref) => {

    // Props
    let { initialScreen, screens } = props

    // State variables
    const [currentScreen, setCurrentScreen] = useState(null)
    const [nextScreen, setNextScreen] = useState(null)
    const [overlayScreen, setOverlayScreen] = useState(null)

    // Refs
    const rootContainer = useRef(null)
    const currentScreenContainer = useRef(null)
    const nextScreenContainer = useRef(null)
    const overlayScreenContainer = useRef(null)

    // locals
    let anim = null;
    let animationStart = 0

    useEffect(_ => {
        Object.keys(screens).forEach(key => {
            addScreenToDOM(key, screens[key])
        })
    }, [])

    useImperativeHandle(ref, _ => ({
        switchTo: (screenName, animation, duration, easing, previousState) => {
            // Ensure all properties have values
            screenName = screenName || Object.keys(screens)[0]
            animation = animation || Animations.Fade
            duration = duration || 500
            easing = easing || Easings.linearTween

            // Prepare for Animation
            setNextScreen(screenName)
            let now = new Date().getTime();
            animationStart = now

            startAnimation(currentScreenContainer, nextScreenContainer, animation, duration, easing)

            // Clean Up
            setTimeout(_ => {
                setCurrentScreen(screenName)
                clearInterval(anim)
                resetAnimationParams()
                setNextScreen(null)
            }, duration + 100)
        },
        presentOverlay: (screenName, animation, duration, easing) => {
            // Ensure all properties have values
            screenName = screenName || Object.keys(screens)[0]
            animation = animation || Animations.Fade
            duration = duration || 500
            easing = easing || Easings.linearTween

            // Prepare for Animation
            setOverlayScreen(screenName)
            let now = new Date().getTime();
            animationStart = now

            startAnimation(null, overlayScreenContainer, animation, duration, easing)

            // Clean Up
            setTimeout(_ => {
                clearInterval(anim)
                resetAnimationParams()
            }, duration + 100)
        },
        dismissOverlay: (animation, duration, easing) => {
            // Ensure all properties have values
            animation = animation || Animations.Fade
            duration = duration || 500
            easing = easing || Easings.linearTween

            // Prepare for Animation
            let now = new Date().getTime();
            animationStart = now

            startAnimation(overlayScreenContainer, null, animation, duration, easing)

            // Clean Up
            setTimeout(_ => {
                setOverlayScreen(null)
                clearInterval(anim)
                resetAnimationParams()
            }, duration + 100)
        },
    }))

    const startAnimation = (cScreen, nScreen, animation, duration, easing) => {
        switch (animation) {
            case Animations.SlideFromRight:
                animateSlideFromRight(cScreen, nScreen, duration, easing);
                break;
            case Animations.SlideFromLeft:
                animateSlideFromLeft(cScreen, nScreen, duration, easing);
                break;
            case Animations.SlideFromBottom:
                animateSlideFromBottom(cScreen, nScreen, duration, easing);
                break;
            case Animations.SlideFromTop:
                animateSlideFromTop(cScreen, nScreen, duration, easing);
                break;
            case Animations.Fade:
            default:
                animateFade(cScreen, nScreen, duration, easing);
                break;
        }
    }

    const animateSlideFromRight = (cScreen, nScreen, duration, easing) => {
        // Prepare for animation
        if (cScreen) {
            cScreen.current.style.opacity = 1
            cScreen.current.style.transform = 'translate(0, 0)'
        }
        if (nScreen) {
            nScreen.current.style.opacity = 1
            nScreen.current.style.transform = 'translate(100vw, 0)'
        }
        // Execute animation
        anim = setInterval(_ => {
            if (cScreen) {
                cScreen.current.style.transform = `translate(${animPosition(duration, easing) * -100}vw, 0)`
            }
            if (nScreen) {
                nScreen.current.style.transform = `translate(${(1 - animPosition(duration, easing)) * 100}vw, 0)`
            }
        }, (1000 / 60));
    }

    const animateSlideFromLeft = (cScreen, nScreen, duration, easing) => {
        // Prepare for animation
        if (cScreen) {
            cScreen.current.style.opacity = 1
            cScreen.current.style.transform = 'translate(0, 0)'
        }
        if (nScreen) {
            nScreen.current.style.opacity = 1
            nScreen.current.style.transform = 'translate(-100vw, 0)'
        }
        // Execute animation
        anim = setInterval(_ => {
            if (cScreen) {
                cScreen.current.style.transform = `translate(${animPosition(duration, easing) * 100}vw, 0)`
            }
            if (nScreen) {
                nScreen.current.style.transform = `translate(${(1 - animPosition(duration, easing)) * -100}vw, 0)`
            }
        }, (1000 / 60));
    }

    const animateSlideFromBottom = (cScreen, nScreen, duration, easing) => {
        // Prepare for animation
        if (cScreen) {
            cScreen.current.style.opacity = 1
            cScreen.current.style.transform = 'translate(0, 0)'
        }
        if (nScreen) {
            nScreen.current.style.opacity = 1
            nScreen.current.style.transform = 'translate(0, 100vh)'
        }
        // Execute animation
        anim = setInterval(_ => {
            if (cScreen) {
                cScreen.current.style.transform = `translate(0, ${animPosition(duration, easing) * 100}vh)`
            }
            if (nScreen) {
                nScreen.current.style.transform = `translate(0, ${(1 - animPosition(duration, easing)) * 100}vh)`
            }
        }, (1000 / 60));
    }

    const animateSlideFromTop = (cScreen, nScreen, duration, easing) => {
        // Prepare for animation
        if (cScreen) {
            cScreen.current.style.opacity = 1
            cScreen.current.style.transform = 'translate(0, 0)'
        }
        if (nScreen) {
            nScreen.current.style.opacity = 1
            nScreen.current.style.transform = 'translate(0, -100vh)'
        }
        // Execute animation
        anim = setInterval(_ => {
            if (cScreen) {
                cScreen.current.style.transform = `translate(0, ${animPosition(duration, easing) * 100}vh)`
            }
            if (nScreen) {
                nScreen.current.style.transform = `translate(0, ${(1 - animPosition(duration, easing)) * -100}vh)`
            }
        }, (1000 / 60));
    }

    const animateFade = (cScreen, nScreen, duration, easing) => {
        // Prepare for animation
        if (cScreen) {
            cScreen.current.style.opacity = 1
        }
        if (nScreen) {
            nScreen.current.style.opacity = 0
        }
        // Execute animation
        anim = setInterval(_ => {
            if (cScreen) {
                cScreen.current.style.opacity = 1 - animPosition(duration, easing)
            }
            if (nScreen) {
                nScreen.current.style.opacity = animPosition(duration, easing)
            }
        }, (1000 / 60));
    }

    const animPosition = (duration, easing) => {
        const now = new Date().getTime()
        const animStart = animationStart
        const animPercent = Math.min(1, (now - animStart) / duration)
        const animEasePercent = easing(animPercent, 0, 1, 1)
        return animEasePercent
    }

    const resetAnimationParams = _ => {
        nextScreenContainer.current.style.opacity = 0
        currentScreenContainer.current.style.opacity = 1
        nextScreenContainer.current.style.transform = 'translate(0, 0)'
        currentScreenContainer.current.style.transform = 'translate(0, 0)'
    }

    const addScreenToDOM = (screenName, screen) => {
        let screenContainer = document.createElement('div')
        screenContainer.id = screenName
        screenContainer.className = 'ScreenContainer'
        if (initialScreen === screenName) {
            screenContainer.className += ' CurrentScreenContainer'
        }
        rootContainer.current.appendChild(screenContainer)
        // document.getElementById('App').appendChild(notificationContainer)
        ReactDOM.render(screen, screenContainer)
    }

    return (
        <div className="ScreenSwitcher" ref={rootContainer}>
            {/* Child Screens will be appended here */}
        </div>
    )
})

ScreenNavigator.defaultProps = {
    screens: {}
}

export default ScreenNavigator;