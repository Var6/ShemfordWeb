import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
 

  return (
    <footer className="bg-tansparent text-black dark:text-white pt-8 mt-10">
    <div className="overflow-hidden bg-none w-full h-full">
        <iframe
          className=""
          width={600}
          height={200}
          src="https://maps.google.com/maps?width=600&height=400&hl=en&q=SHEMFORD%20Futuristic%20School%20Patna&t=&z=13&ie=UTF8&iwloc=B&output=embed"
        ></iframe>
      </div>
    </footer>
  );
};

export default Footer;
