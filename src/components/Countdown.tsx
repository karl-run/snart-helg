import React from "react";
import { differenceInSeconds, formatDistanceToNowStrict } from "date-fns";
import { nb } from "date-fns/locale";
import cn from "classnames";

import styles from "./Countdown.module.css";

interface Props {
  fridayEow: Date;
  className?: string;
}

const Countdown = ({ className, fridayEow }: Props): JSX.Element | null => {
  if (differenceInSeconds(fridayEow, new Date()) < 0) return null;

  const timeLeft = formatDistanceToNowStrict(fridayEow, { locale: nb });

  return <div className={cn(styles.root, className)}>Det er {timeLeft} til påske</div>;
};

export default Countdown;
