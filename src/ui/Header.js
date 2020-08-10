import React, {useState,useEffect} from 'react';                             //React App, useState,useEffect hook
import ReactGA from 'react-ga'                                               //react-google analytics
import AppBar from "@material-ui/core/AppBar";                               //AppBar component
import Toolbar from "@material-ui/core/Toolbar";                             //Toolbar component
import useScrollTrigger from "@material-ui/core/useScrollTrigger";           //hook to respond on user scroll action
import {makeStyles} from "@material-ui/core/styles";                         //API hook for JSS styling
import Tabs from "@material-ui/core/Tabs";                                   //Tabs component
import Tab from "@material-ui/core/Tab";                                     //Tab component
import Button from "@material-ui/core/Button";                               //Button component
import Link from '../Link'                                                   //for Tab link
import Menu from "@material-ui/core/Menu";                                   //Menu component
import MenuItem from "@material-ui/core/MenuItem";                           //MenuItem component
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";             //drawer component
import IconButton from "@material-ui/core/IconButton"                        //IconButton component
import MenuIcon from '@material-ui/icons/Menu'                               //MenuIcon component
import List from '@material-ui/core/List'                                    //List component
import ListItem from '@material-ui/core/ListItem'                            //ListItem component
import ListItemText from "@material-ui/core/ListItemText";                   //ListItemText component
import Hidden from '@material-ui/core/Hidden'





const ElevationScroll=(props)=> {                                            //wrap AppBar and trigger action on scroll to add new prop on elevation of scroll
    const {children} = props;                                                //destructure children prop from props.

    const trigger = useScrollTrigger({                             //event listener on user scrolling
        disableHysteresis: true,
        threshold: 0
    });

    return React.cloneElement(children, {                            //clone the ElevationScroll component + add new prop for elevation which has value comes on trigger hook
        elevation: trigger ? 4 : 0                                           //elevation is a prototype from Scroll class
    });
}                                        //HOC to elevate the element "AppBar" on scroll "MUI"

const useStyles=makeStyles(theme=>({                                 //API hook to add JSS styles
    toolBarMargin:{                                                          //class name
        ...theme.mixins.toolbar,                                             //get the style from theme object in Theme.js
        marginBottom:"3em",
        [theme.breakpoints.down('md')]:{
            marginBottom:"2em"
        },
        [theme.breakpoints.down('xs')]:{
            marginBottom:"1.25em"
        }
    },
    logo:{
        height:"8em",
        textTransform:"none",
        [theme.breakpoints.down('md')]:{
            height:"7em"
        },
        [theme.breakpoints.down('xs')]:{
            height:"5.5em"
        }
    },
    logoContainer:{
        padding:0,
        "&:hover":{
            backgroundColor:"transparent"
        }
    },
    tabContainer:{
        marginLeft:"auto"
    },
    tab:{
        ...theme.typography.tab,
        minWidth:10,
        marginLeft:"25px",
        "&:hover":{
            textDecoration:'none'
        }
    },
    button:{
        ...theme.typography.estimate,
        borderRadius:"50px",
        marginLeft:"50px",
        marginRight:"25px",
        height:"45px",
        "&:hover":{
            backgroundColor:theme.palette.secondary.light,
            textDecoration:'none'
        }
    },
    menu:{
        backgroundColor:theme.palette.common.blue,
        color:"white",
        borderRadius:"0px",
        zIndex:1302
    },
    menuItem:{
        ...theme.typography.tab,
        opacity:0.7,
        "&:hover":{
            opacity:1,
        }
    },
    drawerIcon:{
        height:"50px",
        width:"50px"
    },
    drawerIconContainer:{
        marginLeft:"auto",
        "&:hover":{
            backgroundColor:"transparent"
        }
    },
    drawer:{
        backgroundColor:theme.palette.common.blue
    },
    drawerItem:{
        ...theme.typography.tab,
        color:"white",
        opacity:0.7
    },
    drawerItemEstimate:{
        backgroundColor:theme.palette.common.orange
    },
    drawerItemSelected:{
        "& .MuiListItemText-root":{
            opacity:1
        }
    },
    appBar:{
        zIndex:theme.zIndex.modal+1
    }
}))                           //JSS Styles



const Header=({value,setValue,selectedIndex,setSelectedIndex})=>{
    const classes=useStyles()                                                //for JSS styling
    const iOS =
        process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);     //checks the IOS user. from documentation "drawers section"


    const [anchorEl,setAnchorEl]=useState(null)               //hoc for Menu"
    const [openMenu,setOpenMenu]=useState(false)              //hoc to open MenuItems dropdown
    const [openDrawer,setOpenDrawer]=useState(false)          //hoc to open the drawer

    const [previousURL,setPreviousURL]=useState('')           //hoc to check the changing in the url

    const handleChange=(e,newValue)=>{
        setValue(newValue)
    }                                   //handle tab values. set value for each tab

    const handleClick=(e)=>{
        setAnchorEl(e.currentTarget)
        setOpenMenu(true)
    }                                             //on mouse hover, show MenItem dropdown and get the MenuItem

    const handleMenuItemClick=(e,i)=>{
        setAnchorEl(null)
        setOpenMenu(false)
        setSelectedIndex(i)
    }                                   //handle selecting any of MenuItem

    const handleClose=()=>{
        setAnchorEl(null)
        setOpenMenu(false)
    }                                              //handle closing the dropdown MenuItem

    const menuOptions=[
        {name: 'Services', link:'/services',activeIndex:1,selectedIndex:0},
        {name: 'Custom Software Development',link:'/custom-software',activeIndex:1,selectedIndex:1},
        {name: 'IOS/Android App Development',link:'./mobile-apps',activeIndex:1,selectedIndex:2},
        {name: 'Websites Development',link:'/websites',activeIndex:1,selectedIndex:3}
    ]                                                                        //array of objects. each object contains name & link of Services menu items

    const routes = [
        {name: 'Home',link:'/',activeIndex:0},
        {name: 'Services',link:'/services',activeIndex:1,ariaOwns:anchorEl ? 'simple-menu' : undefined,ariaPopup:anchorEl ? 'true' : undefined, mouseOver:event =>handleClick(event)},
        {name: 'The Revolution',link:'/revolution',activeIndex:2},
        {name: 'About Us',link:'/about',activeIndex:3},
        {name: 'Contact Us',link:'/contact',activeIndex:4}
    ]                                                                        //array of objects. each object contains name & link of each tab

    useEffect(()=>{
        if(previousURL !==window.location.pathname){                         //if previous URL != the current one
            setPreviousURL(window.location.pathname)                         //save the URL and then call google analytics to log for the visited page
            ReactGA.pageview(window.location.pathname + window.location.search)
        }

        [...menuOptions,...routes].forEach(route => {
            const {link,activeIndex,selectedIndex}= route

            switch(window.location.pathname){
                case `${link}`:
                    if(value !==activeIndex){
                        setValue(activeIndex)

                        if(selectedIndex && selectedIndex !==selectedIndex.value){
                            setSelectedIndex(selectedIndex)
                        }
                    }
                break

                case '/estimate':
                    if(value!==5) setValue(5)
                break

                default:break
            }
        })
    }
    ,[value,setValue,menuOptions,selectedIndex,setSelectedIndex,routes])                        //on rendering, set values-indexes that matching for each current url

    const tabs=(
        <React.Fragment>

            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor='primary'
                className={classes.tabContainer}
            >
                {
                    routes.map(({link,name,ariaOwns,ariaPopup,mouseOver},index) =>(
                        <Tab
                            key={index}
                            className={classes.tab}
                            component={Link}
                            href={link}
                            label={name}
                            aria-owns={ariaOwns}
                            aria-haspopup={ariaPopup}
                            onMouseOver={mouseOver}
                        />
                    ))
                }
            </Tabs>

            <Button variant='contained'
                    component={Link}
                    href='/estimate'
                    color='secondary'
                    className={classes.button}
                    onClick={()=>{
                        setValue(5)
                        ReactGA.event({
                            category: 'Estimate',
                            action: 'Desktop Header Pressed'
                        })
                    }}
            >
                Free Estimate
            </Button>

            <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                MenuListProps={{onMouseLeave:handleClose}}
                elevation={0}
                keepMounted
                style={{zIndex:1302}}
                classes={{paper:classes.menu}}

            >
                {
                    menuOptions.map(({name,link}, index) =>(
                        <MenuItem
                            key={name}
                            component={Link}
                            href={link}
                            onClick={(event)=>{
                                handleMenuItemClick(event,index)
                                setValue(1)
                                handleClose()
                            }}
                            selected={index ===selectedIndex && value ===1}
                            classes={{root:classes.menuItem}}
                        >
                            {name}
                        </MenuItem>
                    ))
                }
            </Menu>

        </React.Fragment>
    )

    const drawer = (
        <React.Fragment>
            <SwipeableDrawer
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                open={openDrawer}
                onClose={()=>setOpenDrawer(false)}
                onOpen={()=>setOpenDrawer(true)}
                classes={{paper:classes.drawer}}
            >
                <div className={classes.toolBarMargin}/>
                <List disablePadding>

                    {
                        routes.map(({name,link,activeIndex})=>(
                            <ListItem
                                key={activeIndex}
                                onClick={()=>{
                                    setOpenDrawer(false)
                                    setValue(activeIndex)
                                }}
                                divider button
                                component={Link}
                                href={link}
                                selected={value===activeIndex}
                                classes={{selected:classes.drawerItemSelected}}
                            >
                                <ListItemText
                                    disableTypography
                                    className={classes.drawerItem}
                                >
                                    {name}
                                </ListItemText>
                            </ListItem>
                        ))
                    }

                    <ListItem
                        onClick={()=>{
                            setOpenDrawer(false)
                            setValue(5)
                            ReactGA.event({
                                category: 'Estimate',
                                action: 'Mobile Header Pressed'
                            })
                        }}
                        divider button
                        component={Link}
                        href='/estimate'
                        selected={value ===5}
                        classes={{root:classes.drawerItemEstimate, selected:classes.drawerItemSelected}}
                    >
                        <ListItemText
                           disableTypography
                           className={classes.drawerItem}
                        >
                            Free Estimate
                        </ListItemText>
                    </ListItem>

                </List>
            </SwipeableDrawer>
            <IconButton
                onClick={()=>setOpenDrawer(!openDrawer)}
                disableRipple
                className={classes.drawerIconContainer}
            >
                <MenuIcon className={classes.drawerIcon}/>
            </IconButton>
        </React.Fragment>
    )


    return (
        <React.Fragment>
            <div className={classes.toolBarMargin}/>
            <ElevationScroll>
                <AppBar position='fixed' className={classes.appBar}>
                    <Toolbar disableGutters>
                        <Button component={Link}
                                href='/' onClick={()=>setValue(0)}
                                disableRipple
                                style={{textDecoration:'none'}}
                                className={classes.logoContainer}
                        >
                            <svg className={classes.logo} id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 139">
                                <style>{`.st0{fill:none}.st1{fill:#fff}.st2{font - family:Raleway; font-weight: 300;}.st6{fill:none;stroke:#000;stroke-width:3;stroke-miterlimit:10}`}</style>
                                <path d="M448.07-1l-9.62 17.24-8.36 14.96L369.93 139H-1V-1z"/>
                                <path className="st0" d="M-1 139h479.92v.01H-1z"/>
                                <text transform="translate(261.994 65.233)" className="st1 st2" fontSize="57">Arc</text>
                                <text transform="translate(17.692 112.015)" className="st1 st2" fontSize="54">Development</text>
                                <path className="st0" d="M382.44 116.43l47.65-85.23 8.36-14.96M369.83 139l-.01.01L362 153"/>
                                <path d="M438.76 15.76l-56.42 100.91c-12.52-10.83-20.45-26.82-20.45-44.67 0-32.58 26.42-59 59-59 6.23 0 12.24.97 17.87 2.76z" fill="#0b72b9"/>
                                <path d="M479.89 72c0 32.58-26.42 59-59 59-14.73 0-28.21-5.4-38.55-14.33l56.42-100.91c23.85 7.57 41.13 29.89 41.13 56.24z"/>
                                <g id="Group_186" transform="translate(30.153 11.413)">
                                    <g id="Group_185">
                                        <g id="Words">
                                            <path id="Path_59" className="st1" d="M405.05 14.4l-.09 80.38-7.67-.01.06-52.25-29.4 52.21-7.94-.01 45.04-80.32z"/>
                                        </g>
                                    </g>
                                </g>
                                <path className="st0" d="M457-17l-8.93 16-9.62 17.24-8.36 14.96L369.93 139l-.01.01L361 155"/>
                            </svg>

                        </Button>
                        <Hidden mdDown>
                            {tabs}
                        </Hidden>
                        <Hidden lgUp >
                            {drawer}
                        </Hidden>

                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </React.Fragment>
    )
}

export default Header

/*
    Notes:
    makeStyles is API hook that has access to theme and returns JSS styles object makeStyles(themes=>({new Style object}))
    React.Fragment allows to add multiple divs and component together
    disableGutters is an API of the Toolbar component
    when handleChange get called, it will path the value of the current tab behind the scene
    indicatorColor will override the default style of tab underling
    component={Link} will convert the material UI into react-router-dom with keeping all functionality and styles are the same
    use useEffect: when page is reloaded it has to set the value of the tab in the right value so it can render the right page
    without the useEffect, if url is in services, and reload the page. the tab will go to home page and url still on services.
    disableRipple effect can be added to button.
    MenuListProps is API for the Menu component. it is an object of props applied to the menuList items. use this API to close the list onMouseLeave.
    aria-owns, aria-haspopup for differentiate between the current pop up
    elevation is for positioning the popup menu
    classes={{API CSS style:classes.new Style name}} is used when we deal with overriding the component API CSS styles like paper,root
    paper is CSS API for Menu component. it represent the menu container
    root is CSS API for MenuItem component. it represent the root element
    for applying hover in JSS--> "&:hover":{}
    for changing styles related to reference--> [theme.breakpoints.down('md')]:{}
    disableBackdropTransition={!iOS} disableDiscovery={iOS} helps for IOS mobile performance optimization
    disableTypography is disabling the default typography setting of list item text
    divider is to make separation between items in the drawer. button is for taking button style
    keepMounted will keep menu items mounted in the DOM regardless of being visible on the screen. it helps for SEO
    toolBarMargin is a div to push out things from AppBar
    Z-index can be accessible from theme object-->theme.zIndex.modal
    root & selected is CSS API for ListItem component
    style={{zIndex:1302}} add style attribute for zIndex to make menu above the AppBar
    "& .MuiListItemText-root" is class CSS API for ListItemText with a rule name of root but we can't applied  ListItemText along with another CSS style with []
    due to material ui issues.
    the solution is to use CSS API selected for the ListItem and use styling to refer to this .MuiListItemText-root class.
    This is what they call it global class name which is another way of changing style.
    the other way for styling through CSS API is the rule name of classes object-->classes={{rule name: classes.new class name}}
    also another way is through the theme and override property
*/

