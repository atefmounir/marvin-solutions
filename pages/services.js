import React from 'react';
import Head from 'next/head'
import Link from '../src/Link'
import {makeStyles,useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import ButtonArrow from "../src/ui/ButtonArrow";


const useStyles =makeStyles(theme =>({
    specialText:{
        fontFamily:"Pacifico",
        color:theme.palette.common.orange
    },
    subtitle:{
        marginBottom:"1em"
    },
    icon:{
        marginLeft:"2em",
        [theme.breakpoints.down('xs')]:{
            marginLeft:0
        }
    },
    serviceContainer:{
        marginTop:"10em",
        [theme.breakpoints.down('sm')]:{
            padding:25
        },
        [theme.breakpoints.down('xs')]:{
            padding:5
        }
    },
    learnButton:{
        ...theme.typography.learnButton,
        fontSize:"0.7rem",
        height:35,
        padding:5,
        [theme.breakpoints.down("sm")]: {
            marginBottom: "2em"
        }
    },
}))

const Services=({setValue,setSelectedIndex})=> {
    const classes=useStyles()
    const theme=useTheme()

    const matchesSM=useMediaQuery(theme.breakpoints.down('sm'))
    const matchesXS=useMediaQuery(theme.breakpoints.down('xs'))

    return (
        <Grid container
              direction="column"
        >
            <Head>
                <title key='title'>Top Software Development Services | Arc Development</title>
                <meta
                    name="description"
                    key="description"
                    content="Cutting-edge software, mobile app, and website development services with sleek custom designs - get a free online estimate instantly!"
                />
                <meta
                    property="og:title"
                    content="Bringing West Coast Technology to the Midwest | Services"
                    key="og:title"
                />
                <meta property="og:url" key="og:url" content="arc.com/services" />
                <link rel="canonical" key="canonical" href="arc.com/services" />

            </Head>

            <Grid item
                  style={{
                      marginLeft:matchesSM ? 0 : '5em',
                      marginTop:matchesSM ? '1em' : '2em'
                  }}
            >
                <Typography
                    variant="h1"
                    gutterBottom
                    align={matchesSM ? 'center' : undefined}
                >
                    Services
                </Typography>
            </Grid>

            <Grid item>
                {" "}
                {/*-----IOS/Android Block-----*/}
                <Grid container
                      direction="row"
                      justify={matchesSM ? "center" : "flex-end"}
                      style={{marginTop:matchesSM ? '1em' : '5em'}}
                      className={classes.serviceContainer}
                >
                    <Grid item
                          style={{
                              textAlign: matchesSM ? "center" : undefined,
                              width:matchesSM ? undefined :'35em'
                          }}
                    >
                        <Typography variant="h4">IOS/Android App Development</Typography>
                        <Typography variant="subtitle1" className={classes.subtitle}>Extend Functionality. Extend Access. Increase Engagement</Typography>
                        <Typography variant="subtitle1">Integrate your web experience or create a standalone app
                            {matchesSM ? null : <br/>} with either mobile platform.
                        </Typography>
                        <Button
                            variant="outlined"
                            component={Link}
                            href="/mobile-apps"
                            onClick={()=>{
                                setValue(1)
                                setSelectedIndex(2)
                            }}
                            className={classes.learnButton}
                        >
                            <span style={{ marginRight: 10 }}>Learn More</span>
                            <ButtonArrow width={10} height={10} fill={theme.palette.common.blue}/>
                        </Button>
                    </Grid>
                    <Grid item
                          style={{marginRight:matchesSM ? 0 : '5em'}}
                    >
                        <img
                            src='/assets/mobileIcon.svg'
                            alt="mobile phone icon"
                            width="250em"
                            className={classes.icon}
                        />
                    </Grid>
                </Grid>
            </Grid> {/*-----end of IOS/Android Block-----*/}

            <Grid item>
                {" "}
                {/*-----Custom Software Block-----*/}
                <Grid container direction="row" justify={matchesSM ? "center" : undefined} className={classes.serviceContainer}>
                    <Grid item
                          style={{
                              marginLeft: matchesSM ? 0 : "5em",
                              textAlign: matchesSM ? "center" : undefined
                          }}
                    >
                        <Typography variant="h4">Custom Software Development</Typography>
                        <Typography variant="subtitle1" className={classes.subtitle}>Save Energy. Save Time. Save Money.</Typography>
                        <Typography variant="subtitle1">Complete digital solutions, from investigation to{" "}
                            <span className={classes.specialText}>celebration.</span>
                        </Typography>
                        <Button
                            variant="outlined"
                            component={Link}
                            href="/custom-software"
                            onClick={()=>{
                                setValue(1)
                                setSelectedIndex(1)
                            }}
                            className={classes.learnButton}
                        >
                            <span style={{ marginRight: 10 }}>Learn More</span>
                            <ButtonArrow width={10} height={10} fill={theme.palette.common.blue}/>
                        </Button>
                    </Grid>
                    <Grid item>
                        <img className={classes.icon} alt="custom software icon" src='/assets/customSoftware.svg'/>
                    </Grid>
                </Grid>
            </Grid> {/*-----end of Custom Software Block-----*/}

            <Grid item>
                {" "}
                {/*-----Websites Block-----*/}
                <Grid container
                      direction="row"
                      justify={matchesSM ? "center" : 'flex-end'}
                      style={{marginBottom:'10em'}}
                      className={classes.serviceContainer}
                >
                    <Grid item
                          style={{
                              textAlign: matchesSM ? "center" : undefined,
                              width:matchesSM ? undefined :'35em'
                          }}
                    >
                        <Typography variant="h4">Website Development</Typography>
                        <Typography variant="subtitle1" className={classes.subtitle}>Reach More. Discover More. Sell More.</Typography>
                        <Typography variant="subtitle1">Optimized for search engines, {matchesXS && <br/>} built for speed</Typography>
                        <Button
                            variant="outlined"
                            component={Link}
                            href="/websites"
                            onClick={()=>{
                                setValue(1)
                                setSelectedIndex(3)
                            }}
                            className={classes.learnButton}
                        >
                            <span style={{ marginRight: 10 }}>Learn More</span>
                            <ButtonArrow width={10} height={10} fill={theme.palette.common.blue}/>
                        </Button>
                    </Grid>
                    <Grid item
                          style={{marginRight:matchesSM ? 0 : '5em'}}
                    >
                        <img
                            src='/assets/websiteIcon.svg'
                            alt="website icon"
                            width='250em'
                            className={classes.icon}
                        />
                    </Grid>
                </Grid>
            </Grid> {/*-----end of Websites Block-----*/}

        </Grid>
    )
}

export default Services;