import React,{useState} from 'react';
import ReactGA from 'react-ga'                                             //react-google analytics
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import Theme from '../src/ui/Theme';
import Header from '../src/ui/Header'
import Footer from '../src/ui/Footer'
import Fonts from "../src/ui/Fonts";

import {LazyLoadComponent} from 'react-lazy-load-image-component'

ReactGA.initialize("UA-174571449-1")                        //tracking code from adding our production website into google analytics

export default function MyApp(props) {
  const { Component, pageProps } = props;

  const [value,setValue]=useState(0)                        //hoc to set tab value (e.x services tab=1)
  const [selectedIndex,setSelectedIndex]=useState(0)        //hoc to set the index of each menu items


  React.useEffect(() => {
    Fonts()
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={Theme}>
        <Header value={value}
                setValue={setValue}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
        />
        <Component setVlaue={setValue}
                   setSelectedIndex={setSelectedIndex}
                   {...pageProps}
        />

        <LazyLoadComponent threshold={400}>
          <Footer setValue={setValue}
                  setSelectedIndex={setSelectedIndex}
          />
        </LazyLoadComponent>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
