import React, { useCallback, useEffect, useRef, useState } from "react";
import { millisecondsToMinutes, millisecondsToSeconds } from "date-fns";
import cn from "classnames";

import { getRerenderSpeed } from "./Progress";
import styles from "./Settings.module.css";
import { isLocalStorageAvailable, safeGet, safeSet } from "../localStorageUtils";

interface Props {
  onSettingsChanged: () => void;
}

const Settings = ({ onSettingsChanged }: Props): JSX.Element | null => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSettings = useCallback(() => setIsOpen((b) => !b), []);
  const closeSettings = useCallback(() => setIsOpen(false), []);
  const selectedTime = safeGet("eow", "16");
  const selectedSpeed = safeGet("speed", "1");

  const handleTimeClick = useCallback(
    (time: "15" | "16" | "17") => () => {
      safeSet("eow", time);
      onSettingsChanged();
    },
    [onSettingsChanged],
  );

  const handleSpeedChange = useCallback(
    (speed: string) => {
      safeSet("speed", speed);
      onSettingsChanged();
    },
    [onSettingsChanged],
  );

  useEffect(() => {
    const handleEscClicked = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSettings();
        buttonRef.current?.focus();
      }
    };

    const handleDocumentClicked = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || !buttonRef.current || !modalRef.current) return;
      if (event.target === buttonRef.current || modalRef.current.contains(event.target)) return;

      closeSettings();
    };

    document.addEventListener("click", handleDocumentClicked);
    document.addEventListener("keyup", handleEscClicked);

    return () => {
      document.removeEventListener("click", handleDocumentClicked);
      document.removeEventListener("keyup", handleEscClicked);
    };
  }, [closeSettings]);

  if (!isLocalStorageAvailable()) {
    return null;
  }

  return (
    <>
      <button
        ref={buttonRef}
        className={styles.settingsButton}
        title="Settings"
        onClick={toggleSettings}
        aria-label="Åpne innstillinger"
      >
        ⚙
      </button>
      {isOpen && (
        <div ref={modalRef} className={styles.root} role="dialog" aria-label="Innstillinger">
          <div className={styles.timerPicker}>
            <div>Når er helg?</div>
            <div className={styles.buttons}>
              {(["15", "16", "17"] as const).map((it) => (
                <button
                  key={it}
                  className={cn(styles.timeButton, { [styles.isSelected]: selectedTime === it })}
                  onClick={handleTimeClick(it)}
                >
                  {it}:00
                </button>
              ))}
            </div>
          </div>
          <div className={styles.sliderPicker}>
            <div>Hvor fort skal den telle ned?</div>
            <input
              type="range"
              min="1"
              max="150"
              defaultValue={selectedSpeed}
              className="slider"
              id="myRange"
              onChange={(event) => handleSpeedChange(event.target.value)}
            />
            <div>
              <RerenderSpeed />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function RerenderSpeed(): JSX.Element {
  const rerenderSpeed = getRerenderSpeed();
  const seconds = millisecondsToSeconds(rerenderSpeed);

  if (seconds < 1) {
    return <div>Hvert {Math.round(rerenderSpeed)}. millisekund</div>;
  } else if (seconds <= 60) {
    return <div>Hvert {seconds}. sekund</div>;
  } else {
    return <div>Hvert {millisecondsToMinutes(rerenderSpeed)}. minutt</div>;
  }
}

export default Settings;
