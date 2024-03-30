import React from "react";
import { useTranslation } from "react-i18next";
import { colors } from "../colors";
const LanguageToggleButton = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
  };

  return (
    <button
      className="btn"
      onClick={toggleLanguage}
      style={{
        color: "white",
        backgroundColor: colors.violet,
        padding: "5px 10px",
        width: "100px",
      }}
    >
      {i18n.language === "ar" ? "English" : "العربية"}
    </button>
  );
};

export default LanguageToggleButton;
