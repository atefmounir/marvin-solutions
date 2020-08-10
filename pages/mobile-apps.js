import React from 'react';
import Head from 'next/head'
import Lottie from 'react-lottie'
import Link from '../src/Link'
import {makeStyles,useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from '@material-ui/core/Hidden';

import CallToAction from "../src/ui/CallToAction";

import integrationAnimation from "../src/animations/integrationAnimation/data";



const useStyles =makeStyles(theme =>({
    heading:{
        maxWidth:'40em'
    },
    arrowContainer:{
        marginTop:'0.5em'
    },
    rowContainer:{
        paddingRight:'5em',
        paddingLeft:'5em',
        [theme.breakpoints.down('sm')]:{
            paddingLeft:'1.5em',
            paddingRight:'1.5em'
        }
    }
}))

const MobileApps=({setValue,setSelectedIndex})=> {
    const classes=useStyles()
    const theme=useTheme()
    const matchesMD=useMediaQuery(theme.breakpoints.down('md'))
    const matchesSM=useMediaQuery(theme.breakpoints.down('sm'))
    const matchesXS=useMediaQuery(theme.breakpoints.down('xs'))


    const defaultOptions = {                                                   //copied from React-Lottie documentation- usage section
        loop: true,
        autoplay: true,
        animationData: integrationAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    return (
        <Grid container direction="column">

            <Head>
                <title key='title'>iOS/Android App Design and Development | Arc Development</title>
                <meta
                    name='description'
                    key='description'
                    content='Mobile Apps made easy  | Our cutting-edge mobile app development process lets us build beautifully designed carefully, crafted for both iOS and Android.'
                />
                <meta
                    property="og:title"
                    content="Bringing West Coast Technology to the Midwest | iOS/Android App Development"
                    key="og:title"
                />
                <meta property="og:url" key="og:url" content="arc.com/mobileapps" />
                <link rel="canonical" key="canonical" href="arc.com/mobileapps" />

            </Head>

            {/*-----first row----*/}
            <Grid item
                  container
                  direction="row"
                  justify={matchesMD ? 'center' : undefined}
                  style={{marginTop:matchesXS ? '1em': '2em'}}
                  className={classes.rowContainer}
            >
                {/*-----back arrow block-----*/}
                <Hidden mdDown>
                    <Grid item
                          className={classes.arrowContainer}
                          style={{marginRight:'1em', marginLeft:'-3.5em'}}
                    >
                        <IconButton
                            style={{backgroundColor:'transparent'}}
                            component={Link}
                            href='/custom-software'
                            onClick={()=>setSelectedIndex(1)}
                        >
                            <img src='/assets/backArrow.svg' alt='Custom Software Development Page'/>
                        </IconButton>
                    </Grid>
                </Hidden>

                {/*-----IOS/Android App Development block-----*/}
                <Grid item
                      container
                      direction="column"
                      className={classes.heading}
                >
                    <Grid item>
                        <Typography
                            variant="h1"
                            align={matchesMD ? 'center' : undefined}
                            style={{
                                lineHeight:matchesXS ? 1.1 :null,
                                marginBottom:matchesXS ? '0.5em' :0,
                                fontSize:'2.25em'
                            }}>

                            IOS/Android App Development
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant="body1" paragraph align={matchesMD ? 'center' : undefined}>
                            Mobile apps allow you to take your tools on the go.
                        </Typography>
                        <Typography variant="body1" paragraph align={matchesMD ? 'center' : undefined}>
                            Whether you want an app for your customers, employees, or yourself, we can build cross-platform native solutions for any part of your business process. This opens you up to a whole new world of possibilities by taking advantage of phone features like the camera, GPS, push notifications, and more.
                        </Typography>
                        <Typography variant="body1" paragraph align={matchesMD ? 'center' : undefined}>
                            Convenience. Connection
                        </Typography>
                    </Grid>
                </Grid>

                {/*-----forward arrow block-----*/}
                <Hidden mdDown>
                    <Grid item
                          className={classes.arrowContainer}
                    >
                        <IconButton
                            style={{backgroundColor:'transparent'}}
                            component={Link}
                            href='/websites'
                            onClick={()=>setSelectedIndex(3)}
                        >
                            <img src='/assets/forwardArrow.svg' alt='Websites Development Page'/>
                        </IconButton>
                    </Grid>
                </Hidden>
            </Grid>

            {/*-----second row----*/}
            <Grid item
                  container
                  direction={matchesSM ? 'column':'row'}
                  style={{marginTop:'15em',marginBottom:'15em'}}
                  className={classes.rowContainer}
            >
                {/*-----integration block----*/}
                <Grid item container direction='column' md>
                    <Grid item>
                        <Typography variant='h4' align={matchesSM ? 'center' : undefined} gutterBottom>Integration</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body1' align={matchesSM ? 'center' : undefined} paragraph>
                            Our technology enables an innate interconnection between web and mobile applications, putting everything you need right in one convenient place.
                        </Typography>
                        <Typography variant='body1' align={matchesSM ? 'center' : undefined} paragraph>
                            This allows you to extend your reach, reinvent interactions, and develop a stronger relationship with your users than ever before.
                        </Typography>
                    </Grid>
                </Grid>

                {/*-----Integration Animation block----*/}
                <Grid item
                      md
                >
                    <Lottie options={defaultOptions}
                            style={{
                                maxWidth: matchesMD ? '15em': '20em',
                                height: matchesMD ? '20em': undefined
                            }}
                    />
                </Grid>

                {/*-----simultaneous platform support----*/}
                <Grid item container direction='column' md>
                    <Grid item>
                        <Typography variant='h4' align={matchesSM ? 'center' : 'right'} gutterBottom>Simultaneous Platform Support</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body1' align={matchesSM ? 'center' : 'right'} paragraph>
                            Our cutting-edge development process allows us to create apps for iPhone, Android, and tablets — all at the same time.
                        </Typography>
                        <Typography variant='body1' align={matchesSM ? 'center' : 'right'} paragraph>
                            This significantly reduces costs and creates a more unified brand experience across all devices.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            {/*-----Third row ----*/}
            <Grid item
                  container
                  direction={matchesMD ? 'column':'row'}
                  style={{marginBottom:'15em',display:matchesMD ? 'grid':undefined}}
                  className={classes.rowContainer}
            >
                {/*-----Extended functionality----*/}
                <Grid item container direction='column' alignItems='center' md>
                    <Grid item>
                        <Typography variant='h4' align='center' gutterBottom>Extended Functionality</Typography>
                    </Grid>
                    <Grid item>
                        <img src='/assets/swissKnife.svg' alt='swiss army knife'/>
                    </Grid>
                </Grid>

                {/*-----Extend access----*/}
                <Grid item container direction='column' alignItems='center' style={{marginTop:matchesMD ? '10em':0,marginBottom:matchesMD ? '10em':0}} md>
                    <Grid item>
                        <Typography variant='h4' align='center' gutterBottom>Extend Access</Typography>
                    </Grid>
                    <Grid item>
                        <img src='/assets/extendAccess.svg' alt='tear-one-off-sign' style={{maxWidth:matchesMD ? '20em':'28em'}}/>
                    </Grid>
                </Grid>

                {/*-----Increase engagement----*/}
                <Grid item container direction='column' alignItems='center' md>
                    <Grid item>
                        <Typography variant='h4' align='center' gutterBottom>Increase Engagement</Typography>
                    </Grid>
                    <Grid item>
                        <img src='/assets/increaseEngagement.svg' alt='app with notification'/>
                    </Grid>
                </Grid>
            </Grid>

            {/*-----Call to Action----*/}
            <Grid item>
                <CallToAction setValue={setValue}/>
            </Grid>

        </Grid>
    )
}

export default MobileApps