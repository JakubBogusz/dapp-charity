import React from 'react';
import { RiHandHeartFill, RiShieldUserLine, RiTeamLine } from 'react-icons/ri';

const BoxTemplate = ({ icon: Icon, title, description }) => (
  <div className="max-w-sm py-4 px-6 bg-white shadow-lg rounded-lg my-8 mx-2">
    <div className="flex flex-col items-center justify-center">
      <Icon className="w-8 h-8 text-gray-800 mb-2" />
      <h2 className="text-gray-800 text-2xl font-semibold">{title}</h2>
    </div>
    <div>
      <p className="mt-4 text-gray-600">{description}</p>
    </div>
  </div>
);

const InfoBoxes = () => {
  const boxesData = [
    {
      icon: RiHandHeartFill,
      title: 'Empower Communities',
      description:
        'Support verified projects and empower communities through decentralized funding.',
    },
    {
      icon: RiShieldUserLine,
      title: 'Trust & Transparency',
      description:
        'Ensure trust and transparency with our secure platform and carefully vetted projects.',
    },
    {
      icon: RiTeamLine,
      title: 'Professional Support',
      description:
        'Experience professionalism with our dedicated team guiding you through the process.',
    },
  ];

  return (
    <div className="flex flex-wrap justify-center md:justify-center">
      {boxesData.map((box, index) => (
        <BoxTemplate
          key={index}
          icon={box.icon}
          title={box.title}
          description={box.description}
        />
      ))}
    </div>
  );
};

export default InfoBoxes;
