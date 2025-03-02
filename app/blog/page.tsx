// BlogPage.tsx
'use client'
import React, { useState } from 'react';
import BlogCard from '@/components/blogCard';
import BlogModal from '@/components/blogsModal';

// Define the structure of the blog data
interface Blog {
  id: number;
  title: string;
  writer: string;
  image: string;
  content: React.FunctionComponent;  // Content is a React component that will render the blog content
}

// Example blog data
const blogData: Blog[] = [
  {
    id: 1,
    title: "IMPORTANCE OF PRESCHOOL EDUCATION",
    writer: "Rishabh Ranjan",
    image: "/Rishabh.jpeg", // Replace with actual image URL
    content: () => (
      <div className="text-black text-left">
        <p>Children are born ready to learn; they learn every second of their lives. Though we learn throughout our life but the first 6 years of child&apos;s life is very important for learning as brain development is on its peak during this period. In the first 6 years of life, more than one million neural connections are formed each second and 90% child&apos;s brain develops. The quality of a child&apos;s experiences during this period makes a critical difference as their brains develop, providing either strong or weak foundations for learning.
        </p>
        <p> The early years are the most important time to start building a strong foundation for your child as he strives to reach his developmental milestones. Though his learning begins at home and he learns basic skills of language, colors, eating, etc. from you and other family members but as he turn 2, now its time to send him to a good preschool because quality early childhood education can make a big difference.
        </p>
        <p>The preschool plays a magic role in the development of child&apos;s skills. Your Child have first time come out of the entirely protected home environment to an open environment of preschool and transit from being entirely dependent on you, to being independent. He is very much fascinated by the outer environment or surroundings he gets to understand about his emotions and he will starts realising he is sad and when he is happy, what makes his angry and the things for what he is curious about and so on. This is the time when he starts asking &apos;who&apos;, &apos;what&apos;, &apos;where&apos;, &apos;how&apos;, and &apos;why&apos; all the time and looking for answer for his every small question. Preschool is an entirely new world where he will have structured and playful social environment and the place where he will find answers of most of his questions. He will form new connections with his peer group, teachers and caregivers. In his preschool he will gain basic Academic, Cognitive, Socio-Emotional, Language, Gross Motor & Fine Motors Skills, Pre-Math & Literacy Skills and prepare them for formal school education.
        </p>
        <p> I know you may not be aware of all these technical terms and how preschool of you child will help to develop these skills so, let me explain for you.</p>
      </div>
    ),
  },
  {
    id: 2,
    title: "COGNITIVE DEVELOPMENT",
    writer: "Rishabh Stark",
    image: "/Rishabh.jpeg", // Replace with actual image URL
    content: () => (
      <div className="text-black">
        <p>Cognitive skills are the core skills our brain uses to think, read, learn, remember, reason, and pay attention. Working together, they gain information and move process it into knowledge we apply in our everyday life. 
        </p>
        <p>Cognitive skill refers to the ability of your child to think, explore and understand. Development of cognitive skill for your child is the development of knowledge, ability to solving problems, figuring out things himself and his capacity to understand the world around him. Cognitive skill development of your child will largely depend on his learning in the early years.
        </p>
        <p>
        Play is most important for your cognitive developmentof your child and in his preschool he will learn every thing by play-way method it will enhance his ability to think, understand, communicate, remember, imagine and work out what might happen next. At his preschool he will learn how things work, and he learn best through play by solving problems, creating, experimenting, thinking and learning all the time. At their preschool children spends time playing with their peer group, which is very good for their cognitive development because playing together they, builds relationship and sends a simple and very powerful message to each other that, you are important to me. This message is key to helping your child learn about who they are and where they fit in the world. It also gives your child confidence to keep exploring and learning about the world.

        </p>
        <p>
        At his preschool he will learn solving puzzles from simple to complex, start understanding the concepts like &apos;bigger&apos; and &apos;taller&apos;, he starts developing a sense of humor and delight in jokes and riddles, starts predicting what will happen next in a story (for example), he will start negotiating with his friends, he will develop some concept of time and so on.
        </p>
      </div>
    ),
  },
  {
    id: 3,
    title: "Building Strong Foundations",
    writer: "Jane Smith",
    image: "/example3.jpeg", // Replace with actual image URL
    content: () => (
      <div className="text-black">
        "Building a strong foundation during early years helps..."
        {/* Full content here */}
      </div>
    ),
  },
  {
    id: 4,
    title: "Preschool and Social Skills",
    writer: "Alice Johnson",
    image: "/example4.jpeg", // Replace with actual image URL
    content: () => (
      <div className="text-black">
        "Preschool plays a major role in shaping a child's social skills..."
        {/* Full content here */}
      </div>
    ),
  },
];

const BlogPage: React.FC = () => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  // Function to open the modal by setting the selected blog
  const openModal = (id: number) => {
    const blog = blogData.find((b) => b.id === id);
    if (blog) setSelectedBlog(blog);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedBlog(null);
  };

  // Split the blog data into two groups: first 3 blogs in column, rest in row
  const firstThreeBlogs = blogData.slice(0, 3);
  const remainingBlogs = blogData.slice(3);

  return (
    <div className="sm:px-8">
      <h1 className="text-3xl font-semibold items-center text-center mb-8">Our Blogs</h1>

      {/* Display first 3 blogs in a column */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {firstThreeBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            writer={blog.writer}
            image={blog.image}
            onClick={openModal}
          />
        ))}
      </div>

      {/* Display the rest of the blogs in a row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
        {remainingBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            writer={blog.writer}
            image={blog.image}
            onClick={openModal}
          />
        ))}
      </div>

      {/* Show modal if a blog is selected */}
      {selectedBlog && (
        <BlogModal
          title={selectedBlog.title}
          writer={selectedBlog.writer}
          image={selectedBlog.image}
          onClose={closeModal} // Close modal when clicking X
        >
          {/* Pass the content component as children */}
          <selectedBlog.content /> {/* This renders the content of the selected blog */}
        </BlogModal>
      )}
    </div>
  );
};

export default BlogPage;
