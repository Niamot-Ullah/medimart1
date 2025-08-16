import React from 'react';

const CategoryCard = ({category}) => {
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={category.image}
      alt={category.name}
      className='w-full h-32 object-cover mb-2 rounded-md' />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{category.name}</h2>
    <p>{category.medicineCount} medicines</p>
    
  </div>
</div>
    );
};

export default CategoryCard;