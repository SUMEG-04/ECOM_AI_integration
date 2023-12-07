import React, { useEffect, useRef } from 'react';
import './Services.css';

const services = [
  {name:'E-commerce Website Development',des:'We build user-friendly e-commerce websites with modern design and robust functionality.'},
  {name:'Product Catalog Management',des:'We help you manage and organize your product catalog efficiently.'},
  {name:'Secure Payment Integration',des:'We integrate secure payment gateways for seamless online transactions.'},
  {name:'Inventory and Stock Management',des:'Keep track of your inventory and stock levels in real-time.'},
  {name:'Responsive Design',des:'Your e-commerce site will work perfectly on all devices, from desktops to mobile phones.'},
  {name:'Order Fulfillment',des:'Manage orders, track shipments, and provide excellent customer service.'},
  // Add more services as needed
];

const Service = () => {
  const containerRef = useRef();

  return (
    <div className="service-container">
      <div className="service-title">Our Services</div>
      <div ref={containerRef} className="cards-container">
        {services.map((service, index) => (
          <div key={index} className="card">
            <div className='service-info'><h4>{service.name}</h4>
            <p>{service.des}</p></div>
          </div>
        ))}
        {services.map((service, index) => (
          <div key={index} className="card">
            <div className='service-info'><h4>{service.name}</h4>
            <p>{service.des}</p></div>
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default Service;
