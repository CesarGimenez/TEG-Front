import React from "react";
import { Button } from "semantic-ui-react";
import "./Header.scss";

export const HeaderPage = ({
  titlePage,
  btnTitle,
  btnClick,
  btnTitleTow,
  btnClickTow,
}) => {
  return (
    <div className="header-page-admin">
      <h2>{titlePage}</h2>
      <div>
        {btnTitle && (
          <Button positive onClick={btnClick}>
            {btnTitle}
          </Button>
        )}
        {btnTitleTow && (
          <Button negative onClick={btnClickTow}>
            {btnTitleTow}
          </Button>
        )}
      </div>
    </div>
  );
};
