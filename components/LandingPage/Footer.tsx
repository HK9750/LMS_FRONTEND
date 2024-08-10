import React from "react";

const Footer = () => {
  return (
    <footer className="bg-background py-8 border-t border-muted">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-muted-foreground mb-4">Courses</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground hover:text-primary">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground hover:text-primary">
                  Data Science
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground hover:text-primary">
                  Design
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground hover:text-primary">
                  Marketing
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground hover:text-primary">
                  Business
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-muted-foreground mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground hover:text-primary">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground hover:text-primary">
                  Team
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground hover:text-primary">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground hover:text-primary">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground hover:text-primary">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-muted-foreground mb-4">My Account</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground hover:text-primary">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground hover:text-primary">
                  Settings
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground hover:text-primary">
                  Orders
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground hover:text-primary">
                  Wishlist
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground hover:text-primary">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-muted-foreground mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  className="text-foreground hover:text-primary"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  className="text-foreground hover:text-primary"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  className="text-foreground hover:text-primary"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground hover:text-primary">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground hover:text-primary">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-muted pt-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Your Company. All rights reserved.
          </p>
          <ul className="flex justify-center space-x-4 mt-4">
            <li>
              <a href="#" className="text-foreground hover:text-primary">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-foreground hover:text-primary">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="text-foreground hover:text-primary">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="text-foreground hover:text-primary">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
