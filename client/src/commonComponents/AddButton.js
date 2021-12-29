import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
function AddButton(props) {
  const { variant, link, content } = props;
  return (
    <>
      <Link to={link}>
        <Button variant={variant}>
          {content}
        </Button>
      </Link>
    </>
  );
}

export default AddButton;
