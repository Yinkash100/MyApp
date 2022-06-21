import React from "react";
import { Link } from "react-router-dom";


const Error404 = () => {
  return (
    <div className="errorPage">
      <div className="app__container-error">
      <div className="app__error-content">
        <div className="app__error-content-bg">
          <div className="app__error--code">404</div>
          <div className="app__error--info">Page Not Found</div>
          <div className="app__error--button">
            <Link to="/">
              {" "}
              <span className="btn">
                Go Back Home{" "}
              </span>
            </Link>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
};

export default Error404;
