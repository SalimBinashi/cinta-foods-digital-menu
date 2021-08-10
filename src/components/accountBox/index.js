import React from'react';
import './index.css'
import { LoginForm } from './forms/loginform';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useState } from "react";
import { AccountContext } from './accountContext';
/**The animation backdrop using framer-motion */
const Backdrop = styled(motion.div)`
    width: 100%;
    height: 550px;
    position: fixed;
    display: flex;
    flex-direction: column;
    border-radius: 50%;
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(68,5,34,1) 100%, rgba(1,55,93,1) 100%); 

    top: -55%; 
    right: -20%;
`;

// Header container

/**USe framer-motion variance */
const backdropVariants = {
    expanded: {
        width: "200%",
        height: "1050px",
        borderRadius: "20%",
        position: "fixed"
    },
    collapsed: {
        width: "100%",
        height: "550px",
        borderRadius: "50%",
        position: "fixed"

    }
}

const expandingTransition = {
    type: "spring",
    duration: 2.3,
    stiffness: 30,
}
export function AccountBox(props, screen) {
    /** state checking*/
    const [isExpanded, setExpanded] = useState(false);
    const [active, setActive] = useState("signin")

    /**Helper methods */
    const playExpandingAnimation = () => {
        setExpanded(true);
        setTimeout(() => {
            setExpanded(false);
        }, expandingTransition.duration * 1000 - 1500);
    };
/** signup switcher method*/
    const switchToSignup = () => {
        playExpandingAnimation();
        /**delay to allow animation to complete */
        setTimeout(() => {
            /**change from signing to signup */
            setActive("signup");
        }, 400);
    }
/**signing switcher method */
    const switchToSignin = () => {
        playExpandingAnimation();
        /**delay to allow animation to complete */
        setTimeout(() => {
            /**change from signup to signin */
            setActive("signin");
        }, 400);
    }
    /**Context provider for either screens
     * provide the switching context */
    const contextValue = { switchToSignup, switchToSignin};
    return (
        // provide account context
        <AccountContext.Provider value = {contextValue}>
        {/* container frame--to obtain the mobile
          look just replace classname
          with BoxContainer */}
        
       <div>
            <Backdrop
             initial={false}
             animate={isExpanded ? "expanded" : "collapsed"} 
             variants={backdropVariants}
             transition={expandingTransition}>
                {/* parent container for the login/register */}
                {/* <div className="TopContainer"> */}
                    {/* the animation */}
                    {/* <div className="BackDropAnim"> */}
                    {/* If it is in signin */}
                {active==="signin" && <div className="HeaderContainer">
                    <div className="HeaderText">
                        <h2>Cinta Foods</h2>
                        <div className="SmallText">
                            <h5>Sign-in to continue</h5>
                        </div>
                    </div>

                </div>}
                    {/* If it is in signup */}
                    {active==="signup" && <div className="HeaderContainer">
                    <div className="HeaderText">
                        <h2>Register with Us</h2>
                        <div className="SmallText">
                            <h5>Sign-up to continue</h5>
                        </div>
                    </div>

                </div>}
                    {/* </div> */}
            </Backdrop>
        {/* </div>  */}
            <div className="clear"/>
            <div className="InnerContainer">
                {/* If it is in signin */}
                {active === "signin" && <LoginForm/>}
                {/* If it is in signup */}
                {/* {active === "signup" && <RegisterForm/>} */}
            </div>
        </div>
        </AccountContext.Provider>
    
    );
}