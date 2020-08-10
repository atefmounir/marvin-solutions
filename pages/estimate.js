import React,{useState,useRef}  from "react";
import ReactGA from 'react-ga'
import Head from 'next/head'
import axios from "axios";
import {cloneDeep} from 'lodash'
import Lottie from 'react-lottie'
import {makeStyles,useTheme} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from "@material-ui/core/Hidden";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";

import estimateAnimation from "../src/animations/estimateAnimation/data.json";



const useStyles = makeStyles(theme => ({
    icon: {
        width:'12em',
        height:'10em'
    },
    estimateButton:{
        ...theme.typography.estimate,
        borderRadius:50,
        backgroundColor:theme.palette.common.orange,
        height:50,
        width:225,
        fontSize:'1.25rem',
        marginTop:'5em',
        "&:hover":{
            backgroundColor:theme.palette.secondary.light
        }
    },
    message:{
        border:`2px solid ${theme.palette.common.blue}`,
        marginTop:'3em',
        marginBottom:'2em',
        borderRadius:5
    },
    specialText: {
        fontFamily:'Raleway',
        fontWeight:700,
        fontSize:'1.5rem',
        color:theme.palette.common.orange
    }
}))

const defaultQuestions=[
    {
        id:1,
        title:'Which service are you interested in?',
        active:true,
        options:[
            {
                id:1,
                title:'Custom Software Development',
                subtitle:null,
                icon:'/assets/software.svg',
                iconAlt:'Three floating screens',
                selected:false,
                cost:0
            },
            {
                id:2,
                title:'IOS/Android App Development',
                subtitle:null,
                icon:'/assets/mobile.svg',
                iconAlt:'phone and mobile outline',
                selected:false,
                cost:0
            },
            {
                id:3,
                title:'Website Development',
                subtitle:null,
                icon:'/assets/website.svg',
                iconAlt:'computer outline',
                selected:false,
                cost:0
            }
        ]
    }
]

const softwareQuestions = [
    { ...defaultQuestions[0], active: false },
    {
        id: 2,
        title: "Which platforms do you need supported?",
        subtitle: "Select all that apply.",
        options: [
            {
                id: 1,
                title: "Web Application",
                subtitle: null,
                icon: '/assets/website.svg',
                iconAlt: "computer outline",
                selected: false,
                cost: 100
            },
            {
                id: 2,
                title: "iOS Application",
                subtitle: null,
                icon: '/assets/iphone.svg',
                iconAlt: "outline of iphone",
                selected: false,
                cost: 100
            },
            {
                id: 3,
                title: "Android Application",
                subtitle: null,
                icon: '/assets/android.svg',
                iconAlt: "outlines of android phone",
                selected: false,
                cost: 100
            }
        ],
        active: true
    },
    {
        id: 3,
        title: "Which features do you expect to use?",
        subtitle: "Select all that apply.",
        options: [
            {
                id: 1,
                title: "Photo/Video",
                subtitle: null,
                icon: '/assets/camera.svg',
                iconAlt: "camera outline",
                selected: false,
                cost: 25
            },
            {
                id: 2,
                title: "GPS",
                subtitle: null,
                icon: '/assets/gps.svg',
                iconAlt: "gps pin",
                selected: false,
                cost: 25
            },
            {
                id: 3,
                title: "File Transfer",
                subtitle: null,
                icon: '/assets/upload.svg',
                iconAlt: "outline of cloud with arrow pointing up",
                selected: false,
                cost: 25
            }
        ],
        active: false
    },
    {
        id: 4,
        title: "Which features do you expect to use?",
        subtitle: "Select all that apply.",
        options: [
            {
                id: 1,
                title: "Users/Authentication",
                subtitle: null,
                icon: '/assets/users.svg',
                iconAlt: "outline of a person with a plus sign",
                selected: false,
                cost: 25
            },
            {
                id: 2,
                title: "Biometrics",
                subtitle: null,
                icon: '/assets/biometrics.svg',
                iconAlt: "fingerprint",
                selected: false,
                cost: 25
            },
            {
                id: 3,
                title: "Push Notifications",
                subtitle: null,
                icon: '/assets/bell.svg',
                iconAlt: "outline of a bell",
                selected: false,
                cost: 25
            }
        ],
        active: false
    },
    {
        id: 5,
        title: "What type of custom features do you expect to need?",
        subtitle: "Select one.",
        options: [
            {
                id: 1,
                title: "Low Complexity",
                subtitle: "(Informational)",
                icon: '/assets/info.svg',
                iconAlt: "'i' inside a circle",
                selected: false,
                cost: 25
            },
            {
                id: 2,
                title: "Medium Complexity",
                subtitle: "(Interactive, Customizable, Realtime)",
                icon: '/assets/customized.svg',
                iconAlt: "two toggle switches",
                selected: false,
                cost: 50
            },
            {
                id: 3,
                title: "High Complexity",
                subtitle: "(Data Modeling and Computation)",
                icon: '/assets/data.svg',
                iconAlt: "outline of line graph",
                selected: false,
                cost: 100
            }
        ],
        active: false
    },
    {
        id: 6,
        title: "How many users do you expect?",
        subtitle: "Select one.",
        options: [
            {
                id: 1,
                title: "0-10",
                subtitle: null,
                icon: '/assets/person.svg',
                iconAlt: "person outline",
                selected: false,
                cost: 1
            },
            {
                id: 2,
                title: "10-100",
                subtitle: null,
                icon: '/assets/persons.svg',
                iconAlt: "outline of two people",
                selected: false,
                cost: 1.25
            },
            {
                id: 3,
                title: "100+",
                subtitle: null,
                icon: '/assets/people.svg',
                iconAlt: "outline of three people",
                selected: false,
                cost: 1.5
            }
        ],
        active: false
    }
];

const websiteQuestions = [
    { ...defaultQuestions[0], active: false },
    {
        id: 2,
        title: "Which type of website are you wanting?",
        subtitle: "Select one.",
        options: [
            {
                id: 1,
                title: "Basic",
                subtitle: "(Informational)",
                icon: '/assets/info.svg',
                iconAlt: "person outline",
                selected: false,
                cost: 100
            },
            {
                id: 2,
                title: "Interactive",
                subtitle: "(Users, API's, Messaging)",
                icon: '/assets/customized.svg',
                iconAlt: "outline of two people",
                selected: false,
                cost: 200
            },
            {
                id: 3,
                title: "E-Commerce",
                subtitle: "(Sales)",
                icon: '/assets/globe.svg',
                iconAlt: "outline of three people",
                selected: false,
                cost: 250
            }
        ],
        active: true
    }
];


const Estimate=()=> {
    const classes =useStyles()
    const theme =useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'))
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))

    const myRef=useRef(null)

    const [questions,setQuestions]=useState(defaultQuestions)
    const [dialogOpen,setDialogOpen]=useState(false)
    const [name,setName]=useState('')

    const [email,setEmail]=useState('')
    const [emailHelper,setEmailHelper]=useState('')

    const [phone,setPhone]=useState('')
    const [phoneHelper,setPhoneHelper]=useState('')

    const [message,setMessage]=useState('')

    const [total,setTotal]=useState(0)

    const [service,setService]=useState([])
    const [platforms,setPlatforms]=useState([])
    const [features,setFeatures]=useState([])
    const [customFeatures,setCustomFeatures]=useState('')
    const [category,setCategory]=useState('')
    const [users,setUsers]=useState('')

    const [loading,setLoading]=useState(false)

    const [alert,setAlert]=useState({alertOpen:false, alertMessage:'', backgroundColor:''})
    const {alertOpen,alertMessage,backgroundColor}=alert

    const defaultOptions = {                                                  //copied from React-Lottie documentation- usage section
        loop: true,
        autoplay: true,
        animationData: estimateAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    const nextQuestion =()=>{
        if(matchesSM){                                                         //useRef only on mobile screen
            window.scrollTo(0,myRef.current.offsetTop+75)              //myRef assigned to the question title which we need to scroll to
        }

        const newQuestions=cloneDeep(questions)                        //take a copy from the defaultQuestions array of objects which stored in the state questions

        const currentlyActive=newQuestions.filter(question =>question.active) //will hold the currently active question. filter method is returning an array
        const activeIndex=currentlyActive[0].id-1                             //get the first element in the filtered array. then refer to contained object by selecting its index=id-1
        const nextIndex=activeIndex+1                                         //get the index of next question

        newQuestions[activeIndex]={...currentlyActive[0],active: false}       //update the active field of the current active question to false
        newQuestions[nextIndex]={...newQuestions[nextIndex],active: true}     //update the active field of the next question to true

        setQuestions(newQuestions)                                    //set the state of questions with the modified newQuestions
    }

    const previousQuestion =()=>{
        if(matchesSM){                                                         //useRef only on mobile screen
            window.scrollTo(0,myRef.current.offsetTop+75)              //myRef assigned to the question title which we need to scroll to
        }

        const newQuestions=cloneDeep(questions)                        //take a copy from the defaultQuestions array of objects which stored in the state questions

        const currentlyActive=newQuestions.filter(question =>question.active) //will hold the currently active question. filter method is returning an array
        const activeIndex=currentlyActive[0].id-1                             //get the first element in the filtered array. then refer to contained object by selecting its index=id-1
        const prevIndex=activeIndex-1                                         //get the index of previous question

        newQuestions[activeIndex]={...currentlyActive[0],active: false}       //update the active field of the current active question to false
        newQuestions[prevIndex]={...newQuestions[prevIndex],active: true}     //update the active field of the next question to true

        setQuestions(newQuestions)                                            //set the state of questions with the modified newQuestions
    }

    const navigationPreviousDisabled =()=>{
        const currentlyActive=questions.filter(question =>question.active)    //no use for immutable way since we are not going o change any fields. only pull information

        return currentlyActive[0].id === 1;                                   //return true if default question "first" --> to disable the previous arrow
    }

    const navigationNextDisabled =()=>{
        const currentlyActive=questions.filter(question =>question.active)    //no use for immutable way since we are not going o change any fields. only pull information

        return currentlyActive[0].id === questions[questions.length-1].id;    //if the question id that is currently active = id of the last question in questions state-->last question
    }

    const handleSelect =(id)=>{
        const newQuestions=cloneDeep(questions)                       //copy the questions state "softwareQuestions" using lodash cloneDeep method

        const currentlyActive=newQuestions.filter(question =>question.active) //will hold the currently active question. filter method is returning an array
        const activeIndex=currentlyActive[0].id-1                             //get the first element in the filtered array. then refer to contained object by selecting its index=id-1

        const newSelected=newQuestions[activeIndex].options[id-1]             //id of options get from calling of handleSelect. saving to newSelected is same as saving a copy of {...}
        const previousSelected=currentlyActive[0].options
            .filter(option => option.selected)                                //memorizing any selection from the user and save it into previousSelected array

        switch (currentlyActive[0].subtitle){
            case 'Select one.':
                if(previousSelected[0]){
                    previousSelected[0].selected=
                        !previousSelected[0].selected                         //toggle any previous selection if the subtitle was only to 'Select one'
                }
                newSelected.selected=!newSelected.selected                    //toggle the selected field to be true
                break

            default:
                newSelected.selected=!newSelected.selected                    //toggle the selected field to be true
                break
        }

        switch(newSelected.title) {                                           //at beginning, newSelected=newQuestions[activeIndex] without options
            case 'Custom Software Development':
                if(matchesSM){                                                //useRef only on mobile screen
                    window.scrollTo(0,myRef.current.offsetTop+75)     //myRef assigned to the question title which we need to scroll to
                }

                setQuestions(softwareQuestions)
                setService(newSelected.title)
                setPlatforms([])                                      //clear out any previous selected options
                setFeatures([])
                setCustomFeatures('')
                setCategory('')
                setUsers('')
                break
            case 'IOS/Android App Development':
                if(matchesSM){                                                //useRef only on mobile screen
                    window.scrollTo(0,myRef.current.offsetTop+75)      //myRef assigned to the question title which we need to scroll to
                }
                setQuestions(softwareQuestions)
                setService(newSelected.title)
                setPlatforms([])                                      //clear out any previous selected options
                setFeatures([])
                setCustomFeatures('')
                setCategory('')
                setUsers('')
                break
            case 'Website Development':
                if(matchesSM){                                                //useRef only on mobile screen
                    window.scrollTo(0,myRef.current.offsetTop+75)     //myRef assigned to the question title which we need to scroll to
                }

                setQuestions(websiteQuestions)
                setService(newSelected.title)
                setPlatforms([])                                      //clear out any previous selected options
                setFeatures([])
                setCustomFeatures('')
                setCategory('')
                setUsers('')
                break

            default:
                setQuestions(newQuestions)                            //newQuestions is holding the initial state = defaultQuestions
        }
    }

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

    const getTotal=() =>{
        let cost = 0

        const selections =questions.map(question=>question.options
            .filter(option=>option.selected))                                 //filter out all selected items from options array
        .filter(question =>question.length>0)                                 //since selection property of the default questions keeps false after redirecting to next question, we exclude the empty array from any selection

        selections.map(options=>options.map(option=>cost+=option.cost))       //updating the cost variable. summing all cost fields for all selected items

        if(questions.length>2){                                               //only goes without website questions
            const userCost = questions
                .filter(question => question.title===
                    'How many users do you expect?'                           //filter the question of how many users since it has a multiplier
                )
                .map(question =>question.options                              //map over the previous question and filter the selected no. of users
                    .filter(option => option.selected))[0][0]                 //since it is array inside array, we have user [0][0] to reach to the cost property

            setUsers(userCost.title)                                          //since userCost has access to the whole internal object, we can reference to the title property

            cost -= userCost.cost                                             //we have to extract the userCost from the previous cost calculation since it is a multiplier
            cost *= userCost.cost                                             //consider the cost of a single user into the final calculation
        }
        setTotal(cost)
    }

    const getPlatforms=()=>{
        let newPlatforms=[]

        if(questions.length>2){                                               //only goes without website questions
            questions
                .filter(question => question.title===                         //filter out specific question about the platform
                'Which platforms do you need supported?'
            )
                .map(question => question.options
                    .filter(option=>option.selected))[0]                      //filter out the objects of selected property =true--> array of objects [{},{}]
                .map(option => newPlatforms.push(option.title))               //map to push title property into the newPlatforms array

            setPlatforms(newPlatforms)
        }
    }

    const getFeatures=()=>{
        let newFeatures=[]

        if(questions.length>2){                                               //only goes without website questions
            questions
                .filter(question => question.title===                         //filter out specific question about the platform
                    'Which features do you expect to use?'
                )
                .map(question => question.options
                    .filter(option=>option.selected))                         //here we don't take the first element [0] question options existed in more than one element
                .map(option =>option
                    .map(newFeature=>newFeatures.push(newFeature.title)))

            setFeatures(newFeatures)
        }
    }

    const getCustomFeatures = ()=>{
        if(questions.length>2){
            const newCustomFeatures=questions
                .filter(question => question.title===
                    'What type of custom features do you expect to need?'
                )
                .map(question => question.options
                    .filter(option=>option.selected))[0][0].title

            setCustomFeatures(newCustomFeatures)
        }
    }

    const getCategory =()=>{
        if(questions.length===2){                                             //website category
            const newCategory = questions
                .filter(question => question.title===
                    'Which type of website are you wanting?')[0].options
                .filter(option=>option.selected)[0].title

            setCategory(newCategory)
        }
    }

    const sendEstimate =()=>{
        setLoading(true)

        ReactGA.event({
            category:'Estimate',
            action:'Estimate Sent'
        })

        axios.get('https://us-central1-material-ui-project-cd158.cloudfunctions.net/sendMail',{
            params:{
                name:name,
                email: email,
                phone: phone,
                message: message,
                total: total,
                category: category,
                service: service,
                platforms:platforms,
                features:features,
                customFeatures:customFeatures,
                users:users
            }
        })
            .then(response =>{
                setLoading(false)
                setAlert({alertOpen: true, alertMessage: 'Estimate placed successfully',backgroundColor: '#4BB543'})
                setDialogOpen(false)
            })
            .catch(error =>{
                setLoading(false)
                setAlert({alertOpen: true, alertMessage:'Something Went Wrong',backgroundColor: '#FF3232'})
            })
    }

    const estimateDisabled = () =>{
        let disabled=true

        const emptySelections =questions
            .filter(question => question.title
                !=='Which features do you expect to use?')                         //execute filtering without features question
            .map(question =>question.options                                       //map over all questions
                .filter(option =>option.selected))                                 //create new arrays of only selected objects for all questions
            .filter(question =>question.length===0)                                //from the main questions, filter out the empty arrays "questions not answered"

        const featuresSelected =questions
            .filter(question => question.title
            === 'Which features do you expect to use?')                            //returns Array of 2 arrays "2 pages for features question"
            .map(question => question.options
                .filter(option => option.selected))                                //filter the arrays that has selected field =true
            .filter(selections=>selections.length>0)                               //check the length of the accumulated array. al least one feature has to be selected



        if(questions.length===2){                                                  //we are in websites route
            if(emptySelections.length===1){                                        //means question is answered. the default question array is always empty since we are not updating its selected property
                disabled=false                                                     //means disabled will be false-->release to place the estimate request
            }
        }else if(questions.length===1){
            disabled=true
        }else if(emptySelections.length===1 && featuresSelected.length>0){         //emptySelections=1 means all "exclude features" questions except the first service question
            disabled=false
        }

       return disabled
    }

    const softwareSelections =(<Grid container direction='column'>
            <Grid item container alignItems='center' style={{marginBottom:'1.25em'}}>
                <Grid item xs={2}>
                    <img src='/assets/check.svg' alt='checkmark'/>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant='body1'>
                        You want {service}
                        {
                            platforms.length >0 ? ` for ${
                                //if only web application is selected...
                                platforms.indexOf("Web Application") > -1 && platforms.length === 1
                                    ? //then finish sentence here
                                    "a Web Application."
                                    : //otherwise, if web application and another platform is selected...
                                    platforms.indexOf("Web Application") > -1 && platforms.length === 2
                                        ? //then finish the sentence here
                                        `a Web Application and an ${platforms[1]}.`
                                        : //otherwise, if only one platform is selected which isn't web application...
                                        platforms.length === 1
                                            ? //then finish the sentence here
                                            `an ${platforms[0]}`
                                            : //otherwise, if other two options are selected...
                                            platforms.length === 2
                                                ? //then finish the sentence here
                                                "an iOS Application and an Android Application."
                                                : //otherwise if all three are selected...
                                                platforms.length === 3
                                                    ? //then finish the sentence here
                                                    "a Web Application, an iOS Application, and an Android Application."
                                                    : null
                                
                            }`: null
                        }
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container alignItems='center' style={{marginBottom:'1.25em'}}>
                <Grid item xs={2}>
                    <img src='/assets/check.svg' alt='checkmark'/>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant='body1'>
                        {
                            "with "
                        }
                        {/* if we have features... */}
                        {features.length > 0
                            ? //...and there's only 1...
                            features.length === 1
                                ? //then end the sentence here
                                `${features[0]}.`
                                : //otherwise, if there are two features...
                                features.length === 2
                                    ? //...then end the sentence here
                                    `${features[0]} and ${features[1]}.`
                                    : //otherwise, if there are three or more features...
                                    features
                                        //filter out the very last feature...
                                        .filter(
                                            (feature, index) =>
                                                index !== features.length - 1
                                        )
                                        //and for those features return their name...
                                        .map((feature, index) => (
                                            <span key={index}>{`${feature}, `}</span>
                                        ))
                            : null
                        }
                        {
                            features.length >2
                                ? //...and then finally add the last feature with 'and' in front of it
                                ` and ${features[features.length - 1]}.`
                                : null
                        }
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container alignItems='center'>
                <Grid item xs={2}>
                    <img src='/assets/check.svg' alt='checkmark'/>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant='body1'>
                        The custom features will be of {customFeatures.toLowerCase()}
                        {`and the project will be used by about ${users} users`}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>)

    const websiteSelection =(<Grid container direction='column' style={{marginTop:'14em'}}>
            <Grid item container alignItems='center'>
                <Grid item xs={2}>
                    <img src='/assets/check.svg' alt='checkmark'/>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant='body1'>
                        You want {category=== 'Basic' ? 'a Basic website' : `an ${category} Website`}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>)

    return(
        <Grid container direction="row">

            <Head>
                <title key='title'>Free Custom Software Estimate | Arc Development</title>
                <meta
                    name='description'
                    key='description'
                    content='Use our free estimate calculator to instantly check the cost of your custom software, mobile app, or website design and development project.'
                />
                <meta
                    property="og:title"
                    content="Bringing West Coast Technology to the Midwest | Free Estimate"
                    key="og:title"
                />
                <meta property="og:url" key="og:url" content="arc.com/estimate" />
                <link rel="canonical" key="canonical" href="arc.com/estimate" />
            </Head>

            {/*-----Estimate section ----*/}
            <Grid item container direction='column' alignItems={matchesMD ? "center" : undefined} lg>
                <Grid item style={{marginTop:'2em',marginLeft:matchesMD ? 0: '5em'}}>
                    <Typography
                        variant='h1'
                        align={matchesMD ? "center" : undefined}
                    >
                        Estimate
                    </Typography>
                </Grid>
                <Grid item style={{marginRight:matchesMD ? 0 :'10em',maxWidth:'50em', marginTop:'7.5em'}}>
                    <Lottie
                        options={defaultOptions}
                        height='100%'
                        width='100%'
                    />
                </Grid>
            </Grid>

            {/*-----options section ----*/}
            <Grid item container direction='column' style={{marginRight:matchesMD ? 0 :'2em',marginBottom:'25em'}} alignItems='center' lg>
                {
                    questions.filter(question =>question.active).map((question,index) =>(
                        <React.Fragment key={index}>

                            {/*-----question ----*/}
                            <Grid item ref={myRef}>
                                <Typography
                                    variant='h1'
                                    align='center'
                                    style={{
                                        fontWeight: 500,
                                        fontSize:'2.25rem',
                                        marginTop:'5em',
                                        marginLeft:matchesSM ? '1em':0,
                                        marginRight:matchesSM ? '1em':0,
                                        lineHeight: 1.25
                                    }}
                                >
                                    {question.title}
                                </Typography>
                                <Typography
                                    variant='body1'
                                    align='center'
                                    style={{marginBottom:'2.5em'}}
                                    gutterBottom
                                >
                                    {question.subtitle}
                                </Typography>
                            </Grid>

                            {/*-----question Options ----*/}
                            <Grid item container>
                                {
                                    question.options.map((option,index) =>(
                                        <Grid
                                            item
                                            container
                                            direction='column'
                                            key={index}
                                            component={Button}
                                            style={{
                                                display:'grid',
                                                textTransform:'none',
                                                lineHeight: 1.25,
                                                borderRadius:0,
                                                marginBottom:matchesSM ? '1.5em':0,
                                                backgroundColor:option.selected ? theme.palette.common.orange:null
                                            }}
                                            onClick={() =>handleSelect(option.id)}
                                            md
                                        >
                                            <Grid item style={{maxWidth:'14em'}}>
                                                <Typography
                                                    variant='h6'
                                                    align='center'
                                                    style={{marginBottom:'1em'}}
                                                >
                                                    {option.title}
                                                </Typography>
                                                <Typography variant='caption' align='center'>{option.subtitle}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <img src={option.icon} alt={option.iconAlt} className={classes.icon}/>
                                            </Grid>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </React.Fragment>
                    ))
                }


                {/*-----navigation arrows arrows ----*/}
                <Grid item container justify="space-between" style={{width:'18em',marginTop:'3em'}}>
                    <Grid item>
                        <IconButton onClick={previousQuestion} disabled={navigationPreviousDisabled()}>
                            <img src={navigationPreviousDisabled() ? '/assets/backArrowDisabled.svg' : '/assets/backArrow.svg'} alt='previous question'/>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={nextQuestion} disabled={navigationNextDisabled()}>
                            <img src={navigationNextDisabled() ? '/assets/forwardArrowDisabled.svg' : '/assets/forwardArrow.svg'} alt='next question'/>
                        </IconButton>
                    </Grid>
                </Grid>


                {/*-----get estimate button ----*/}
                <Grid item>
                    <Button
                        variant='contained'
                        disabled={estimateDisabled()}
                        onClick={()=>{
                            setDialogOpen(true)
                            getTotal()
                            getPlatforms()
                            getFeatures()
                            getCustomFeatures()
                            getCategory()

                            ReactGA.event({
                                category:'Estimate',
                                action:'Estimate Checked'
                            })
                        }}
                        className={classes.estimateButton}
                    >
                        Get Estimate
                    </Button>
                </Grid>
            </Grid>

            {/*-----Estimate Dialog----*/}
            <Dialog
                style={{zIndex:1302}}
                open={dialogOpen}
                onClose={() =>setDialogOpen(false)}
                fullScreen={matchesSM}
                fullWidth
                maxWidth='lg'
            >
                <Grid container justify='center'>
                    <Grid item style={{marginTop:'1em'}}>
                        <Typography variant='h1' align='center'>Estimate</Typography>
                    </Grid>
                </Grid>
                <DialogContent>
                    <Grid container justify='space-around' direction={matchesSM ? 'column': 'row'} alignItems={matchesSM ? 'center' : undefined}>

                        {/*-----left section ----*/}
                        <Grid item container direction='column' style={{maxWidth:'20em'}} md={7}>

                            {/*-----text inputs ----*/}
                            <Grid item style={{marginBottom:'0.5em'}}>
                                <TextField label='Name'
                                           id='name'
                                           value={name}
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

                            {/*-----text message ----*/}
                            <Grid item>
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

                            {/*-----total price message ----*/}
                            <Grid item>
                                <Typography variant='body1'
                                            align={matchesSM ? 'center' : 'undefined'}
                                            style={{lineHeight: 1.1}}
                                            paragraph
                                >
                                    We can create this digital solution for an estimated <span className={classes.specialText}>${total.toFixed(2)}</span>
                                </Typography>
                                <Typography variant='body1'
                                            align={matchesSM ? 'center' : 'undefined'}
                                            paragraph
                                >
                                    Fill out your name, phone number, email, place your request, and we will get back to you with details moving forward and a final price.
                                </Typography>
                            </Grid>
                        </Grid>

                        {/*-----right section ----*/}
                        <Grid item container direction='column' style={{maxWidth:'30em'}} alignItems={matchesSM ? 'center' : 'undefined'} md={5}>

                            <Hidden smDown>
                                {/*-----selections reviews ----*/}
                                <Grid item>
                                    {questions.length > 2 ? softwareSelections : websiteSelection}
                                </Grid>
                            </Hidden>

                            {/*-----request button ----*/}
                            <Grid item>
                                <Button variant='contained'
                                        className={classes.estimateButton}
                                        onClick={sendEstimate}
                                        disabled={name.length===0 || message.length===0 || phoneHelper.length !==0 || emailHelper.length !==0}
                                >
                                    {
                                        loading
                                            ? <CircularProgress/>
                                            : <React.Fragment>
                                                Place Request
                                                <img src='/assets/send.svg' alt='paper airplane' style={{marginLeft:'0.5em'}}/>
                                            </React.Fragment>
                                    }
                                </Button>
                            </Grid>
                           <Hidden mdUp>
                               <Grid item style={{marginBottom:matchesSM ? '5em':0}}>
                                   <Button style={{fontWeight:300}}
                                           color='primary'
                                           onClick={()=>setDialogOpen(false)}
                                   >
                                       Cancel
                                   </Button>
                               </Grid>
                           </Hidden>
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

        </Grid>
    )
}

export default Estimate


/*
    Notes:
    navigationPreviousDisabled() has to be called when page get rendered to determine the conditions for navigation arrows
    sometimes we isolates container property from item in defining the Grid.
    if both together, it will span 100% and we will be able to style the wrapper Grid like with align property
    a template string has added to distinguish between using a / an to make sentence readable in a right way
*/