import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="text-muted">&copy; {new Date().getFullYear()} Ericsson Canteen</p>
          </div>
          <div className="col-md-6">
            <p className="text-muted text-md-end">Made by Dhruv</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
