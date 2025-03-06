"use client";

import { useState } from "react";
import styled from "styled-components";

const Switch = ({gridsnip,setgridsnip,text}) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <StyledWrapper>
      <div className="checkbox-wrapper-35">
        <input
          type="checkbox"
          id="switch"
          className="switch"
          checked={isChecked}
          onChange={() => {
            setIsChecked(!isChecked);
            setgridsnip(!gridsnip);
          }}
        />
        <label htmlFor="switch">
          <div className="switch-x-text text-white">{text} </div>
          <span className="switch-x-toggletext">
            <span className="switch-x-unchecked">
              <span className="switch-x-hiddenlabel text-white">Unchecked: </span> Off
            </span>
            <span className="switch-x-checked">
              <span className="switch-x-hiddenlabel text-white">Checked: </span> On
            </span>
          </span>
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .checkbox-wrapper-35 .switch {
    display: none;
  }

  .checkbox-wrapper-35 .switch + label {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 12px;
    line-height: 15px;
    position: relative;
    user-select: none;
    color: #78768d;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .checkbox-wrapper-35 .switch + label::before {
    content: "";
    display: block;
    width: 25px;
    height: 15px;
    background-color: #05012c;
    border-radius: 500px;
    margin-right: 8px;
    transition: background-color 0.125s ease-out;
  }

  .checkbox-wrapper-35 .switch + label::after {
    content: "";
    position: absolute;
    left: 1px;
    top: 1px;
    width: 13px;
    height: 13px;
    background-color: #fff;
    border-radius: 13px;
    box-shadow: 0 3px 1px rgba(37, 34, 71, 0.05), 0 2px 2px rgba(37, 34, 71, 0.1),
      0 3px 3px rgba(37, 34, 71, 0.05);
    transition: transform 0.125s ease-out;
  }

  .checkbox-wrapper-35 .switch:checked + label::before {
    background-color: #ffb500;
  }

  .checkbox-wrapper-35 .switch:checked + label::after {
    transform: translateX(10px);
  }

  .checkbox-wrapper-35 .switch + label .switch-x-toggletext {
    display: block;
    font-weight: bold;
    width: 25px;
    height: 15px;
    position: relative;
    overflow: hidden;
  }

  .checkbox-wrapper-35 .switch + label .switch-x-unchecked,
  .checkbox-wrapper-35 .switch + label .switch-x-checked {
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.125s ease-out, opacity 0.125s ease-out;
  }

  .checkbox-wrapper-35 .switch + label .switch-x-unchecked {
    opacity: 1;
    transform: none;
  }

  .checkbox-wrapper-35 .switch:checked + label .switch-x-unchecked {
    opacity: 0;
    transform: translateY(-100%);
  }

  .checkbox-wrapper-35 .switch + label .switch-x-checked {
    opacity: 0;
    transform: translateY(100%);
  }

  .checkbox-wrapper-35 .switch:checked + label .switch-x-checked {
    opacity: 1;
    transform: none;
  }

  .checkbox-wrapper-35 .switch-x-hiddenlabel {
    position: absolute;
    visibility: hidden;
  }
`;

export default Switch;
