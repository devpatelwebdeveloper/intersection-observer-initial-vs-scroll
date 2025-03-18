import React, { useState, useRef, useEffect } from "react";

const MyObserverComponent = () => {
  const [actionPerformed, setActionPerformed] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !actionPerformed) {
          // Logic to determine if this is the first load or a scroll
          if (document.documentElement.scrollTop === 0) {
            console.log("Do Action A - Initial load");
          } else {
            console.log("Do Action B - Scrolled into view");
          }
          setActionPerformed(true); // Set action has been performed to prevent further actions
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    // Create the observer
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
  }, [actionPerformed]); // Effect to re-run if actionPerformed changes

  return (
    <div>
      <div style={{ height: "100vh" }}>
        Scroll down to see the target element.
      </div>
      <div ref={targetRef} style={{ height: "100px", background: "red" }}>
        Target element
      </div>
    </div>
  );
};

export default MyObserverComponent;
