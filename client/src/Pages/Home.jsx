import React from 'react';
import { useLoaderData } from 'react-router';
import Categories from '../Components/Categories';
import HowWorks from '../Components/HowWorks';
import ServiceSection from '../Components/ServiceSection';

const Home = () => {
    const data = useLoaderData()

    return (
        <div className=''>
            <Categories data={data}></Categories>
            <ServiceSection></ServiceSection>
            <HowWorks></HowWorks>
        </div>
    );
};

export default Home;