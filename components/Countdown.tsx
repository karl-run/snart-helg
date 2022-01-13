import React, { CSSProperties } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { nb } from "date-fns/locale";
import cn from "classnames";

import styles from "./Countdown.module.css";

interface Props {
  fridayEow: Date;
  className?: string;
}

const Countdown = ({ className, fridayEow }: Props): JSX.Element => {
  const timeLeft = formatDistanceToNowStrict(fridayEow, { locale: nb });

  return <div className={cn(styles.root, className)}>Det er {timeLeft} til helg</div>;
};

export default Countdown;
