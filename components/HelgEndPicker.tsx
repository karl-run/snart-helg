import React, { useCallback } from "react";

import styles from "./HelgEndPicker.module.css";

const HelgEndPicker = (): JSX.Element => {
  const handleTimeClick = useCallback(
    (time: "15" | "16" | "17") => () => {
      localStorage.setItem("eow", time);
      location.reload();
    },
    [],
  );

  return (
    <div className={styles.root}>
      <div>Når er helg?</div>
      <div className={styles.buttons}>
        <button onClick={handleTimeClick("15")}>15:00</button>
        <button onClick={handleTimeClick("16")}>16:00</button>
        <button onClick={handleTimeClick("17")}>17:00</button>
      </div>
    </div>
  );
};

export default HelgEndPicker;
