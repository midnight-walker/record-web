import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';
// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Model
app.model(require('./models/users'));
app.model(require("./models/region"));
app.model(require("./models/station"));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
