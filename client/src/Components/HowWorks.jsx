import React from 'react';
import { FaCheck, FaFirefoxBrowser, FaPlus } from 'react-icons/fa';
import { MdAccountBalance } from 'react-icons/md';

const HowWorks = () => {
    return (
        <div className='bg-green-50 my-15 py-15'>
        <div className=' w-11/12 md:w-10/12 mx-auto'>
            <div className='text-center font-bold text-4xl text-green-700 pb-2'><h1>How It Works!</h1></div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-10 gap-1.5 space-y-5'>

{/* one  */}
                <div className='text-center space-y-2 mx-2 py-10 rounded-xl bg-white shadow-md'>
                    <MdAccountBalance className='justify-self-center mb-8 text-green-700' size={35}/>
                    <h3 className='text-2xl font-semibold'>Create an Account</h3>
                    <p className='text-gray-500'>Sign up quickly with your email <br></br> or social login to get started.</p>
                </div>
{/* two */}
                <div className='text-center space-y-2 mx-2 py-10 rounded-xl bg-white shadow-md'>
                    <FaFirefoxBrowser className='justify-self-center mb-8 text-green-700' size={35}/>
                    <h3 className='text-2xl font-semibold'>Find Medicine</h3>
                    <p className='text-gray-500'>Explore a wide variety of Medicine <br></br> posted by different shop </p>
                </div>
{/* three  */}
                <div className='text-center space-y-2 mx-2 py-10 rounded-xl bg-white shadow-md'>
                    <FaPlus className='justify-self-center mb-8 text-green-700' size={35}/>
                    <h3 className='text-2xl font-semibold'>Select the quantity</h3>
                    <p className='text-gray-500'>select the amount of medicine that you want to buy</p>
                </div>
{/* four  */}
                <div className='text-center space-y-2 mx-2 py-10 rounded-xl mb-5  bg-white shadow-md'>
                    <FaCheck className='justify-self-center mb-8 text-green-700' size={35}/>
                    <h3 className='text-2xl font-semibold'>Pay Bill</h3>
                    <p className='text-gray-500'>Pay your bill by using card</p>
                </div>

            </div>
        </div>
        </div>
    );
};

export default HowWorks;