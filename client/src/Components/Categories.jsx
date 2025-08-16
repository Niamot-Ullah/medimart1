import React from 'react';
import CategoryCard from './CategoryCard';

const Categories = ({data}) => {
    return (
        <div className='my-8 w-11/12 md:w-10/12 mx-auto'>
            <h2 className='text-4xl text-center font-bold mb-4'>Categories</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    data.map(category => <CategoryCard key={category.id} category={category}></CategoryCard>)
                }
            </div>
        </div>
    );
};

export default Categories;