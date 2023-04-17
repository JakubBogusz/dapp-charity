import React from 'react';

const Hero = () => {
  const scrollToProjectSection = () => {
    const offset = -40;
    const projectSection = document.getElementById('projectSection');
    if (projectSection) {
      const rect = projectSection.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetPosition = rect.top + scrollTop + offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative pt-32 pb-32 bg-cover bg-fixed bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(255, 255, 255, 0.5)',
        }}
      ></div>
      <div className="relative px-12 mx-auto max-w-7xl">
        <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
          <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
            <span>Build a brighter future together</span>{' '}
            <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-700 to-purple-700 lg:inline">
              with TrustFund
            </span>{' '}
          </h1>
          <p className="px-0 mb-8 text-lg text-gray-800 md:text-xl lg:px-24 font-medium">
            As a Web3 charity, we drive decentralized impact through various projects, addressing needs with our dedicated volunteer team.
          </p>
          <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
            <a
              href="#projectSection"
              onClick={(e) => {
                e.preventDefault();
                scrollToProjectSection();
              }}
              className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-600 rounded-2xl sm:w-auto sm:mb-0"
            >
              Get Started
              <svg
                className="w-4 h-4 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-gray-100 rounded-2xl sm:w-auto sm:mb-0"
            >
              Learn More
              <svg
                className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z">
                </path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero;
