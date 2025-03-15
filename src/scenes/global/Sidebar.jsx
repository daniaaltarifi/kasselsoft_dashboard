import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CabinIcon from "@mui/icons-material/Cabin";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TitleIcon from "@mui/icons-material/Title";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import EventNoteIcon from "@mui/icons-material/EventNote";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation } from "react-router-dom";
const Item = ({ title, to, icon, selected, setSelected, lang }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
        // display:lang === "ar" ?  "flex" : "",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const location = useLocation();

  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const lang = location.pathname.split("/")[1] || "en"; // Get the language from the path, default to 'en'

  return (
    <Box
      sx={{
        minHeight: "180em",
        "& .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item > .pro-icon-wrapper":
          {
            marginRight: "0 !important", // Remove right margin
          },
        // height: '150vh',
        // display: 'flex',
        // flexDirection: 'column',
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          // Ensure sidebar content takes full height
          // height: '100%',
        },
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#29b6f6 !important",
        },
        "& .pro-menu-item.active": {
          color: "#29b6f6 !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  {lang === "ar" ? "  الادمن  " : "ADMINIS"}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {/* Dashboard Item */}
            <Item
              title={lang === "ar" ? "لوحه التحكم" : "Dashboard"}
              to={`/${lang}`}
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Section Heading: Data */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              {lang === "ar" ? "" : "Data"}
            </Typography>

            {/* Form Item */}
            {/* <Item
              title={lang === "ar" ? "النموذج" : "Form"}
              to={`/${lang}/form`}
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            {/* Blogs Item */}
            <Item
              title={lang === "ar" ? "المدونات" : "Blogs"}
              to={`/${lang}/blogs`}
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Career Item */}
            <Item
              title={lang === "ar" ? "المسار المهني" : "Career"}
              to={`/${lang}/career`}
              icon={<WorkOutlineIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title={lang === "ar" ? "المشاريع" : "Portfolio"}
              to={`/${lang}/portfolio`}
              icon={<WorkOutlineIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title={lang === "ar" ? "ارقام الهواتف" : "Phone Numbers"}
              to={`/${lang}/phone`}
              icon={<WorkOutlineIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={lang === "ar" ? "تسجيل حساب" : "SignUp"}
              to={`/${lang}/users`}
              icon={<AccountCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* Section Heading: Pages */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              {lang === "ar" ? "" : "Pages"}
            </Typography>
            <Item
              title={lang === "ar" ? "العناوين " : "Titles"}
              to={`/${lang}/titles`}
              icon={<TitleIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* About Us Item */}
            <Item
              title={lang === "ar" ? "من نحن" : "About us"}
              to={`/${lang}/about`}
              icon={<ErrorOutlineIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={lang === "ar" ? " أعضاء الفريق" : "TeamAbout"}
              to={`/${lang}/teamAbout`}
              icon={<ErrorOutlineIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Services Item */}
            <Item
              title={lang === "ar" ? "خدماتنا" : "Services"}
              to={`/${lang}/services`}
              icon={<DesignServicesIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* termsandcondition */}
            <Item
              title={lang === "ar" ? "الشروط والاحكام" : "Terms and Condition"}
              to={`/${lang}/termsandcondition`}
              icon={<EventNoteIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* Contact Item */}
            <Item
              title={lang === "ar" ? "اتصل بنا" : "Contact"}
              to={`/${lang}/contact`}
              icon={<AddIcCallIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={lang === "ar" ? " معلومات التواصل " : " Contact info"}
              to={`/${lang}/infContact`}
              icon={<AddIcCallIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={lang === "ar" ? " الاشتراكات " : " Subscribe"}
              to={`/${lang}/subscribe`}
              icon={<MailIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* Section Heading: Home */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              {lang === "ar" ? "" : "Home"}
            </Typography>

            {/* Top Section Item */}
            <Item
              title={lang === "ar" ? "القسم العلوي" : "Top section"}
              to={`/${lang}/home`}
              icon={<CabinIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Why Choose Us Item */}
            <Item
              title={lang === "ar" ? "لماذا تختارنا" : "Why Choose Us"}
              to={`/${lang}/whychooseus`}
              icon={<HolidayVillageIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Services Home Item */}
            <Item
              title={lang === "ar" ? "اخر قسمين " : "Last Two Section"}
              to={`/${lang}/lasttwosection`}
              icon={<OtherHousesIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Calendar Item */}
            <Item
              title={lang === "ar" ? "التقويم" : "Calendar"}
              to={`/${lang}/calendar`}
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
