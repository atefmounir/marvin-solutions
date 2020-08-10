import React from 'react';
import ReactGA from'react-ga'
import Grid from "@material-ui/core/Grid";
import Link from '../Link'
import {makeStyles,useTheme} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonArrow from "./ButtonArrow";
import useMediaQuery from "@material-ui/core/useMediaQuery";



const useStyles =makeStyles(theme =>({
    learnButton:{
        ...theme.typography.learnButton,
        fontSize:"0.7rem",
        height:35,
        padding:5,
        [theme.breakpoints.down("sm")]: {
            marginBottom: "2em"
        }
    },
    background:{
        backgroundImage:`url("/assets/background.jpg")`,
        backgroundPosition:"center",
        backgroundSize:'cover',
        backgroundAttachment:'fixed',
        backgroundRepeat:'no-repeat',
        height:'60em',
        width:'100%',
        [theme.breakpoints.down('md')]:{
            backgroundImage: `url('/assets/mobileBackground.jpg')`,
            backgroundAttachment: 'inherit'
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
        [theme.breakpoints.down('sm')]:{
           marginLeft:0,
           marginRight:0
        }
    }
}))


const CallToAction =({setValue})=>{
    const classes=useStyles()
    const theme=useTheme()
    const matchesSM=useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Grid container
              direction={matchesSM ? 'column':'row'}
              justify={matchesSM ? 'center' :'space-between'}
              alignItems="center"
              className={classes.background}
        >
            <Grid item
                  style={{
                      marginLeft:matchesSM ? 0 :'5em',
                      textAlign:matchesSM ? 'center':'inherit'}}
            >
                <Grid container direction='column'>
                    <Grid item>
                        <Typography
                            variant='h1'
                            style={{lineHeight: matchesSM ? 1.1 : null}} >

                            Simple Software
                            <br />
                            {matchesSM && <br/>}
                            Revolutionary Results
                        </Typography>

                        <Typography
                            variant='subtitle2'
                            style={{fontSize: matchesSM  ? "1.2em":'1.5rem'}}
                            gutterBottom>

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
            <Grid item>
                <Button
                    variant="contained"
                    component={Link}
                    href='/estimate'
                    onClick={()=>{
                        setValue(5)
                        ReactGA.event({
                            category:'Estimate',
                            action:'Call to Action Pressed'
                        })
                    }}

                    className={classes.estimateButton}
                >
                    Free Estimate</Button>
            </Grid>
        </Grid>
    )
}

export default CallToAction