import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const OurMission = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const images = [
    '/images/tree_hands2.jpg',
    '/images/crypto_charity.jpg',
    '/images/donation_event.jpg',
    '/images/people_help.jpg',
  ];

  return (
    <div className="our-mission bg-gray-100 text-black mt-8 rounded-lg w-10/12 sm:w-3/4 md:w-4/5 mx-auto flex flex-col items-center">
      <div className="container mx-auto py-10 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
          <span className="text-green-600">Our Mission</span>
          <span className="hidden sm:inline">&nbsp;-&nbsp;</span>
          <br className="sm:hidden" />
          Transparent, Impactful Giving
        </h2>
        <p className="text-xl mb-8 px-8 flex justify-center">
          We are a decentralized charity organization, striving to create a
          transparent and efficient platform for charitable giving. Our
          mission is to connect donors directly with those in need, eliminating
          intermediaries and ensuring that every contribution makes a
          meaningful impact.
        </p>
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={6000}
          keyBoardControl={true}
          customTransition="all 1.2s"
          transitionDuration={1000}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          itemClass="carousel-item-padding-40-px"
        >
          {images.map((image, index) => (
            <div key={index} className="h-full w-full lg:w-1/2 xl:w-2/5 ml-auto mr-auto">
              <img src={image} alt={`Charity slide ${index}`} className="h-full w-full object-cover" />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default OurMission;
