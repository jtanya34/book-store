import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { checkToken } from '../actions/book_action';

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: false,
        redirect: false,
      };
    }
  async componentDidMount() {
  const status= await checkToken();
  this.setState(status)
  }

    render() {
      const { loading, redirect } = this.state;
      console.log(this.state)
      if (loading) {
        console.log('jj',this.props)
        
        return (
          
            <ComponentToProtect {...this.state} />
      
        );
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      console.log('jj',this.props)
      return (
        
          <ComponentToProtect {...this.props} />
    
      );
    }
  }
}

