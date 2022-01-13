import React from 'react';
import cn from "classnames";

import styles from './Chart.module.css'

type Props = {
    weekEnd: number;
};


function Chart({ weekEnd }: Props) {
    return (
        <div className={styles.chartContainer}>
            <div className={cn(styles.day, styles.monday)}>Mandag</div>
            <div className={styles.day}>Tirsdag</div>
            <div className={styles.day}>Onsdag</div>
            <div className={styles.day}>Torsdag</div>
            <div className={styles.day}>Fredag</div>
            <div className={styles.weekend} style={{
                left: `${weekEnd}%`,
            }}>HELG</div>
            <div className={styles.day}>Lørdag</div>
            <div className={styles.day}>Søndag</div>
        </div>
    );
}

export default Chart;
