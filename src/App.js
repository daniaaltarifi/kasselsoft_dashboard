import { useState,useEffect } from "react";
import { Routes, Route,Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Contact from "./pages/Contact/Contact";
import Add from "./pages/Contact/Add";
import UpdateContact from "./pages/Contact/UpdateContact";
import InfContact from "./pages/Contact/InfContact";
import Blogs from "./pages/Blogs/Blogs";
import Career from "./pages/Career/Career";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Home from "./pages/Home/Home";
import { useNavigate,useLocation } from 'react-router-dom';
import UpdateMainHome from "./pages/Home/UpdateMainHome";
import UpdateServicesHome from "./pages/Home/UpdateServicesHome";
import WhyChooseUs from "./pages/Home/WhyChooseUs";
import UpdateWhyChooseUs from "./pages/Home/UpdateWhyChooseUs";
import UpdateCardHome from "./pages/Home/UpdateCardHome";
import TeamAbout from "./pages/About/TeamAbout";
import UpdateTeam from "./pages/About/UpdateTeam";
import AddTeam from "./pages/About/AddTeam";

import UpdateServicesAbout from "./pages/About/UpdateServicesAbout";
import AddImgSliderHome from "./pages/Home/AddImgSliderHome";
import LastTwoSection from "./pages/Home/LastTwoSection";
import UpdateCareersHome from "./pages/Home/UpdateCareersHome";
import UpdateExperienceHome from "./pages/Home/UpdateExperienceHome";
import AddExperienceSlider from "./pages/Home/AddExperienceSlider";
import Titles from "./pages/Titles/Titles";
import UpdateTitles from "./pages/Titles/UpdateTitles";
import AddServices from "./pages/Services/AddServices";
import UpdateServices from "./pages/Services/UpdateServices";
import UpdateHowWeWork from "./pages/Services/UpdateHowWeWork";
import AddIndustryImg from "./pages/Services/AddIndustryImg";
import UpdateBackgrounPath from "./pages/Titles/UpdateBackgroundPath";
import UpdateFooterContact from "./pages/Contact/UpdateFooterContact";
import AddCareer from "./pages/Career/AddCareer";
import UpdateCareer from "./pages/Career/UpdateCareer";
import AddBlog from "./pages/Blogs/AddBlog";
import UpdateBlog from "./pages/Blogs/UpdateBlog";
import TermsAndCondition from "./pages/TermsAndCondition/TermsAndCondition";
import UpdateTermsAndCondition from "./pages/TermsAndCondition/UpdateTermsAndCondition";
import AddBlackTerms from "./pages/TermsAndCondition/AddBlackTerms";
import UpdateBlackTerms from "./pages/TermsAndCondition/UpdateBlackTerms";
import AddBlueTerms from "./pages/TermsAndCondition/AddBlueTerms";
import UpdateBlueTerms from "./pages/TermsAndCondition/UpdateBlueTerms";
import UpdateAbout from "./pages/About/UpdateAbout";
import AddServicesAbout from "./pages/About/AddServicesAbout";
import AddPosition from "./pages/Career/AddPosition";
import LoginForm from "./pages/Titles/LoginForm";
import SignUp from "./pages/SignUp/SignUp.jsx";
import UpdateParagraph from "./pages/Blogs/UpdateParagraph.jsx";
import AddAdmin from "./pages/SignUp/AddAdmin.jsx";
import Subscribe from "./pages/Subscribe/Subscribe.jsx";
import Phone from "./pages/PhoneNumbers/Phone.jsx";
import AddPhone from "./pages/PhoneNumbers/AddPhone.jsx";
import UpdatePhone from "./pages/PhoneNumbers/UpdatePhone.jsx";
import AddCode from "./pages/PhoneNumbers/AddCode.jsx";
import UpdateCode from "./pages/PhoneNumbers/UpdateCode.jsx";
import Portfolio from "./pages/Portfolio/Portfolio.jsx";
import AddPortfolio from "./pages/Portfolio/AddPortfolio.jsx";
import UpdatePortfolio from "./pages/Portfolio/UpdatePortfolio.jsx";
import AddTypeOfPortfolio from "./pages/Portfolio/AddTypeOfPortfolio.jsx";
import UpdateTypeOfPortfolio from "./pages/Portfolio/UpdateTypeOfPortfolio.jsx";
import AddServicesPortfolio from "./pages/Portfolio/AddServicesPortfolio.jsx";
import UpdateServicesPortfolio from "./pages/Portfolio/UpdateServicesPortfolio.jsx";
import Categories from "./pages/Categories/Categories.js";
import AddCategories from "./pages/Categories/AddCategories.js";
import UpdateCategories from "./pages/Categories/UpdateCategories.js";
import Courses from "./pages/Courses/Courses.js";
const DirectionHandler = () => {
  const location = useLocation();

  const lang = location.pathname.split('/')[1] || 'en'; // Get the language from the path, default to 'en'
  useEffect(() => {
    document.body.classList.remove('ltr', 'rtl'); // Remove previous direction classes
    document.body.classList.add(lang === 'ar' ? 'rtl' : 'ltr'); // Add new direction class
  }, [lang]);

  return null;
};

const RedirectToDefaultLanguage = () => {
  const navigate = useNavigate();
 const location = useLocation();

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  useEffect(() => {
      if (isAuthenticated) {
        if (location.pathname === '/') {
          navigate('/en'); // Redirect to default language if logged in and at root
        }
      } else {
        if (location.pathname !== '/login') {
          navigate('/login'); // Redirect to login if not logged in and not already there
        }
      }
  
  }, [isAuthenticated, navigate]);

 

  return null;
};
// const RedirectToDefaultLanguage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isAuthenticated= localStorage.getItem('isAuthenticated') === 'true';
//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/en'); // Redirect to default language if logged in
//     } else {
//       navigate('/login'); // Redirect to login if not logged in
//     }
//   }, [navigate, location.pathname]);

//   return null;
// };

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation(); // Get the current location
 
  useEffect(() => {
    if (location.pathname === '/login') {
      setIsSidebar(false);
    } else {
      setIsSidebar(true);
    }
  }, [location.pathname]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        <div className="app">
        {isSidebar && <Sidebar isSidebar={isSidebar} />} {/* Only render if isSidebar is true */}
        <main className="content">
          {isSidebar && <Topbar setIsSidebar={setIsSidebar} />} {/* Only render if isSidebar is true */}
            <DirectionHandler />
            <RedirectToDefaultLanguage />

            <Routes>
              
            <Route path="/login" element={<LoginForm />} />

              <Route path="/:lang" element={<Dashboard />} />

              <Route path="/contacts" element={<Contacts />} />
             
              <Route path="/form" element={<Form />} />
             
           
             
              <Route path="/faq" element={<FAQ />} />
              <Route path="/:lang/calendar" element={<Calendar />} />
           
              <Route path="/:lang/contact" element={<Contact />} />

              {/* Add more routes here */}
              <Route path="/:lang/career" element={<Career />} />
              <Route path="/:lang/addcareer" element={<AddCareer />} />
              <Route path="/:lang/updatecareer" element={<UpdateCareer />} />
              <Route path="/:lang/addposition" element={<AddPosition />} />

              <Route path="/:lang/blogs" element={<Blogs />} />
              <Route path="/:lang/addblog" element={<AddBlog />} />
              <Route path="/:lang/updateblog" element={<UpdateBlog />} />
              <Route path="/:lang/updateparagraph" element={<UpdateParagraph />} />
              <Route path="/:lang/users" element={<SignUp />} />
              <Route path="/:lang/addadmin" element={<AddAdmin />} />
              <Route path="/:lang/phone" element={<Phone />} />
              <Route path="/:lang/addphonenum" element={<AddPhone />} />
              <Route path="/:lang/updatephone" element={<UpdatePhone />} />
              <Route path="/:lang/addcode" element={<AddCode />} />
              <Route path="/:lang/updatecode" element={<UpdateCode />} />
              {/* pages route */}
              <Route path="/:lang/about" element={<About />} />
              <Route path="/:lang/updateabout" element={<UpdateAbout />} />
              <Route path="/:lang/addservicesabout" element={<AddServicesAbout />} />
              <Route path="/:lang/services" element={<Services />} />
              <Route path="/:lang/addservices" element={<AddServices />} />
              <Route path="/:lang/updateservices" element={<UpdateServices />} />
              <Route path="/:lang/updatehowwework" element={<UpdateHowWeWork />} />
              <Route path="/:lang/addindustryimg" element={<AddIndustryImg />} />
              <Route path="/:lang/updatebackgroundpath" element={<UpdateBackgrounPath />} />
              <Route path="/:lang/termsandcondition" element={<TermsAndCondition />} />
              <Route path="/:lang/updatetermsandcondition" element={<UpdateTermsAndCondition />} />
              <Route path="/:lang/addblackterms" element={<AddBlackTerms />} />
              <Route path="/:lang/updateblackterms" element={<UpdateBlackTerms />} />
              <Route path="/:lang/addblueterms" element={<AddBlueTerms />} />
              <Route path="/:lang/updateblueterms" element={<UpdateBlueTerms />} />
              <Route path="/:lang/categories" element={<Categories />} />
              <Route path="/:lang/AddCategory" element={<AddCategories />} />
              <Route path="/:lang/Updatecategory/:id" element={<UpdateCategories />} />
              <Route path="/:lang/courses" element={<Courses/>} />

              <Route path="/:lang/infContact" element={<InfContact />} />
              <Route path="/:lang/updatefooter" element={<UpdateFooterContact />} />
              <Route path="/:lang/titles" element={<Titles />} />
              <Route path="/:lang/updatetitle" element={<UpdateTitles />} />

              <Route path="/:lang/updateContact" element={<UpdateContact />} />  
              <Route path="/:lang/updateTeam" element={<UpdateTeam />} /> 
              <Route path="/:lang/updateServicesAbout" element={<UpdateServicesAbout />} />
              <Route path="/:lang/addTeam" element={<AddTeam />} />   
              <Route path="/:lang/add" element={<Add />} />
              <Route path="/:lang/teamAbout" element={<TeamAbout />} />
              <Route path="/:lang/subscribe" element={<Subscribe />} />
              {/* home routes */}
              <Route path="/:lang/home" element={<Home />} />
              <Route path="/:lang/updatemainhome" element={<UpdateMainHome />} />
              <Route path="/:lang/updateserviceshome" element={<UpdateServicesHome />} />
              <Route path="/:lang/whychooseus" element={<WhyChooseUs />} />
              <Route path="/:lang/updatewhychooseus" element={<UpdateWhyChooseUs />} />
              <Route path="/:lang/updatecardhome" element={<UpdateCardHome />} />
              <Route path="/:lang/addimgslider" element={<AddImgSliderHome />} />
              <Route path="/:lang/lasttwosection" element={<LastTwoSection />} />
              <Route path="/:lang/updatecareershome" element={<UpdateCareersHome />} />
              <Route path="/:lang/updateexphome" element={<UpdateExperienceHome />} />
              <Route path="/:lang/addexphome" element={<AddExperienceSlider />} />

             {/* Portfolio routes */}
             <Route path="/:lang/portfolio" element={<Portfolio />} />
             <Route path="/:lang/addportfolio" element={<AddPortfolio />} />
             <Route path="/:lang/updateportfolio" element={<UpdatePortfolio />} />
             <Route path="/:lang/addtypeofportfolio" element={<AddTypeOfPortfolio />} />
             <Route path="/:lang/updatetypeofportfolio" element={<UpdateTypeOfPortfolio />} />
             <Route path="/:lang/addservicesportfolio" element={<AddServicesPortfolio />} />
             <Route path="/:lang/updateservicesportfolio" element={<UpdateServicesPortfolio />} />

          
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
