import React from 'react'
import Footer from './Footer';
import InfoBoxes from './InfoBoxes';

const About = () => {

  const images = [
    '/images/people_help.jpg',
    '/images/crypto_charity.jpg'
  ];

  return (
    <>
      <div className="bg-gray-100 min-h-screen p-5 mt-4">
        <div className="container mx-auto py-16">
          <h1 className="text-5xl font-bold text-center mb-10">Meet <span className="text-green-600">TrustFund:</span> Charity of the Future</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <img src={images[0]} alt="Volunteers working" className="rounded-lg shadow-lg" />
              <h2 className="text-2xl font-semibold mt-4">Our Daily Work</h2>
              <p className="text-gray-600 mt-4">
                We are a decentralized charity organization working tirelessly to provide support and assistance to those in need.
                Our dedicated team of volunteers works closely with communities to implement a variety of charitable projects,
                ranging from disaster relief to educational initiatives.
              </p>
            </div>

            <div>
              <img src={images[1]} alt="People receiving help" className="rounded-lg shadow-lg" />
              <h2 className="text-2xl font-semibold mt-4">Impactful Actions</h2>
              <p className="text-gray-600 mt-4">
                Our mission is to ensure that every contribution made through our platform has a meaningful and lasting impact.
                We carefully evaluate each project and strive to maximize the benefits to those in need,
                ensuring that our donors can see the tangible results of their generosity.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">Our Story & Vision</h2>
            <p className="text-gray-600">
              TrustFund was founded with a vision to revolutionize the world of charitable giving by leveraging the power of blockchain technology.
              Our goal is to create a transparent and efficient platform that connects donors directly with those in need,
              eliminating intermediaries and reducing overhead costs.
            </p>
            <p className="text-gray-600 mt-4">
              We believe that decentralized funds have a crucial role to play in the future of web 3.0.
              As the world becomes increasingly interconnected and digital, it is essential for organizations
              like ours to embrace cutting-edge technology in order to facilitate greater transparency, trust,
              and accountability in the charitable sector.
            </p>
            <p className="text-gray-600 mt-4">
              By harnessing the potential of Ethereum and other blockchain technologies, we aim to create a new paradigm
              for charitable giving – one in which donors and recipients are connected directly, and every contribution
              makes a tangible difference in the lives of those in need.
            </p>
          </div>
        </div>
        <InfoBoxes />
      </div>
    </>
  )
}

export default About
