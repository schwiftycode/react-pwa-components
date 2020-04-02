import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import Animations from '../Scripts/Animations';
import Easings from '../Scripts/Easings';

import './style.css';

const ScreenSwitcher = forwardRef((props, ref) => {
    const [currentScreen, setCurrentScreen] = useState(null)
    const [nextScreen, setNextScreen] = useState(null)
    const currentScreenContainer = useRef(null)
    const nextScreenContainer = useRef(null)

    let anim = null;
    let animationStart = 0

    const [navigationStack, setNavigationStack] = useState([]);

    useEffect(_ => {
        currentScreenContainer.current.style.opacity = 1
        nextScreenContainer.current.style.opacity = 0
        pushToNavigationStack(props.initialScreen, null, {
            animation: Animations.Fade,
            duration: 200,
            easing: Easings.easeInOutQuart
        })
        if (props.initialScreen) {
            setCurrentScreen(props.initialScreen)
        }
    }, [])

    const pushToNavigationStack = (screen, previousScreenCache, animationInfo) => {
        let ns = [
            ...navigationStack
        ]
        if (ns.length > 1) {
            ns[ns.length - 1].cache = previousScreenCache;
        }
        ns.push({
            screen,
            cache: null,
            animationInfo
        })
        setNavigationStack(ns);
    }

    const popFromNavigationStack = _ => {
        let ns = [...navigationStack];
        ns.pop();
        setNavigationStack(ns);
    }

    useImperativeHandle(ref, _ => ({
        navigate(screenName, animation, duration, easing) {
            // Ensure all properties have values
            screenName = screenName || Object.keys(props.screens)[0]
            animation = animation || Animations.Fade
            duration = duration || 500
            easing = easing || Easings.linearTween

            // TODO: Set Cache of Previous Screen instead of null
            pushToNavigationStack(screenName, null, {
                animation,
                duration,
                easing
            })

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
        },
        goBack() {
            const { screen } = navigationStack[navigationStack.length - 2]
            const { animation, duration, easing } = navigationStack[navigationStack.length - 1].animationInfo

            // Prepare for Animation
            setNextScreen(screen)
            let now = new Date().getTime();
            animationStart = now

            // Start Animation
            switch (animation) {
                case Animations.SlideFromRight:
                    animateSlideFromLeft(duration, easing);
                    break;
                case Animations.SlideFromLeft:
                    animateSlideFromRight(duration, easing);
                    break;
                case Animations.Fade:
                default:
                    animateFade(duration, easing);
                    break;
            }

            // Clean Up
            setTimeout(_ => {
                setCurrentScreen(screen)
                clearInterval(anim)
                resetAnimationParams()
                setNextScreen(null)
                popFromNavigationStack()
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