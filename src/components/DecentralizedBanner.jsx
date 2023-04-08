import React from 'react';
import { BiDownArrowAlt } from 'react-icons/bi';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const scrollToQuiz = () => {
  const quizElement = document.getElementById('decentralizedFundsQuiz');
  const offset = 50;

  if (quizElement) {
    const topPosition = quizElement.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: topPosition, behavior: 'smooth' });
  }
};

const DecentralizedBanner = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const images = [
    '/images/poor-kids.jpg',
    '/images/helping-woman.jpg',
    '/images/people-team.jpg'
  ];

  return (
    <div className="bg-gradient-to-r from-blue-500 via-blue-300 to-blue-200 p-8 md:p-16 rounded-lg mt-10">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-white mb-4">Decentralized Charity Projects</h2>
          <p className="text-lg text-white mb-8">
            Join our platform and create your own decentralized charity project using cryptocurrencies. Experience trust, transparency, and efficiency in
            fundraising like never before.
          </p>
          <button
            onClick={scrollToQuiz}
            className="bg-white hover:bg-gray-100 text-blue-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-flex items-center"
          >
            Check our quiz below
            <BiDownArrowAlt className="ml-2" />
          </button>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={6000}
            arrows={false}
            showDots={false}
          >
            {images.map((image, index) => (
              <img src={image} alt={`Charity ${index}`} className="w-full h-auto md:max-w-md mx-auto" />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default DecentralizedBanner;
