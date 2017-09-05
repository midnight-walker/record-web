/**
 * Created by tqj <2482366539@qq.com> on 2017/8/16.
 */
import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './Header.css';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function Header({ location }) {
    return (
        <Menu
            selectedKeys={[location.pathname]}
            mode="horizontal"
            theme="dark"
            className={styles.header}
        >
            <SubMenu title={
                <span><Icon type="bars" />用户</span>
            }>
                <Menu.Item key="/users">
                    <Link to="/users"><Icon type="bars"/>前台用户</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu title={
                <span><Icon type="bars" />行政区划</span>
            }>
                <Menu.Item key="/region">
                    <Link to="/region"><Icon type="bars"/>区县</Link>
                </Menu.Item>
                <Menu.Item key="/station">
                    <Link to="/station"><Icon type="bars"/>林场</Link>
                </Menu.Item>
            </SubMenu>
            <Menu.Item key="/">
                <Link to="/"><Icon type="home"/>Home</Link>
            </Menu.Item>
            <Menu.Item key="/404">
                <Link to="/page-you-dont-know"><Icon type="frown-circle"/>404</Link>
            </Menu.Item>
            <Menu.Item key="/antd">
                <a href="https://github.com/dvajs/dva" target="_blank">dva</a>
            </Menu.Item>
        </Menu>
    );
}

export default Header;