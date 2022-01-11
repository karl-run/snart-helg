import React from 'react';

import styles from './Chart.module.css'

function Chart() {
    return (
        <div className={styles.chartContainer}>
            <div className={styles.day}>Mandag</div>
            <div className={styles.day}>Tirsdag</div>
            <div className={styles.day}>Onsdag</div>
            <div className={styles.day}>Torsdag</div>
            <div className={styles.day}>Fredag</div>
            <div className={styles.day}>Lørdag</div>
            <div className={styles.day}>Søndag</div>
        </div>
    );
}

export default Chart;
