import { Typography, Box, useMediaQuery, useTheme, Link } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Define LinkElement component here
const LinkElement = ({ name = "N/A", href = "/" }) => (
  <li
    style={{
      listStyle: "none",
      marginBottom: "6px",
    }}
  >
    <Link
      style={{
        textDecoration: "none",
        fontFamily: "Roboto",
        fontSize: "0.875rem",
        color: "#362566",
        cursor: "pointer",
      }}
      href={href}
    >
      {name}
    </Link>
  </li>
);

const Footer = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isMedium = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate(); // Using useNavigate for navigation

  return (
    <Box
      sx={{
        boxShadow: "0px 2px 8px rgba(38, 36, 131, 0.1)",
        display: "flex",
        padding: isMobile ? "18px 16px 45px" : "14px 80px 58px",
        paddingTop: "24px",
        flexDirection: isMobile ? "column" : "null",
        whiteSpace: "nowrap",
        textAlign: "left",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            color: "#5F41B3",
            fontFamily: "Roboto",
            fontWeight: "600",
            fontSize: "2.1875rem",
            letterSpacing: -0.3,
            marginBottom: isMobile ? "22px" : null,
          }}
        >
          Trollii
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: isMobile ? "space-between" : null,
        }}
      >
        <div
          style={{
            marginLeft: isMobile ? null : isMedium ? "4vw" : "8.33vw",
          }}
        >
          <h5
            style={{
              fontFamily: "Roboto",
              fontWeight: "500",
              fontSize: "1rem",
              color: "#362566",
            }}
          >
            {t("footer.company")} {/* Use t function for translation */}
          </h5>
          <hr
            style={{
              width: "40px",
              color: "#FFC725",
              border: "1px solid #FFC725",
              opacity: "unset",
              margin: "17px 0",
            }}
          />
          {[
            { name: t("footer.about"), path: "/AboutUs" },
            { name: t("footer.mobile") }, // Use t function for translation
            { name: t("footer.blog") }, // Use t function for translation
            { name: t("footer.howWeWork") }, // Use t function for translation
          ].map(({ name, path }, index) => (
            <div
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(path)}
            >
              {name}
            </div>
          ))}
        </div>
        <div
          style={{
            marginLeft: isMobile ? null : isMedium ? "4vw" : "8.33vw",
          }}
        >
          <h5
            style={{
              fontFamily: "Roboto",
              fontWeight: "500",
              fontSize: "1rem",
              color: "#362566",
            }}
          >
            {t("footer.legal")} {/* Use t function for translation */}
          </h5>
          <hr
            style={{
              width: "40px",
              color: "#FFC725",
              border: "1px solid #FFC725",
              opacity: "unset",
              margin: isMobile ? "17px 39vw 17px 0" : "17px 0",
            }}
          />
          {[
            { name: t("footer.termsConditions"), href: "/terms&conditions" }, // Use t function for translation
            { name: t("footer.privacyPolicy"), href: "/privacy" }, // Use t function for translation
          ].map(({ name, href }, index) => (
            <LinkElement key={index} name={name} href={href} />
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: isMobile ? "space-between" : null,
          marginTop: isMobile ? "8px" : null,
          flexDirection: isMobile ? "row-reverse" : null,
        }}
      >
        <div
          style={{
            marginLeft: isMobile ? null : isMedium ? "4vw" : "8.33vw",
          }}
        >
          <h5
            style={{
              fontFamily: "Roboto",
              fontWeight: "500",
              fontSize: "1rem",
              color: "#362566",
            }}
          >
            {t("footer.support")} {/* Use t function for translation */}
          </h5>
          <hr
            style={{
              width: "40px",
              color: "#FFC725",
              border: "1px solid #FFC725",
              opacity: "unset",
              margin: isMobile ? "17px 39vw 17px 0" : "17px 0",
            }}
          />
          {[
            { name: t("footer.contactUs"), path: "/ContactUs" },
            { name: t("footer.faqs"), path: "/Frequentlyaskedquestions" }
          ].map(({ name, path }, index) => (
            <div
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(path)}
            >
              {name}
            </div>
          ))}
        </div>
        <div
          style={{
            marginLeft: isMobile ? null : isMedium ? "4vw" : "8.33vw",
          }}
        >
          <h5
            style={{
              fontFamily: "Roboto",
              fontWeight: "500",
              fontSize: "1rem",
              color: "#362566",
            }}
          >
            {t("footer.more")} {/* Use t function for translation */}
          </h5>
          <hr
            style={{
              width: "40px",
              color: "#FFC725",
              border: "1px solid #FFC725",
              opacity: "unset",
            }}
          />
          {[
            { name: t("footer.airlineFees") },
            { name: t("footer.airlines") },
            { name: t("footer.partners") },
            { name: t("footer.advertiseWithUs") },
          ].map(({ name, href }, index) => (
            <LinkElement key={index} name={name} href={href} />
          ))}
        </div>
      </div>
      {isMobile ? (
        <div
          style={{
            width: "256px",
            display: "flex",
            justifyContent: "space-between",
            margin: "26px auto 0",
          }}
        >
          {["facebook", "instagram", "youtube", "twitter"].map((item, index) => {
            return (
              <img
                key={index} // Assigning the index as a unique key
                alt="social media logos"
                src={require(`../../Images/Footer/${item}.png`)}
              />
            );
          })}
        </div>
      ) : null}
    </Box>
  );
};

export default Footer;
