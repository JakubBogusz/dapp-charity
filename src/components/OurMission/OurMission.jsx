import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './OurMission.css';

const OurMission = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    '/images/tree_hands2.jpg',
    '/images/crypto_charity.jpg',
    '/images/donation_event.jpg',
    '/images/people_help.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="our-mission bg-gray-100 text-black mt-8 rounded-lg w-10/12 sm:w-3/4 md:w-4/5 mx-auto flex flex-col items-center">
      <div className="container mx-auto py-10 px-4">
        <h2 className="text-4xl font-bold mb-6 flex justify-center"><span className="text-green-600">Our Mission</span>&nbsp;- Transparent, Impactful Giving</h2>
        <p className="text-xl mb-8 px-8 flex justify-center">
          We are a decentralized charity organization, striving to create a
          transparent and efficient platform for charitable giving. Our
          mission is to connect donors directly with those in need, eliminating
          intermediaries and ensuring that every contribution makes a
          meaningful impact.
        </p>
        <Carousel
          showArrows
          showStatus={false}
          transitionTime={1000}
          speed="ease-in-out"
          showThumbs={false}
          showIndicators={false}
          selectedItem={currentSlide}
          onChange={setCurrentSlide}
          className="our-mission-carousel flex justify-center align-center"
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
