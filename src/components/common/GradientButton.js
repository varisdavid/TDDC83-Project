import React from "react";
import { Icon } from "@material-ui/core";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

// eslint-disable-next-line react/prop-types
const GradientButton = ({ type, text, size, loading, onClick }) => {
  const classes = {
    "flex rounded-full items-center py-2 px-6 bg-gradient focus:outline-none shadow-lg text-white": true,
    "text-2xl": size === "lg",
  };
  return (
    <button type={type} className={classes} onClick={onClick}>
      {loading ? (
        <span className="flex items-center">
          <Icon icon={RadioButtonUncheckedIcon} spin />
          <span className="ml-2">Loading...</span>
        </span>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};

export default GradientButton;
