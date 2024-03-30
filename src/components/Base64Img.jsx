// components/Base64Image.js
import Image from 'next/image'



import React from 'react';

const Base64Image = ({ base64String }) => {
  // Decode the base64 string
  const decodedImage = `data:image/jpeg;base64,${base64String}`;


  return <Image src={decodedImage} alt="Base64 Image" width={150} height={150} className='rounded-full border-4 border-pink-500' style={{ objectFit: 'cover', aspectRatio: '1 / 1' }} />;

};

export default Base64Image;
