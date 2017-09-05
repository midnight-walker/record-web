import React from 'react';
import { connect } from 'dva';
import styles from './Station.css';
import StationComponent from '../components/Station/Station';
import MainLayout from '../components/MainLayout/MainLayout';

function Station({ location }) {
    return (
        <MainLayout location={location}>
            <div className={styles.normal}>
                <StationComponent />
            </div>
        </MainLayout>
    );
}

export default connect()(Station);