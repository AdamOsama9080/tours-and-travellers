import React, { useState } from "react";
import { FaQuestionCircle, FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Questions = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(null);
  const [expandDiv1, setExpandDiv1] = useState(false);
  const { i18n } = useTranslation();

  const toggleExpand = (index) => {
    if (expanded === index) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }
  };

  const toggleExpandDiv1 = () => {
    setExpandDiv1(!expandDiv1);

    if (expanded !== null && expanded !== 1) {
      setExpanded(null);
    }
  };

  return (
    <div>
      <div
        className="Question"
        style={{ direction: i18n.language === "ar" && "rtl" }}
      >
        <h2>{t("questions.what_tourists_ask")}</h2>
        <div className="div1">
          <div className="icon-with-text1" onClick={toggleExpandDiv1}>
            <FaQuestionCircle className="icon" />
            <h4 style={{ marginLeft: "5px" }}>
              {t("questions.hotel_transfers")}
            </h4>
            <div className="plus-icon">
              {expandDiv1 ? (
                <FaMinusCircle className="icon" style={{ color: "#3B3666" }} />
              ) : (
                <FaPlusCircle className="icon" style={{ color: "gray" }} />
              )}
            </div>
          </div>
          {expandDiv1 && <p>{t("questions.hotel_transfers_description")}</p>}
        </div>

        <div className="div2">
          <div className="icon-with-text" onClick={() => toggleExpand(2)}>
            <div className="icon-text">
              <FaQuestionCircle className="icon" />
              <h4>{t("questions.accessibility_staff")}</h4>
            </div>
            <div className="plus-icon">
              {expanded === 2 ? (
                <FaMinusCircle className="icon" style={{ color: "#3B3666" }} />
              ) : (
                <FaPlusCircle className="icon" style={{ color: "gray" }} />
              )}
            </div>
          </div>
          {expanded === 2 && (
            <p>{t("questions.accessibility_staff_description")}</p>
          )}
        </div>
        <hr></hr>
        <h2>{t("questions.cancellation_policy")}</h2>
        <div className="txt1">
          <p>{t("questions.cancellation_policy_description")}</p>
        </div>
        <div className="txt2">
          <ul>
            <li>{t("questions.full_refund")}</li>
            <li>{t("questions.no_refund")}</li>
            <li>{t("questions.no_changes")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Questions;
