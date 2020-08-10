import React from "react";
import Link from '../Link'
import {makeStyles} from "@material-ui/core/styles";                         //for JSS styling
import Grid from "@material-ui/core/Grid";                                   //Grid component
import Hidden from "@material-ui/core/Hidden";                               //Hidden component





const useStyles=makeStyles(theme =>({
    footer: {
        backgroundColor: theme.palette.common.blue,
        width: "100%",
        zIndex:1302,                                                             //to keep footer above the navigation drawer
        position:"relative"                                                      //needed for zIndex to work
    },
    adornment:{
        width:"25em",
        verticalAlign:"bottom",                                                  //to remove the gab between image and footer
        [theme.breakpoints.down('md')]:{
            width:"21em"
        },
        [theme.breakpoints.down('xs')]:{
            width:"15em"
        }
    },
    mainContainer:{
        position:"absolute"                                                      //to free the links regardless of any other elements
    },
    link:{
        color:"white",
        fontWeight:"bold",
        fontSize:"0.75rem",
        fontFamily:"Arial ",
        textDecoration:"none",
        "&:hover":{
            textDecoration:"none"
        }
    },
    gridItem:{
        margin:"3em"
    },
    icon:{
        height:"4em",
        width:"4em",
        [theme.breakpoints.down('xs')]:{
            height:"2.5em",
            width:"2.5em"
        }
    },
    socialContainer:{
        position:"absolute",                                                   //to free the social media grid
        marginTop:"-6em",                                                      //to move it up
        right:"1.5em",
        [theme.breakpoints.down('xs')]:{
           right:"0.6em"
        }
    }
}))

const Footer =({setValue,setSelectedIndex})=>{
    const classes =useStyles()


    return (
        <footer className={classes.footer}>
            <Hidden mdDown>
                <Grid container justify='center' className={classes.mainContainer}>
                    <Grid item className={classes.gridItem}>
                        <Grid container direction='column' spacing={2} style={{margin:0}}>
                            <Grid item component={Link} href='/' onClick={()=>setValue(0)} className={classes.link}>
                                Home
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Grid container direction='column' spacing={2} style={{margin:0}}>
                            <Grid item component={Link} href='/services' onClick={()=>{setValue(1); setSelectedIndex(0)}} className={classes.link}>
                                Services
                            </Grid>
                            <Grid item component={Link} href='/custom-software' onClick={()=>{setValue(1); setSelectedIndex(1)}} className={classes.link}>
                                Custom Software Development
                            </Grid>
                            <Grid item component={Link} href='/mobile-apps' onClick={()=>{setValue(1); setSelectedIndex(2)}} className={classes.link}>
                                IOS/Android App Development
                            </Grid>
                            <Grid item component={Link} href='/websites' onClick={()=>{setValue(1); setSelectedIndex(3)}} className={classes.link}>
                                Website Development
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Grid container direction='column' spacing={2} style={{margin:0}}>
                            <Grid item component={Link} href='/revolution' onClick={()=>setValue(2)} className={classes.link}>
                                The Revolution
                            </Grid>
                            <Grid item component={Link} href='/revolution' onClick={()=>setValue(2)} className={classes.link}>
                                Vision
                            </Grid>
                            <Grid item component={Link} href='/revolution' onClick={()=>setValue(2)} className={classes.link}>
                                Technology
                            </Grid>
                            <Grid item component={Link} href='/revolution' onClick={()=>setValue(2)} className={classes.link}>
                                Process
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Grid container direction='column' spacing={2} style={{margin:0}}>
                            <Grid item component={Link} href='/about' onClick={()=>setValue(3)} className={classes.link}>
                                About Us
                            </Grid>
                            <Grid item component={Link} href='/about' onClick={()=>setValue(3)} className={classes.link}>
                                History
                            </Grid>
                            <Grid item component={Link} href='/about' onClick={()=>setValue(3)} className={classes.link}>
                                Team
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Grid container direction='column' spacing={2} style={{margin:0}}>
                            <Grid item component={Link} href='/contact' onClick={()=>setValue(4)} className={classes.link}>
                                Contact Us
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Hidden>
            <img
                src='/assets/footerAdornment.svg'
                alt='black decorative slash'
                className={classes.adornment}
            />
            <Grid container justify='flex-end' spacing={2} className={classes.socialContainer}>
                <Grid item component={'a'} href='https://www.facebook.com' rel='noopener noreferrer' target='_blank'>
                    <img src="/assets/facebook.svg" alt='facebook logo' className={classes.icon}/>
                </Grid>
                <Grid item component={'a'} href='https://www.twitter.com' rel='noopener noreferrer' target='_blank'>
                    <img src='/assets/twitter.svg' alt='twitter logo' className={classes.icon}/>
                </Grid>
                <Grid item component={'a'} href='https://www.instagram.com' rel='noopener noreferrer' target='_blank'>
                    <img src='/assets/instagram.svg' alt='instagram logo' className={classes.icon}/>
                </Grid>
            </Grid>
        </footer>
    )
}

export default Footer

/*
    Notes:
    verticalAlign which applied to adornment class is to remove the bottom gab between the image and footer element
    position: relative is needed for footer to be above the drawer element
    spacing{2} equal 16px
    value, selectedIndex and their set values are placed in App.js so as get common access to both Header, footer component
    instead of applying Link to component for url, we apply {'a'} with href attribute
    target='_blank' for opening the href link on new tab

*/