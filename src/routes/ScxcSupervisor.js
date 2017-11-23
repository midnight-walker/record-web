import React from 'react';
import { connect } from 'dva';
import styles from './ScxcSupervisor.css';
import ScxcSupervisorComponent from '../components/ScxcSupervisor/ScxcSupervisor';
import MainLayout from '../components/MainLayout/MainLayout';

function ScxcSupervisor({ location }) {
    return (
        <MainLayout location={location}>
            <div className={styles.normal}>
                <ScxcSupervisorComponent />
            </div>
        </MainLayout>
    );
}

export default connect()(ScxcSupervisor);