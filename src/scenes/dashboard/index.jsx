import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import WorkIcon from "@mui/icons-material/Work";
import BookIcon from "@mui/icons-material/Book";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import StatBox from "../../components/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { lang } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const [blogs, setblogs] = useState([]);
  const [careers, setcareers] = useState([]);
  const [services, setservices] = useState([]);
  const [jobapplication, setjobapplication] = useState([]);
  const [contactform, setContactform] = useState([]);
  const [jobdescr, setJopDescr] = useState([]);
  const [position, setPosition] = useState([]);
  const [Portfolio, setPortfolio] = useState([]);


  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const [careersRes, blogsRes, servicesRes, jobapplicationRes,contactforemRes,jobdescrRes,positionRes,portfolioRes] =
          await Promise.all([
            axios.get(`${API_URL}/careers/${lang}`),
            // axios.get(`${API_URL}/imgsliderhome/`),
            axios.get(`${API_URL}/blogs/${lang}`),
            axios.get(`${API_URL}/services/${lang}`),
            axios.get(`${API_URL}/careerform`),
            axios.get(`${API_URL}/contactForm`),
            axios.get(`${API_URL}/jobdescription`),
            axios.get(`${API_URL}/position`),
            axios.get(`${API_URL}/portfolio/${lang}`),
          ]);

        setblogs(careersRes.data);
        setcareers(blogsRes.data);
        setservices(servicesRes.data);
        setjobapplication(jobapplicationRes.data);
        setContactform(contactforemRes.data)
        setJopDescr(jobdescrRes.data)
        setPosition(positionRes.data)
        setPortfolio(portfolioRes.data)
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [lang]);
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={lang === "ar" ? "  لوحة التحكم  " : "DASHBOARD"}
          subtitle={lang === "ar" ? "اهلا بك في لوحة تحكم كاسل" : "Welcome To Kassel Dashboard"}
        />

       
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(2, 1fr)", // 2 columns on extra small screens
          sm: "repeat(3, 1fr)", // 3 columns on small screens
          md: "repeat(6, 1fr)", // 4 columns on medium screens
          lg: "repeat(12, 1fr)", // 12 columns on large screens
        }}        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={careers.length}
            subtitle={lang === "ar" ? "الوظائف" : "Careers"}
            icon={
              <WorkIcon
                sx={{ color: colors.lightBlue[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={blogs.length}
            subtitle={lang === "ar" ? "المدونات" : "Blogs"}
            icon={
              <BookIcon
                sx={{ color: colors.lightBlue[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={services.length}
            subtitle={lang === "ar" ? "الخدمات" : "services"}
            icon={
              <DesignServicesIcon
                sx={{ color: colors.lightBlue[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={Portfolio.length}
            subtitle={lang === "ar" ? "المشاريع" : "Portfolio"}
            icon={
              <DesignServicesIcon
                sx={{ color: colors.lightBlue[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={jobapplication.length}
            subtitle={lang === "ar" ? "طلبات التوظيف حسب الوظيفة" : "Job Applications by Position"}
            icon={
              <CloudDoneIcon
                sx={{ color: colors.lightBlue[600], fontSize: "26px" }}
              />
            }
          />
          
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={position.length}
            subtitle={lang === "ar" ? "الوظائف " : "Positions"}
            icon={
              <CloudDoneIcon
                sx={{ color: colors.lightBlue[600], fontSize: "26px" }}
              />
            }
          />
          
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={contactform.length}
            subtitle={lang === "ar" ? "تواصل معنا" : "Contact Us"}
            icon={
              <CloudDoneIcon
                sx={{ color: colors.lightBlue[600], fontSize: "26px" }}
              />
            }
          />
          
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={jobdescr.length}
            subtitle={lang === "ar" ? "طلبات التوظيف حسب الدور المحدد" : " Job Applications by Specific Role"}
            icon={
              <CloudDoneIcon
                sx={{ color: colors.lightBlue[600], fontSize: "26px" }}
              />
            }
          />
          
        </Box>
       
        {/* ROW 3 */}
      </Box>
    </Box>
  );
};

export default Dashboard;
