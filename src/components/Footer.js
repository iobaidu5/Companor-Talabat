import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 pt-8 pb-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:justify-between mb-6">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <img src="./companor-logo.png" className="rounded-xl w-44" />
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div>
              <h3 className="font-PoppinsSemiBold text-lg text-gray-800">Company</h3>
              <ul className="mt-2 space-y-1">
                <li>
                  <a href="#" className="text-[0.9rem]">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[0.9rem]">
                    Jobs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[0.9rem]">
                    Newsroom
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-PoppinsSemiBold text-lg text-gray-800">Explore</h3>
              <ul className="mt-2 space-y-1">
                <li>
                  <a href="#" className="text-[0.9rem]">
                    Restaurants
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[0.9rem]">
                    My Cart
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-PoppinsSemiBold text-lg text-gray-800">Policies</h3>
              <ul className="mt-2 space-y-1">
                <li>
                  <a href="#" className="text-[0.9rem]">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[0.9rem]">
                    Terms of use
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-PoppinsSemiBold text-lg text-gray-800">Help</h3>
              <ul className="mt-2 space-y-1">
                <li>
                  <a href="#" className="text-[0.9rem]">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[0.9rem]">
                    Cancel booking
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
          <p>
            © 2024 Companor, Inc., an Companor Group company. All rights
            reserved. Companor and the Companor Logo are trademarks or
            registered trademarks of Companor, Inc. CST# 2029030-50.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
