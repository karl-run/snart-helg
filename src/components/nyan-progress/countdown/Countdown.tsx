import React from "react";
import { formatDistanceStrict } from "date-fns";
import { nb } from "date-fns/locale";
import cn from "classnames";

import styles from "./Countdown.module.css";

interface Props {
  fridayEow: Date;
  className?: string;
  isHelg: boolean;
  now: Date;
}

const Countdown = ({ className, fridayEow, now, isHelg }: Props): JSX.Element | null => {
  if (isHelg) return null;

  const timeLeft = formatDistanceStrict(fridayEow, now, { locale: nb });

  return <div className={cn(styles.root, className)}>Det er {timeLeft} til helg</div>;
};

export default Countdown;
