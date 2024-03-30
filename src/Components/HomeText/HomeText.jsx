import { Divider, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export default function HomeText() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        direction: i18n.language === "ar" && "rtl",
      }}
    >
      <div style={{ width: "46.667%", alignSelf: "center" }}>
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontSize: "49px",
            fontWeight: "600",
            color: "#362566",
            lineHeight: "59px",
            textAlign: i18n.language === "ar" ? "justify" : "left",
          }}
        >
          {t("home.title")}
          <span
            style={{
              color: "#5F41B2",
              marginRight: i18n.language === "ar" && "10px",
            }}
          >
            Trollii{" "}
          </span>
        </Typography>
        <Divider
          sx={{
            width: "35.7%",
            marginTop: "1.375em",
            marginBottom: "2.1875em",
            borderColor: "rgba(0, 0, 0, 0.35)",
          }}
        />
        <Typography
          sx={{
            fontFamily: "Roboto",
            color: "#5D5C66",
            lineHeight: "19px",
            textAlign: "left",
            inlineSize: "90%",
            textAlign: i18n.language === "ar" ? "justify" : "left",
          }}
        >
          {t("home.description")}
        </Typography>
      </div>
      <img alt="home card" src={require("../../Images/home-card.png")} />
    </div>
  );
}
