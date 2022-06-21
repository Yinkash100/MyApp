import React from "react";
import { Link } from "react-router-dom";


const Error500 = () => {
  return (
    <div className="errorPage">
      <div className="app__container-error">
      <div className="app__error-content">
        <div className="app__error-content-bg">
          <div className="app__error--code">500</div>
          <div className="app__error--info">
            Server currently down.
            <div className="app__error--info-text">Try again in a minute</div>
          </div>

          <div className="app__error--button">
            <Link to="/">
              {" "}
              <span  className="btn">
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

export default Error500;
