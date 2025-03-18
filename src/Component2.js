import React, { useState, useRef, useEffect } from "react";

const MyObserverComponent = () => {
  const [actionPerformed, setActionPerformed] = useState(false);
  const [counter, setCounter] = useState(0); // Initialize counter state
  const targetRef = useRef(null);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !actionPerformed) {
          if (document.documentElement.scrollTop === 0 && counter === 1) {
            console.log("Do Action A - Initial load");
            setActionPerformed(true); // Set action has been performed to prevent further actions
          } else if (document.documentElement.scrollTop !== 0) {
            console.log("Do Action B - Scrolled into view");
            setActionPerformed(true); // Set action has been performed to prevent further actions
          }
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (targetRef.current && !actionPerformed) {
      observer.observe(targetRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [actionPerformed, counter]); // Include counter in dependencies array, although it only affects Action A

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>Increment Counter</button>
      {/* <div style={{ height: "100vh" }}>
        Scroll down to see the target element.
      </div> */}
      <div ref={targetRef} style={{ height: "100px", background: "red" }}>
        Target element
      </div>
    </div>
  );
};

export default MyObserverComponent;
