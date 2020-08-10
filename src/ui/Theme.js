import { createMuiTheme } from '@material-ui/core/styles';

const arcBlue ="#0B72B9"
const arcOrange="#FFBA60"
const arcGrey="#868686"

export default createMuiTheme({                            //API createMuiTheme to create a theme
    palette:{                                                     //palette object is managing the color system
        common:{
            blue:`${arcBlue}`,                                    //template string to add light/dark blue
            orange:`${arcOrange}`
        },
        primary:{
            main:`${arcBlue}`
        },
        secondary:{
            main:`${arcOrange}`
        }
    },
    typography:{
        tab:{
            fontFamily:"Raleway",
            textTransform:"none",
            fontWeight:700,
            color:"white",
            fontSize:"1rem",
        },
        estimate:{
            fontFamily:"Pacifico",
            textTransform:"none",
            fontSize:"1rem",
            color:"white"
        },
        h1:{
            fontFamily:"Raleway",
            fontWeight:700,
            fontSize:"2.5em",
            color:arcBlue,
            lineHeight:1.5                                          //to make more space between 2 lines
        },
        h3:{
            fontFamily:"Pacifico",
            fontSize:"2.5rem",
            color:arcBlue
        },
        h4:{
            fontFamily:"Raleway",
            fontSize:"1.75rem",
            color:arcBlue,
            fontWeight:700
        },
        h6:{
            fontWeight:500,
            fontFamily:"Raleway",
            color:arcBlue,
            lineHeight: 1
        },
        subtitle1: {
            fontSize:"1.25rem",
            fontWeight:300,
            color:arcGrey
        },
        subtitle2: {
            color:'white',
            fontSize:'1.25em',
            fontWeight:300
        },
        body1:{
            fontSize:'1.25rem',
            color:arcGrey,
            fontWeight:300
        },
        learnButton:{
            borderColor:arcBlue,
            color:arcBlue,
            borderWidth:2,
            textTransform:"none",                                                 //to inhibit transform to capital letter
            borderRadius:50,
            fontFamily:"Roboto",
            fontWeight:"bold",
        }
    },
    overrides: {                                                                  // overrides the default styles of the text field component
        MuiInputLabel:{                                                           // .MuiInputLabel-root is a class API for CSS style for Input Label component
            root:{
                color:arcBlue,
                fontSize:'1rem'
            }
        },
        MuiInput:{
            root:{                                                                // .MuiInput-root is CSS API for Input component
                color:arcGrey,
                fontWeight:300
            },
            underline:{                                                           // .MuiInput-underline is a class API for CSS style for Input component
                "&:before":{
                    borderBottom:`2px solid ${arcBlue}`
                },
                "&:hover:not($disabled):not($focused):not($error):before":{
                    borderBottom:`2px solid ${arcBlue}`
                }
            }
        }
    }
})





