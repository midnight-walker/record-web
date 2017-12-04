/**
 * Created by tqj <2482366539@qq.com> on 2017/12/4.
 */
import React from 'react';
import { connect } from 'dva';

function IndexPage({ location }) {
    return (
            <form action="/doLogin">
                <input name="input"/>
                <input name="password"/>
                <button type="submit">登录</button>
            </form>
    );
}


IndexPage.propTypes = {
};

export default connect()(IndexPage);