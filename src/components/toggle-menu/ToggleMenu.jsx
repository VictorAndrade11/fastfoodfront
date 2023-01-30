import React from 'react';
import "./ToggleMenu.css"

const ToggleMenu = ({isActive, onToggle}) => {
  return (
    <button
      className={`${isActive ? "toggle" : ""} center sm:hidden`}
      onClick={() => onToggle(!isActive)}
    >
      <div></div>
    </button>
  )
}

export default ToggleMenu;