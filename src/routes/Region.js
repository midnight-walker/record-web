import React from 'react';
import { connect } from 'dva';
import styles from './Region.css';
import RegionComponent from '../components/Region/Region';
import MainLayout from '../components/MainLayout/MainLayout';

function Users({ location }) {
    return (
        <MainLayout location={location}>
            <div className={styles.normal}>
                <RegionComponent />
            </div>
        </MainLayout>
    );
}

export default connect()(Users);