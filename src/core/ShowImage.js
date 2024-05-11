import React from 'react';
import { API } from '../config';

const ShowImage = ({ item, url }) => (
  <div className='product-img img-fluid'>
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      className='mb-3 center'
      style={{ maxHeight: '100%', maxWidth: '100%' }}
    />
  </div>
);

export default ShowImage;