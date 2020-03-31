import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';

import './style.css';

const ScreenSwitcher = forwardRef((props, ref) => {
    const [currentScreen, setCurrentScreen] = useState(null)
    const [nextScreen, setNextScreen] = useState(null)
    const currentScreenContainer = useRef(null)
    const nextScreenContainer = useRef(null)

    let anim = null;
    let animationStart = 0

    useEffect(_ => {
        currentScreenContainer.current.style.opacity = 1
        nextScreenContainer.current.style.opacity = 0
        if (props.initialScreen) {
            setCurrentScreen(props.initialScreen)
        }
    }, [])

    useImperativeHandle(ref, _ => ({
        navigate(screenName, animation, duration, easing) {
            // Ensure all properties have values
            screenName = screenName || Object.keys(props.screens)[0]
            animation = animation || Animations.Fade
            duration = duration || 500
            easing = easing || Easings.linearTween

            // Prepare for Animation
            setNextScreen(screenName)
            let now = new Date().getTime();
            animationStart = now

            // Start Animation
            switch (animation) {
                case Animations.SlideFromRight:
                    animateSlideFromRight(duration, easing);
                    break;
                case Animations.SlideFromLeft:
                    animateSlideFromLeft(duration, easing);
                    break;
                case Animations.Fade:
                default:
                    animateFade(duration, easing);
                    break;
            }

            // Clean Up
            setTimeout(_ => {
                setCurrentScreen(screenName)
                clearInterval(anim)
                resetAnimationParams()
                setNextScreen(null)
            }, duration)
        }
    }))

    const animateSlideFromRight = (duration, easing) => {
        // Prepare for animation
        nextScreenContainer.current.style.opacity = 1
        currentScreenContainer.current.style.opacity = 1
        nextScreenContainer.current.style.transform = 'translate(100vw, 0)'
        currentScreenContainer.current.style.transform = 'translate(0, 0)'
        // Execute animation
        anim = setInterval(_ => {
            nextScreenContainer.current.style.transform = `translate(${(1 - animPosition(duration, easing)) * 100}vw, 0)`
            currentScreenContainer.current.style.transform = `translate(${animPosition(duration, easing) * -100}vw, 0)`
        }, (1000 / 60));
    }

    const animateSlideFromLeft = (duration, easing) => {
        // Prepare for animation
        nextScreenContainer.current.style.opacity = 1
        currentScreenContainer.current.style.opacity = 1
        nextScreenContainer.current.style.transform = 'translate(-100vw, 0)'
        currentScreenContainer.current.style.transform = 'translate(0, 0)'
        // Execute animation
        anim = setInterval(_ => {
            nextScreenContainer.current.style.transform = `translate(${(1 - animPosition(duration, easing)) * -100}vw, 0)`
            currentScreenContainer.current.style.transform = `translate(${animPosition(duration, easing) * 100}vw, 0)`
        }, (1000 / 60));
    }

    const animateFade = (duration, easing) => {
        // Prepare for animation
        nextScreenContainer.current.style.opacity = 0
        currentScreenContainer.current.style.opacity = 1
        // Execute animation
        anim = setInterval(_ => {
            nextScreenContainer.current.style.opacity = animPosition(duration, easing)
            currentScreenContainer.current.style.opacity = 1 - animPosition(duration, easing)
        }, (1000 / 60));
    }

    const animPosition = (duration, easing) => {
        const now = new Date().getTime()
        const animStart = animationStart
        const animPercent = (now - animStart) / duration
        const animEasePercent = easing(animPercent, 0, 1, 1)
        return animEasePercent
    }

    const resetAnimationParams = _ => {
        nextScreenContainer.current.style.opacity = 0
        currentScreenContainer.current.style.opacity = 1
        nextScreenContainer.current.style.transform = 'translate(0, 0)'
        currentScreenContainer.current.style.transform = 'translate(0, 0)'
    }

    return (
        <div className="ScreenSwitcher">
            <div ref={nextScreenContainer} className="NextScreenContainer">
                {props.screens[nextScreen]}
            </div>
            <div ref={currentScreenContainer} className="CurrentScreenContainer">
                {props.screens[currentScreen]}
            </div>
        </div>
    )
})

ScreenSwitcher.defaultProps = {
    screens: {}
}

export default ScreenSwitcher;