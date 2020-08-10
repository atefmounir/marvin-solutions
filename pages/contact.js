import React, { useState } from "react";
import ReactGA from "react-ga"
import Head from 'next/head'
import axios from "axios";
import Link from "../src/Link"
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";

import ButtonArrow from "../src/ui/ButtonArrow";



const useStyles =makeStyles(theme =>({
    background: {
        backgroundImage: `url("/assets/background.jpg")`,
        backgroundPosition:"center",
        backgroundSize:'cover',
        backgroundRepeat:'no-repeat',
        height:'60em',
        paddingBottom:'10em',
        [theme.breakpoints.down('md')]:{
            backgroundImage: `url('/assets/mobileBackground.jpg')`
        }
    },
    estimateButton: {
        ...theme.typography.estimate,
        borderRadius:50,
        height:80,
        width:205,
        backgroundColor:theme.palette.common.orange,
        fontSize:'1.5rem',
        marginRight:'5em',
        marginLeft:'2em',                                            //with smaller screen sizes, inhibit estimate button to be closed to the left grid item
        "&:hover":{
            backgroundColor:theme.palette.secondary.light
        },
        [theme.breakpoints.down('md')]:{
            marginLeft:0,
            marginRight:0
        }
    },
    learnButton:{
        ...theme.typography.learnButton,
        fontSize:"0.7rem",
        height:35,
        padding:5,
        [theme.breakpoints.down("md")]: {
            marginBottom: "2em"
        }
    },
    message:{
        border:`2px solid ${theme.palette.common.blue}`,
        marginTop:'5em',
        borderRadius:5
    },
    sendButton: {
        ...theme.typography.estimate,
        borderRadius:50,
        height:45,
        width:245,
        fontSize:'1rem',
        backgroundColor:theme.palette.common.orange,
        "&:hover":{
            backgroundColor:theme.palette.secondary.light
        },
        [theme.breakpoints.down('sm')]:{
            height:40,
            width:225
        }
    }
}))


const Contact =({setValue})=>{
    const classes=useStyles()
    const theme=useTheme()
    const matchesMD= useMediaQuery(theme.breakpoints.down('md'))
    const matchesSM= useMediaQuery(theme.breakpoints.down('sm'))
    const matchesXS= useMediaQuery(theme.breakpoints.down('xs'))


    const [name,setName]=useState('')

    const [email,setEmail]=useState('')
    const [emailHelper,setEmailHelper]=useState('')

    const [phone,setPhone]=useState('')
    const [phoneHelper,setPhoneHelper]=useState('')

    const [message,setMessage]=useState('')

    const [open,setOpen]=useState(false)

    const [loading,setLoading]=useState(false)

    const [alert,setAlert]=useState({alertOpen:false, alertMessage:'', backgroundColor:''})
    const {alertOpen,alertMessage,backgroundColor}=alert




    const onChange=event=>{
        let valid

        switch(event.target.id){
            case 'email':
                setEmail(event.target.value)
                valid= /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                    .test(event.target.value)

                if(!valid){
                    setEmailHelper('Invalid email')
                }
                else{
                    setEmailHelper('')
                }
                break;

            case 'phone':
                setPhone(event.target.value)
                valid=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
                    .test(event.target.value)

                if(!valid) {
                    setPhoneHelper('Invalid Phone')
                }
                else {
                    setPhoneHelper('')
                }
                break;

            default:break;
        }
    }


    const onConfirm =()=>{
        setLoading(true)

        ReactGA.event({                                                //google Analytics
            category:'Estimate',
            action:'Sent Message'
        })

        axios.get('https://us-central1-material-ui-project-cd158.cloudfunctions.net/sendMail',{
           params:{
               name:name,
               email: email,
               phone: phone,
               message: message
           }
        })
            .then(response =>{
                console.log(response)
                setLoading(false)
                setOpen(false)
                setName('')
                setEmail('')
                setPhone('')
                setMessage('')
                setAlert({alertOpen: true, alertMessage: 'Message Sent Successfully',backgroundColor: '#4BB543'})
            })
            .catch(error =>{
                setLoading(false)
                setAlert({alertOpen: true, alertMessage:'Something Went Wrong',backgroundColor: '#FF3232'})
            })
    }

    const buttonContents = (
        <React.Fragment>
            Send Message
            <img src='/assets/send.svg'
                 alt='Paper airplane'
                 style={{marginLeft:'1em'}}
            />
        </React.Fragment>
    )



    return (
        <Grid container
              direction='row'
        >
            <Head>
                <title key='title'>Contact Us | Arc Development</title>
                <meta
                    name='description'
                    key='description'
                    content='Let us guide you through the custom software design and development process. Send us a message with any of your ideas or questions to get started.'
                />
                <meta
                    property="og:title"
                    content="Bringing West Coast Technology to the Midwest | Contact Us"
                    key="og:title"
                />
                <meta property="og:url" key="og:url" content="arc.com/contact" />
                <link
                    rel="canonical"
                    key="canonical"
                    href="https://arc.com/contact.js"
                />
            </Head>

            {/*-----Contact Us Form ----*/}
            <Grid item
                  container
                  direction='column'
                  justify='center'
                  alignItems='center'
                  style={{marginBottom:matchesMD ? '5em':0, marginTop: matchesSM ? '1em' : matchesMD ? '5em':0}}
                  lg={4}
                  xl={3}
            >
                <Grid item>
                    <Grid container direction="column">
                        {/*-----headings ----*/}
                        <Grid item>
                            <Typography variant='h1' align={matchesMD ? "center" : undefined} style={{lineHeight:1}}>Contact Us</Typography>
                            <Typography variant='body1' align={matchesMD ? "center" : undefined} style={{color:theme.palette.common.blue, fontSize:'1rem'}}>We are Waiting.</Typography>
                        </Grid>

                        {/*-----phone & mail  ----*/}
                        <Grid item
                              container
                              direction='row'
                              style={{marginTop:'2em'}}
                        >
                            <Grid item>
                                <img src='/assets/phone.svg' alt='phone' style={{marginRight:'0.5em',verticalAlign:'bottom'}}/>
                            </Grid>
                            <Grid item>
                                <Typography variant='body1'
                                            style={{color:theme.palette.common.blue}}>
                                    <a href="tel: (555) 555-5555" style={{textDecoration: 'none', color:'inherit'}}>(555) 555-5555</a>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item
                              container
                              direction='row'
                        >
                            <Grid item style={{marginBottom:'2em'}}>
                                <img src='/assets/email.svg'
                                     alt='envelop'
                                     style={{marginRight:'0.5em',verticalAlign:'bottom'}}/>
                            </Grid>
                            <Grid item>
                                <Typography variant='body1'
                                            style={{color:theme.palette.common.blue,fontSize:'1rem'}}>
                                    <a href='mailto: atef@gmail.com' style={{textDecoration: 'none', color:'inherit'}}>atef@gmail.com</a>
                                </Typography>
                            </Grid>
                        </Grid>

                        {/*-----text inputs ----*/}
                        <Grid item
                              container
                              direction='column'
                              style={{width:'20em'}}
                        >
                            <Grid item style={{marginBottom:'0.5em'}}>
                                <TextField label='Name'
                                           id='name' value={name}
                                           fullWidth
                                           onChange={(event)=>setName(event.target.value)}
                                />
                            </Grid>
                            <Grid item style={{marginBottom:'0.5em'}}>
                                <TextField label='Email'
                                           id='email'
                                           fullWidth
                                           value={email}
                                           error={emailHelper.length !==0}
                                           helperText={emailHelper}
                                           onChange={onChange}
                                />
                            </Grid>
                            <Grid item style={{marginBottom:'0.5em'}}>
                                <TextField label='Phone Number'
                                           id='phone'
                                           fullWidth
                                           value={phone}
                                           error={phoneHelper.length !==0}
                                           helperText={phoneHelper}
                                           onChange={onChange}
                                />
                            </Grid>
                        </Grid>

                        {/*-----text message ----*/}
                        <Grid item
                              style={{width:'20em'}}
                        >
                            <TextField id='message'
                                       InputProps={{disableUnderline:true}}
                                       multiline rows={10}
                                       value={message}
                                       fullWidth
                                       placeholder='Tell us more about your project'
                                       onChange={(event)=>setMessage(event.target.value)}
                                       className={classes.message}
                            />
                        </Grid>

                        {/*-----send button ----*/}
                        <Grid item container justify='center' style={{marginTop:'2em'}}>
                            <Button variant='contained'
                                    disabled={name.length===0 || message.length===0 || phoneHelper.length !==0 || emailHelper.length !==0}
                                    onClick={()=>setOpen(true)}
                                    className={classes.sendButton}
                            >
                                {buttonContents}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/*-----Dialog for Confirm Message ----*/}
            <Dialog open={open}
                    onClose={()=>setOpen(false)}
                    style={{zIndex:1302}}
                    fullScreen={matchesSM}
                    PaperProps={{
                        style:{
                            paddingTop:matchesXS ? '1em' :'5em',
                            paddingBottom:matchesXS ? '1em' :'5em',
                            paddingLeft:matchesXS ? '0':matchesSM ? '5em': matchesMD ? '15em' : '25em',
                            paddingRight:matchesXS ? '0':matchesSM ? '5em': matchesMD ? '15em' : '25em'
                        }
                    }}
            >
                <DialogContent>

                    {/*-----header & text inputs----*/}
                    <Grid container direction='column'>

                        {/*-----confirm header ----*/}
                        <Grid item>
                            <Typography variant='h4' gutterBottom align='center'>Confirm Message</Typography>
                        </Grid>

                        {/*-----text inputs ----*/}
                        <Grid item style={{marginBottom:'0.5em'}}>
                            <TextField label='Name'
                                       id='name' value={name}
                                       fullWidth
                                       onChange={(event)=>setName(event.target.value)}
                            />
                        </Grid>
                        <Grid item style={{marginBottom:'0.5em'}}>
                            <TextField label='Email'
                                       id='email'
                                       fullWidth
                                       value={email}
                                       error={emailHelper.length !==0}
                                       helperText={emailHelper}
                                       onChange={onChange}
                            />
                        </Grid>
                        <Grid item style={{marginBottom:'0.5em'}}>
                            <TextField label='Phone Number'
                                       id='phone'
                                       fullWidth
                                       value={phone}
                                       error={phoneHelper.length !==0}
                                       helperText={phoneHelper}
                                       onChange={onChange}
                            />
                        </Grid>
                    </Grid>

                    {/*-----text message ----*/}
                    <Grid item
                          style={{width:matchesSM ? '100%':'20em'}}
                    >
                        <TextField id='message'
                                   InputProps={{disableUnderline:true}}
                                   multiline rows={10}
                                   value={message}
                                   fullWidth
                                   onChange={(event)=>setMessage(event.target.value)}
                                   className={classes.message}
                        />
                    </Grid>

                    {/*-----send & cancel buttons ----*/}
                    <Grid item
                          container
                          alignItems='center'
                          direction={matchesSM ? "column" : "row"}
                          style={{marginTop:'2em'}}
                    >
                        <Grid item>
                            <Button color="primary"
                                    style={{fontWeight:300}}
                                    onClick={()=>setOpen(false)}
                            >
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant='contained'
                                    disabled={name.length===0 || message.length===0 || phoneHelper.length !==0 || emailHelper.length !==0}
                                    onClick={onConfirm}
                                    className={classes.sendButton}
                            >
                                {loading ? <CircularProgress size={30}/> : buttonContents}
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>


            {/*-----snackbar----*/}
            <Snackbar open={alertOpen}
                      message={alertMessage}
                      ContentProps={{
                          style:{
                              backgroundColor:backgroundColor
                          }}}
                      anchorOrigin={{
                          vertical:'top',
                          horizontal: 'center'
                      }}
                      onClose={()=>setAlert({
                          ...alert,
                          alertOpen: false
                      })}
                      autoHideDuration={4000}
            />


            {/*-----Simple Software Revolutionary Results Block----*/}
            <Grid item
                  container
                  direction={matchesMD ? 'column' : 'row'}
                  justify={matchesMD ? 'center' : undefined}
                  alignItems="center"
                  lg={8}
                  xl={9}
                  className={classes.background}
            >
                {/*-----first block----*/}
                <Grid item
                      style={{
                          marginLeft:matchesMD ? 0 :'3em',
                          textAlign:matchesMD ? 'center':'inherit'}}
                >
                    <Grid container direction='column'>
                        <Grid item>
                            <Typography variant='h1'
                                        align={matchesMD ? 'center' : undefined}
                            >
                                Simple Software<br />Revolutionary Results
                            </Typography>
                            <Typography variant='subtitle2'
                                        align={matchesMD ? 'center' : undefined}
                                        style={{fontSize:'1.5rem'}}
                            >
                                Take advantage of the 21st Century
                            </Typography>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    component={Link}
                                    href='/revolution'
                                    onClick={()=>setValue(2)}
                                    className={classes.learnButton}
                                >
                                    <span style={{ marginRight: 5 }}>Learn More</span>
                                    <ButtonArrow width={10} height={10} fill={theme.palette.common.blue}/>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/*-----estimate button----*/}
                <Grid item>
                    <Button
                        variant="contained"
                        component={Link}
                        href='/estimate'
                        onClick={()=>{
                            setValue(5)
                            ReactGA.event({
                                category:'Estimate',
                                action:'Contact Page Pressed'
                            })
                        }}
                        className={classes.estimateButton}
                    >
                        Free Estimate</Button>
                </Grid>
            </Grid>

        </Grid>
    )
}

export default Contact

/*
    Notes:
    InputProps is TextFields component API. Props applied to the Input elements. It will be a FilledInput, OutlinedInput or Input component depending on the variant
    disableUnderline is a prop of Input component API
    using regular expression to check the validity of email address on change of the text input field.
    PaperProps is API of the Dialog component and its an object that can contains styling of the dialog paper

*/