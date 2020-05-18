import * as React from "react";

const keyDownEventName = "keydown";

export const useKeyDown = (
  keys: string | string[],
  handler: (evt: KeyboardEvent) => void,
  eventTarget: HTMLElement = document.body
) => {
  const keysToMatch = Array.isArray(keys) ? keys : [keys];
  const handleKeyDown = (evt: KeyboardEvent) => {
    if (keysToMatch.includes(evt.key)) {
      handler(evt);
    }
  };

  React.useEffect(() => {
    eventTarget.addEventListener(keyDownEventName, handleKeyDown);

    return () => {
      eventTarget.removeEventListener(keyDownEventName, handleKeyDown);
    };
  });

  return null;
};
