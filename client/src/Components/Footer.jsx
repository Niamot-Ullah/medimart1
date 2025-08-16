import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
    return (
        <>
            <footer className="footer sm:footer-horizontal bg-green-800 text-neutral-content p-10">
                <nav>
                    <h6 className="footer-title">MediMart</h6>
                    <p className="text-gray-200">
                        MediMart is your trusted marketplace to <br></br> buy and sell
                        quality medical products. <br></br>
                    </p>
                </nav>
                <nav>
                    <h6 className="footer-title">Contact Us</h6>
                    <p>
                        Email :{" "}
                        <Link className="text-gray-300 hover:underline">
                            support@MediMart.com
                        </Link>
                    </p>
                    <p>
                        Phone :{" "}
                        <Link className="text-gray-300 hover:underline">+1234-56789</Link>
                    </p>
                    <p>address : 123 Street, New York, USA</p>
                </nav>
                <nav>
                    <h6 className="footer-title">Useful Links</h6>
                    
                    <div className="flex gap-3 pt-2">
                        <Link>
                            <FaFacebook size={25} />
                        </Link>
                        <Link>
                            <FaInstagram size={25} />
                        </Link>
                        <Link>
                            <FaLinkedin size={25} />
                        </Link>
                    </div>
                </nav>
            </footer>
            <div className=" text-center bg-green-800 text-white py-6 border-t-1 border-gray-50">
                <span>©2025 All rights reserved</span>
            </div>
        </>
    );
};

export default Footer;