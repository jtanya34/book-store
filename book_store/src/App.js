import React from 'react';
import { Route, BrowserRouter,Switch } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register';
import { connect } from "react-redux";
import withAuth from './components/authentication';
import Books from './components/Books';
import AddBook from './components/AddBook';

function App() {
  return (
    <div className="App">
    
      <BrowserRouter>
      <div>
          <Switch>
          <Route  exact path="/" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Route  path="/books" component={withAuth(Books)} />
          <Route  path="/addbook" component={withAuth(AddBook)} />
            {/* <Route  path="/editauthor" render={props => <Editauthor author={this.state.author} {...props} />} /> */}
            {/* <Route  path="/addbook" render={props => <Addbook addbook={this.addbook} {...props} />} />
            <Route  path="/addauthor" render={props => <Addauthor addauthor={this.addauthor} {...props} />} />
             */}
          </Switch>
          </div>
          </BrowserRouter>
      </div>

  );
}

const mapStateProps = (state) => ({
  isLoggedin:state.isLoggedin,
  email:state.email,
})

export default connect(mapStateProps)(App);

