   
import React,{Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from "react-router-dom";
import {userLogin} from '../actions/action';
import { connect } from "react-redux";
import {  Redirect } from 'react-router'


 class Login extends Component {
  constructor(props){
    super(props);
    this.state=({
        email:'',
        password:'',
        isSeller:false,
        isRedirect:false,
      })
      
}



handleChange=(e)=>{  
  this.setState({ [e.target.name]: e.target.value })
  console.log(this.state);
}

handleSubmit=async(e)=>{ 
  e.preventDefault(); 
const props =  await this.props.userLogin(this.state);
  
   if([this.props.isLoggedin]){
    this.setState({
      isRedirect:true,
  })
   }
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
      }));

render(){
  
  if(this.state.isRedirect) {
    return <Redirect to="/books" />
}
    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={this.useStyles.paper}>
            <Avatar className={this.useStyles.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <form className={this.useStyles.form} noValidate onSubmit={this.handleSubmit} method="POST" encType="multipart/form-data">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
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
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={this.useStyles.submit}
               
              >
                Sign In
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Create an account? Register
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
      isLoggedin:state.isLoggedin
  }
}
const mapDispatchProps = {userLogin}


export default connect(matchStateToProps,mapDispatchProps)(Login);

