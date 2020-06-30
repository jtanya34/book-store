   
import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from "react-router-dom";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { connect } from "react-redux";
import {  Redirect } from 'react-router'
import {userRegistration} from '../actions/action';

class Register extends Component {
    constructor(props){
        super(props);
        this.state=({
            name:'',
            email:'',
            password:'',
            isSeller:false,
            isRedirect:false,
          })
          
    }
      

     useStyles = makeStyles(theme => ({
        '@global': {
          body: {
            backgroundColor: theme.palette.common.white,
          },
        },
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(3),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
          }
      }));
      
      
      //Storing user details in state
      handleChange=(e)=>{  
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state);
      }
    
      handleSubmit=(e)=>{
        e.preventDefault();
        console.log('this.state');
        console.log(this.state);
        this.props.userRegistration(this.state);
        this.setState({
            isRedirect:true,
        })
    }

    render() {
        if(this.state.isRedirect) {
            return <Redirect to="/login" />
        }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={this.useStyles.paper}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={this.useStyles.form} noValidate  onSubmit={this.handleSubmit} method="POST" encType="multipart/form-data">
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus
                defaultValue={this.state.name} 
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                defaultValue={this.state.email} 
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                defaultValue={this.state.password} 
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
            <FormControl className={this.useStyles.formControl}>
            <Select 
            required
            fullWidth
            name="isSeller"
            id="isSeller"
            value={this.state.isSeller} 
            onChange={this.handleChange}
            >
             <MenuItem value={true}>Seller</MenuItem>
             <MenuItem value={false}>Buyer</MenuItem>
             </Select>
             </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={this.useStyles.submit}
            onSubmit={this.handleSubmit}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
}

const matchStateToProps = (state) => {
  return {
      email:state.email,
  }
}
const mapDispatchProps = {userRegistration}


export default connect(matchStateToProps,mapDispatchProps)(Register);




