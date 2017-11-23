/**
 * Created by tqj <2482366539@qq.com> on 2017/9/21.
 */
import moment from 'moment';

function getCurrStartDay(){
    return moment().format('YYYY-MM-01');
}

function getCurrEndDay(){
    let now=moment();
    return now.format('YYYY-MM-'+now.daysInMonth());
}

export {
    getCurrStartDay,
    getCurrEndDay
}