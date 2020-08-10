import React from 'react';
import ReactGA from 'react-ga';
import Head from 'next/head'
import Lottie from 'react-lottie'
import {makeStyles,useTheme} from "@material-ui/core/styles";
import Link from '../src/Link'
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";                 //check matching condition for screen sizing
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import CallToAction from "../src/ui/CallToAction";
import ButtonArrow from "../src/ui/ButtonArrow";

import animationData from '../src/animations/landinganimation/data'



const useStyles=makeStyles(theme =>({                                 //it takes theme prop of the ThemeProvider defined in App.js and return a new style object
    animation:{
        maxWidth:"50em",
        minWidth:"21em",
        marginTop:'2em',
        marginLeft:"10%",
        [theme.breakpoints.down('sm')]:{
            maxWidth:"30em"
        }
    },
    estimateButton:{
        ...theme.typography.estimate,
        backgroundColor:theme.palette.common.orange,
        borderRadius:50,
        height:45,
        width:145,
        marginRight:40,
        "&:hover":{
            backgroundColor:theme.palette.secondary.light
        }
    },
    buttonContainer:{
        marginTop:"1em"
    },
    learnButtonHero:{
        ...theme.typography.learnButton,
        fontSize:"0.9rem",
        height:45,
        width:145
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
    mainContainer:{
        marginTop:'5em',
        [theme.breakpoints.down('md')]:{
            marginTop:'3em'
        },
        [theme.breakpoints.down('xs')]:{
            marginTop:'2em'
        }
    },
    heroTextContainer:{
        minWidth:'21.5em',
        marginLeft:"1em",
        [theme.breakpoints.down('xs')]:{
            marginLeft:0
        }
    },
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
        marginTop:"12em",
        [theme.breakpoints.down('sm')]:{
            padding:25
        },
        [theme.breakpoints.down('xs')]:{
            padding:5
        }
    },
    revolutionBackground:{
        backgroundImage: `url('/assets/repeatingBackground.svg')`,
        backgroundPosition:"center",
        backgroundSize:'cover',
        backgroundRepeat:'no-repeat',
        height:'100%',
        width:'100%'
    },
    revolutionCard:{
        position:"absolute",
        boxShadow:theme.shadows[10],                                           //use default theme shadow property
        borderRadius:15,
        padding:"10em",
        [theme.breakpoints.down('sm')]:{
            paddingTop:'8em',
            paddingBottom:'8em',
            paddingLeft:0,
            paddingRight:0,
            borderRadius:0,
            width:'100%'
        }
    },
    infoBackground:{
        backgroundImage: `url('/assets/infoBackground.svg')`,
        backgroundPosition:"center",
        backgroundSize:'cover',
        backgroundRepeat:'no-repeat',
        height:'100%',
        width:'100%'
    }
}))


const Index=({setValue,setSelectedIndex})=> {
    const classes=useStyles()
    const theme=useTheme()                                                     //use theme hook to has access to the default theme
    const matchesSM=useMediaQuery(theme.breakpoints.down('sm'))          //useMediaQuery to check the screen size matching condition
    const matchesXS=useMediaQuery(theme.breakpoints.down('xs'))          //useMediaQuery to check the screen size matching condition


    const defaultOptions = {                                                   //copied from React-Lottie documentation- usage section
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    return(
        <Grid container direction="column" className={classes.mainContainer}>

            <Head>
                <title key='title'>Custom Software, Mobile Apps, and Websites | Arc Development</title>
                <meta
                    name='description'
                    key='description'
                    content='Pristine software custom-designed from the ground up with cutting-edge optimizations. Use our free estimate calculator to check your project cost.'
                />
                <meta
                    property="og:title"
                    content="Bringing West Coast Technology to the Midwest | Arc Development"
                    key="og:title"
                />
                <meta property="og:url" key="og:url" content="arc.com" />
                <link rel="canonical" key="canonical" href="arc.com" />
            </Head>

            <Grid item>
                {" "}
                {/*-----Hero Block-----*/}
                <Grid container justify="flex-end" alignItems="center" direction="row">
                    <Grid sm item className={classes.heroTextContainer}>
                        <Typography variant="h1" align="center">
                            Bringing West Coast Technology
                            <br />
                            to the Midwest
                        </Typography>
                        <Grid container justify="center" className={classes.buttonContainer}>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    component={Link}
                                    href="/estimate"
                                    onClick={()=>{
                                        setValue(5)
                                        ReactGA.event({
                                            category:'Estimate',
                                            action:'Home Page Pressed'
                                        })
                                    }}
                                    className={classes.estimateButton}
                                >
                                    Free Estimate
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    component={Link}
                                    href="/revolution"
                                    onClick={()=>setValue(2)}
                                    className={classes.learnButtonHero}
                                >
                                    <span style={{ marginRight: 10 }}>Learn More</span>
                                    <ButtonArrow width={15} height={15} fill={theme.palette.common.blue}/>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid sm item className={classes.animation}>
                        <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
                    </Grid>
                </Grid>
            </Grid> {/*-----end of Hero Block-----*/}

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
                {/*-----IOS/Android Block-----*/}
                <Grid container direction="row" justify={matchesSM ? "center" : "flex-end"} className={classes.serviceContainer}>
                    <Grid item
                          style={{
                              textAlign: matchesSM ? "center" : undefined
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
                          style={{
                              marginRight:matchesSM ? 0 : '5em'
                          }}
                    >
                        <img className={classes.icon} alt="mobile phone icon" src='/assets/mobileIcon.svg'/>
                    </Grid>
                </Grid>
            </Grid> {/*-----end of IOS/Android Block-----*/}

            <Grid item>
                {" "}
                {/*-----Websites Block-----*/}
                <Grid container direction="row" justify={matchesSM ? "center" : undefined} className={classes.serviceContainer}>
                    <Grid item
                          style={{
                              marginLeft: matchesSM ? 0 : "5em",
                              textAlign: matchesSM ? "center" : undefined
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
                             className={classes.learnButton}>
                            <span style={{ marginRight: 10 }}>Learn More</span>
                            <ButtonArrow width={10} height={10} fill={theme.palette.common.blue}/>
                        </Button>
                    </Grid>
                    <Grid item>
                        <img className={classes.icon} alt="website icon" src='/assets/websiteIcon.svg'/>
                    </Grid>
                </Grid>
            </Grid> {/*-----end of Websites Block-----*/}

            <Grid item>
                {" "}
                {/*-----Revolution Block-----*/}
                <Grid container style={{height:'100em',marginTop:'12em'}} justify='center' alignItems='center'>
                    <Card className={classes.revolutionCard}>
                        <CardContent>
                            <Grid container direction="column" style={{textAlign: 'center'}}>
                                <Grid item>
                                    <Typography variant='h3' gutterBottom> The Revolution</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='subtitle1'>
                                        Visionary insights coupled with cutting-edge technology is a recipe for revolution.
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        component={Link}
                                        href='/revolution'
                                        onClick={()=>setValue(2)}
                                        className={classes.learnButtonHero}
                                    >
                                        <span style={{ marginRight: 10 }}>Learn More</span>
                                        <ButtonArrow width={15} height={15} fill={theme.palette.common.blue}/>
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <div className={classes.revolutionBackground}/>
                </Grid>
            </Grid> {/*-----end of Revolution Block-----*/}

            <Grid item>
                {" "}
                {/*-----Information Block-----*/}
                <Grid container direction="row" alignItems="center" style={{height:'80em'}} className={classes.infoBackground}>
                    <Grid container
                          style={{textAlign:matchesXS ? 'center':'inherit'}}
                          direction={matchesXS ? 'column' : 'row'}
                    >
                        <Grid item sm style={{marginLeft: matchesXS ? 0 :matchesSM ? '2em':'5em'}}>
                            <Grid container direction="column" style={{marginBottom:matchesXS ? '10em':0}}>
                                <Typography variant="h1" style={{ color:'white'}}>About Us</Typography>
                                <Typography variant="subtitle2">Let's get personal</Typography>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        component={Link}
                                        href='/about'
                                        onClick={()=>setValue(3)}
                                        style={{color:'white',borderColor:'white'}}
                                        className={classes.learnButton}
                                    >
                                        <span style={{ marginRight: 10 }}>Learn More</span>
                                        <ButtonArrow width={10} height={10} fill='white'/>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sm style={{ marginRight: matchesXS ? 0 : matchesSM ? '2em' : '5em', textAlign: matchesXS ? 'center' : 'right'}}>
                            <Grid container direction="column">
                                <Typography variant="h1" style={{ color:'white'}}>Contact Us</Typography>
                                <Typography variant="subtitle2">Say Hello! {" "}
                                    <span role="img" aria-label="waving hand">👋</span>
                                </Typography>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        component={Link}
                                        href="/contact"
                                        onClick={()=>setValue(4)}
                                        style={{color:'white',borderColor:'white'}}
                                        className={classes.learnButton}
                                    >
                                        <span style={{ marginRight: 10 }}>Learn More</span>
                                        <ButtonArrow width={10} height={10} fill='white'/>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid> {/*-----end of Information Block-----*/}

            <Grid item>
                {' '}
                {/*-----Call To Action Block-----*/}
                <CallToAction setValue={setValue} />
            </Grid> {/*-----end of Call To Action Block-----*/}

        </Grid>
    )
}

export default Index

/*
    Notes:
    sm without sizing is for auto layout. since both items shares the same size of the screen until reach to sm breakpoint
    for buttonArrow, in the fill prop: it uses the useTheme hook to access the default theme to give a blue color for the arrow
    gutterBottom to keep a distance below . it is a prop fro Typography.
    for the information block, to add a position absolute for both grid items, it will not be possible.
    The solution is to wrap both grid items in a grid container and add a styling of position absolute to this collective container
    inherit is to take its style from what it was before the matching condition
    we have to path the setValue to CallToAction to be used to set the value on button clicked
*/