import React, { Component } from 'react';
import { buyBook,addBook } from '../actions/book_action';
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {  Redirect } from 'react-router'
 

class Books extends Component {
    constructor(props){
      super();
      this.state = {
        books:[],
      };
      
    }


   
     useStyles = makeStyles(theme => ({
      root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
      },
      table: {
        minWidth: 650,
      },
    }));

    handleBuy= ((event) => {
      event.preventDefault();
      console.log(event.currentTarget.value)
      console.log(this.props,this.state);  
      this.props.buyBook(event.currentTarget.value)
    })
  
  
     componentWillReceiveProps(props){
       this.setState(props)
    } 

    
    render() {
     
      return (
        <Paper className={this.useStyles.root}>
          <Table className={this.useStyles.table}>
          <TableHead>
          <TableRow>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Units</TableCell>
            <TableCell align="right">description</TableCell>
            <TableCell align="right">
            <Link to="/addbook"><Button 
              align="right"
              type="submit"
              fullWidth
              variant="contained"
              color="primary">
              Add Book 
              </Button></Link>
            
              </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.books.map(book => (
            <TableRow key={book._id}>
              <TableCell align="right">{book.title}</TableCell>
              <TableCell align="right">{book.price}</TableCell>
              <TableCell align="right">{book.units}</TableCell>
              <TableCell align="right">{book.description}</TableCell>
              <TableCell>
                <Button 
              align="right"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              value={book._id}
             onClick={this.handleBuy}>
              Buy 
              </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
          </Table>
       </Paper>
        
      );
    }
  
}




const mapDispatchProps = {buyBook}


export default connect(null,mapDispatchProps)(Books);



  