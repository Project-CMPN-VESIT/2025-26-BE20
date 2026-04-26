import React, { useEffect } from "react";

const usePagination = ({
  rootElementQuerySelector,
  targetRef,
  setCurrentPage,
  hasMore,
  rootMarginInPixels = 0,
  threshold = 0,
}) => {
  const observerOptions = {
    root: rootElementQuerySelector
      ? document.querySelector(`${rootElementQuerySelector}`)
      : null,
    rootMargin: `${rootMarginInPixels}px`,
    threshold: threshold,
  };

  const observerCallback = async (entries) => {
    const entry = entries[0];

    if (entry.isIntersecting && hasMore) {
      setCurrentPage((prev) => prev + 1); // Add the fetch function in useEffect. Whenever the number of pages change this current page should be called again.
    }
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  useEffect(() => {
    if (targetRef.current && hasMore) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [hasMore]);
}; // Has more and current page are states that are to be passed, otherwise there is no use of useEffect.

export default usePagination;
