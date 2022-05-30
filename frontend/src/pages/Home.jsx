import React, { useState, useRef } from "react";
import { Button, Alert } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const HomeScreen = () => {
  const [showButton, setShowButton] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const [isNext, setIsNext] = useState(true);

  const paragraphs = [
    {
      index: 1,
      content: 'Index 1 content'
    },
    {
      index: 2,
      content: 'Index 2 content'
    }
  ]

  const onNext = () => setIsNext(true);
  const onPrevious = () => setIsNext(false);

  const nodeRef = useRef(null);

  return (
    <>
      <section className="heading">
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below</p>
      </section>

      {showButton && (
        <Button onClick={() => setShowMessage(true)} size="lg">
          Show Message
        </Button>
      )}

      <CSSTransition
        in={showMessage}
        timeout={300}
        classNames="alert"
        unmountOnExit
        onEnter={() => setShowButton(false)}
        onExited={() => setShowButton(true)}
      >
        <Alert
          variant="primary"
          dismissible
          onClose={() => setShowMessage(false)}
        >
          <Alert.Heading>Animated alert message</Alert.Heading>
          <p>This alert message is being transitioned in and out of the DOM.</p>
          <Button onClick={() => setShowMessage(false)}>Close</Button>
        </Alert>
      </CSSTransition>
    </>
  );
};

export default HomeScreen;
