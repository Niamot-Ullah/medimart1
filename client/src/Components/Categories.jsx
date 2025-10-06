import React from 'react';
import CategoryCard from './CategoryCard';
import CategoriesCard2 from './CategoriesCard2';
import { Link } from 'react-router';
// import {
//   FaSatelliteDish,
//   FaVideo,
//   FaTabletAlt,
//   FaTv,
//   FaMobileAlt,
//   FaPlug,
//   FaHdd,
//   FaCamera,
//   FaCut,
//   FaClock,
//   FaHeadphones,
//   FaGamepad,
//   FaBluetooth,
// } from "react-icons/fa";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faInhaler } from "@fortawesome/free-solid-svg-icons";

// import { MdCameraAlt } from "react-icons/md";
// import { FaCapsules, FaSyringe, FaTablets,RiMedicineBottleFill,   } from 'react-icons/fa';

// const categories = [
//   { id:"1", name: "Tablet", icon: <FaTablets /> },
//   { id:"2", name: "Syrup", icon: <RiMedicineBottleFill /> },
//   { id:"3", name: "Injection", icon: <FaSyringe /> },
//   { id:"4", name: "Capsules", icon: <FaCapsules /> },
//   { id:"5", name: "Ointments", icon: <FaBottleDroplet /> },
//   { id:"6", name: "Inhalers", icon: <FontAwesomeIcon icon={faInhaler} className="text-5xl text-blue-500" /> },
//   { id:"7", name: "Portable SSD", icon: <FaHdd /> },
//   { id:"8", name: "WiFi Camera", icon: <FaCamera /> },
//   { id:"9", name: "Trimmer", icon: <FaCut /> },
//   { id:"10", name: "Smart Watch", icon: <FaClock /> },
//   { id:"11", name: "Action Camera", icon: <MdCameraAlt /> },
//   { id:"12", name: "Earphone", icon: <FaHeadphones /> },
//   { id:"13", name: "Earbuds", icon: <FaHeadphones /> },
//   { id:"14", name: "Bluetooth Speakers", icon: <FaBluetooth /> },
//   { id:"15", name: "Gaming Console", icon: <FaGamepad /> },
// ];


import {
  FaTablets,
  FaSyringe,
  FaCapsules,
  FaBandAid,
  FaLungs,
  FaFlask,
  FaPrescriptionBottleAlt,
  FaSprayCan,
  FaEyeDropper,
  FaVial,
  FaHandHoldingMedical,
} from "react-icons/fa";
import { GiMedicines, GiPowder, GiChemicalDrop, GiChemicalTank } from "react-icons/gi";
import { MdHealing } from "react-icons/md";


const categories = [
  { id:'1', name: "Tablet", icon: <FaTablets /> },
  { id:'2', name: "Syrup", icon: <FaFlask /> },
  { id:'3', name: "Injection", icon: <FaSyringe /> },
  { id:'4', name: "Inhalers", icon: <FaLungs /> },
  { id:'5', name: "Ointments", icon: <MdHealing /> },
  { id:'6', name: "Multivitamin", icon: <GiMedicines /> },
  { id:'7', name: "Painkiller", icon: <FaPrescriptionBottleAlt /> },
  { id:'8', name: "Capsule", icon: <FaCapsules /> },
  { id:'9', name: "Bandage", icon: <FaBandAid /> },
  { id:'10', name: "Drops", icon: <FaEyeDropper /> },
  { id:'11', name: "Powder", icon: <GiPowder /> },
  { id:'12', name: "Spray", icon: <FaSprayCan /> },
  { id:'13', name: "Suppository", icon: <GiChemicalDrop /> },
  { id:'14', name: "Gel", icon: <FaHandHoldingMedical /> },
  { id:'15', name: "Saline", icon: <GiChemicalTank /> },
];

const Categories = () => {
    return (
        <section className="py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Featured Category
        </h2>
        <p className="text-gray-500 mb-8">
          Get Your Medicine from Featured Category!
        </p>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat, index) => (
            <Link to={`/category-product/${cat.name}`}
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer border border-gray-100"
            >
              <div className="text-3xl text-green-600 mb-2">{cat.icon}</div>
              <p className="text-gray-700 font-medium">{cat.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
        // <div className='my-8 w-11/12 md:w-10/12 mx-auto'>
        // {/* example data */}
        //         {/* <CategoriesCard2 /> */}
        //     <h2 className='text-4xl text-center font-bold mb-4'>Categories</h2>
        //     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        //         {
        //             categories.map(category =><CategoriesCard2 key={category.id} category={category}></CategoriesCard2>)
        //         }

                
                

        //     </div>
        // </div>
    );
};

export default Categories;