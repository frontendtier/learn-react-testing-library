import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import Checkout from './pages/Checkout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Checkout items={[
      {
        id: 1,
        title: 'Mechanical Keyboard',
        description: 'Drive your co-workers crazy with this new mechanical keyboard!',
        image: './product.png',
        price: 8999,
      }
    ]}/>
  </React.StrictMode>
);