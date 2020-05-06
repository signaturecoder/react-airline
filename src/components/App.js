import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.sass';

import AdminDashboard from './admin/AdminDashboard';
import HomePage from './home/HomePage';
import StaffDashboard from './staff/checkIn/StaffDashboard';
import PageNotFound from './PageNotFound';
// import FormDemo from '../components/admin/FormDemo';
// const imaginaryUser = {
//   email: '',
//   username: '',
//   imaginaryThingId: null,
// };

function App() {
  return (
    <div>
      {/* <FormDemo user={imaginaryUser} /> */}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/staff" component={StaffDashboard} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
