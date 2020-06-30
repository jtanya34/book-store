import React, { Component } from 'react';
import { addBook } from '../actions/book_action';
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {  Redirect } from 'react-router'

class AddBook extends Component {
  

   useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    dense: {
      marginTop: 190,
      paddingTop:200,
    },
    menu: {
      width: 200,
    },
  }));

  

  handleChange=(e)=>{  
    e.preventDefault();  
    this.setState({ [e.target.id]: e.target.value })
  }

  handleSubmit= ((event) => {
    event.preventDefault();
    this.props.addBook(this.state)
  })

  
      render(){
        return(
            <form className={this.useStyles.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <TextField
              id="title"
              label="Title"
              className={this.useStyles.textField}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              id="description"
              label="Description"
              className={this.useStyles.textField}
              margin="normal"
              onChange={this.handleChange}
            />
            <TextField
              id="units"
              label="Units"
              className={this.useStyles.textField}
              margin="normal"
              onChange={this.handleChange}
            />
             <TextField
              id="price"
              label="Price"
              className={this.useStyles.textField}
              margin="normal"
              onChange={this.handleChange}
            />
           <Button 
            type="Submit"
            variant="contained"
            color="primary">
           Add Book</Button>  
            </form>
  
          )
      }
  }
  
  
  const mapDispatchProps = {addBook}

  export default connect(null,mapDispatchProps)(AddBook);
  



  