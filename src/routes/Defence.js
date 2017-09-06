import React from 'react';
import { connect } from 'dva';
import styles from './Defence.css';
import DefenceComponent from '../components/Defence/Defence';
import MainLayout from '../components/MainLayout/MainLayout';

function Defence({ location }) {
    return (
        <MainLayout location={location}>
            <div className={styles.normal}>
                <DefenceComponent />
            </div>
        </MainLayout>
    );
}

export default connect()(Defence);