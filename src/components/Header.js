import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  makeStyles,
  withStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from '@material-ui/core/Menu';
import InputBase from '@material-ui/core/InputBase';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Link as RouterLink } from "react-router-dom";
import logo1 from '../assets/images/logo1.png';
import { ReactComponent as SearchIcon } from '../assets/images/search-icon.svg';
// const cust = JSON.parse(sessionStorage.getItem('cust'));

// const headersData = [
//   {
//     label: "Home",
//     href: "/",
//   },
//   // {
//   //   label: "About Us",
//   //   href: "/about-us",
//   // },
//   {
//     label: "Products",
//     href: "#",
//   },
//   {
//     label: cust?"Motor Club":"Motor Club Login",
//     href: cust?"/motor-club/offers":"/motor-club/"
//   },
//   {
//     label: "FAQs",
//     href: "/faqs",
//   },
//   {
//     label: "Contact",
//     href: "/contact",
//   },
  
// ];

const productList = [
  {
    label: "Cyber Protect",
    href: "/cyber-protect"
  },
  {
    label: "Laptop Insurance",
    href: "/laptop-insurance"
  },
  {
    label: "TV Insurance",
    href: "/tv-insurance"
  },
  {
    label: "Bike Insurance",
    href: "/bike-insurance"
  },
  {
    label: "Car Insurance",
    href: "/car-insurance"
  },
  {
    label: "Personal Accident Insurance",
    href: "/personal-accident-insurance"
  },
  {
    label: "Health Insurance",
    href: "/health-insurance"
  }
];

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
  },
}))(MenuItem);

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    color: '#040505 !important',
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  appbarBlue: {
    backgroundColor: '#e6eff4',
  },
  navBtnsContainer: {
    display: 'flex',
  },
  dropdownCon: {
    "& a": {
      fontFamily: 'RobotoCondensed-Regular !important',
      textDecoration: 'none !important',
      color: '#040505'
    }
  },
  menuButton: {
    fontFamily: 'RobotoCondensed-Regular !important',
    margin: '0 20px !important'
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "20px 30px",
    width: 240,
    "& li": {
      fontFamily: 'RobotoCondensed-Regular !important',
    }
  },
  title: {
    flexGrow: 1,
    "& a": {
      textDecoration: 'none',
    }
  },
  mainlLogo: {
    position: 'relative',
    top: 20,
    "@media (max-width: 900px)": {
      width: 60,
      top: 5
    },
  },
  logoline: {
    position: 'relative',
    top: 15,
    textTransform: 'uppercase',
    color: '#CE001B',
    "@media (max-width: 900px)": {
      fontSize: 10,
      top: 0
    },
  },
  search: {
    display: 'flex',
  },
  searchMob: {
    justifyContent: 'end',
    width: '100%'
  },

  inputRoot: {
  },
  inputInput: {
    height: 20,
    width: 110,
    padding: '0 10px',
    marginRight: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
    fontSize: '0.8rem'
  },
  inputBlue: {
    backgroundColor: '#e6eff4',
  },
  searchIcon: {
    cursor: 'pointer',
    '& svg': {
      height: '100%'
    }
  },
}));

export default function Header(props) {
  const cust = JSON.parse(sessionStorage.getItem('cust'));
  const { header, appbarBlue, menuButton, toolbar, drawerContainer, title, mainlLogo, logoline, navBtnsContainer, dropdownCon } = useStyles();
  const classes = useStyles();

  const headersData = [
    {
      label: "Home",
      href: "/",
    },
    // {
    //   label: "About Us",
    //   href: "/about-us",
    // },
    {
      label: "Products",
      href: "#",
    },
    {
      label: cust?"Motor Club":"Motor Club Login",
      href: cust?"/motor-club/offers":"/motor-club/"
    },
    {
      label: "FAQs",
      href: "/faqs",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    
  ];

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState('');


  const { mobileView, drawerOpen } = state;

  const productsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const productsClose = () => {
    setAnchorEl(null);
  };

  const onChangeSearch = (event) => {
    setSearchValue(event.target.value);
  }
  const searchClick = (event) => {
    doSearch(searchValue);
  }

  // START | FUNCTION TO SEARCH STRING IN A PAGE
  function doSearch(text, color = "yellow") {
    if (color !== "transparent") {
      doSearch(document.getElementById('hid_search').value, "transparent");
      document.getElementById('hid_search').value = text;
    }
    if (window.find && window.getSelection) {
      document.designMode = "on";
      var sel = window.getSelection();
      sel.collapse(document.body, 0);

      while (window.find(text)) {
        document.execCommand("HiliteColor", false, color);
        sel.collapseToEnd();
      }
      document.designMode = "off";
    } else if (document.body.createTextRange) {
      var textRange = document.body.createTextRange();
      while (textRange.findText(text)) {
        textRange.execCommand("BackColor", false, color);
        textRange.collapse(false);
      }
    }
  }
  // END | FUNCTION TO SEARCH STRING IN A PAGE

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {helloLogo}
        <div className={navBtnsContainer}>{getMenuButtons()}</div>
        
        <div className={classes.search}>
          <InputBase
            id="searchInput"
            // placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: `${classes.inputInput} ${props.background === 'blue' ? null : classes.inputBlue}`,
            }}
            inputProps={{ 'aria-label': 'search' }}
            value={searchValue}
            onChange={(e) => onChangeSearch(e)}
          />
          <input type="hidden" id="hid_search" />
          <div className={classes.searchIcon}>
            <SearchIcon onClick={searchClick} />
          </div>
        </div>

      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <div>{helloLogo}</div>

        <div className={`${classes.search} ${classes.searchMob}`}>
          <InputBase
            id="searchInput"
            // placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: `${classes.inputInput} ${props.background === 'blue' ? null : classes.inputBlue}`,
            }}
            inputProps={{ 'aria-label': 'search' }}
            value={searchValue}
            onChange={(e) => onChangeSearch(e)}
          />
          <input type="hidden" id="hid_search" />
          <div className={classes.searchIcon}>
            <SearchIcon onClick={searchClick} />
          </div>
        </div>

      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {

      return (
        <div key={`hd-${href}`}>
          <Link
            {...{
              component: RouterLink,
              to: `${label === "Products" ? '#' : href}`,
              color: "inherit",
              style: { textDecoration: "none" },
              key: label,
            }}
            onClick={label === "Products" ? productsClick : null}
          >
            <MenuItem>
              {
                label === "Products"
                  ? <>{label} <KeyboardArrowDownIcon fontSize="small" /></>
                  : label
              }
            </MenuItem>
            
          </Link>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={productsClose}
            // onMouseOut={productsClose}
            className={dropdownCon}
          >
            
            {
              productList.map((item, index) => {
                return (
                  <RouterLink to={item.href} key={`p-${index}`}>
                    <StyledMenuItem>
                      {item.label}
                    </StyledMenuItem>
                  </RouterLink>
                )
              })
            }
            
          </StyledMenu>
          
        </div>
      );
    });
  };

  const helloLogo = (
    <div className={title}>
      <RouterLink to="/">
        <img alt="" src={logo1} className={mainlLogo} />
        {/* <div className={logoline}>Insurance</div> */}
      </RouterLink>
    </div>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <div key={`hd2-${href}`}>
          <Button
            {...{
              key: label,
              color: "inherit",
              to: `${label === "Products" ? '#' : href}`,
              component: RouterLink,
              className: menuButton,
            }}
            // onClick={label === "Products" ? productsClick : null}
            onMouseOver={label === "Products" ? productsClick : null}
          >
            {
              label === "Products"
                ? <>{label} <KeyboardArrowDownIcon fontSize="small" /></>
                : label
            }
          </Button>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={productsClose}
            // onMouseOut={productsClose}
            className={dropdownCon}
          >
            {
              productList.map((item, index) => {
                return (
                  <RouterLink to={item.href} key={`p2-${index}`}>
                    <StyledMenuItem>
                      {item.label}
                    </StyledMenuItem>
                  </RouterLink>
                )
              })
            }
          </StyledMenu>
        </div>
      );
    });
  };

  return (
    <header>
      <AppBar position="static" className={`${header} ${props.background === 'blue' && appbarBlue}`}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}