import React from 'react';

const Scroll = (props) => {
    return (
      <div style={{overflowY: 'scroll', border: '0px solid white', height: '800px',backgroundColor:"#1ABC56" }}>
          {props.children}
      </div>  
    );
};

export default Scroll;