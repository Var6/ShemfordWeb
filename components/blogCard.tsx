import Image from 'next/image';
import React from 'react'

interface BlogCardProps {
    id: number;
    title: string;
    writer: string;
    image: string;
    onClick: (id: number) => void; // onClick function to open the modal
}
const BlogCard: React.FC<BlogCardProps> = ({ id, title, writer, image, onClick }) => {
      
  return (
    <div
    className="flex justify-center cursor-pointer shadow-lg rounded-lg overflow-hidden items-start"
    onClick={() => onClick(id)}
  >
    <img src={`/assets/${image}`} width={500} height={500} alt={title} className="w-fit h-64 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">By - {writer}</p>
    </div>
  </div>
  )
}

export default BlogCard
