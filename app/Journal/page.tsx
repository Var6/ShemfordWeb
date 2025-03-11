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
      <div className="text-clip text-left bg-gradient-to-br from-orange-700 to-yellow-400 bg-clip-text text-transparent">
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
    title: "SOCIO-EMOTIONAL DEVELOPMENT",
    writer: "Meera Sinha ",
    image: "/ChairPerson.jpeg", // Replace with actual image URL
    content: () => (
      <div className="text-black text-left">
        <p className="text-lg text-gray-700 mb-4">
        Socio-emotional skills are one of the most important skills children develop as they grow. Developing social skills in your child will prepare him for effective communication and cooperation with others; he will respect feelings of others and at the same time he will be able to express his personal views. Social skills include initiating conversations, making friends, having good relationships with friends and neighbors, and actively participating in community work.
      </p>

      <p className="text-lg text-gray-700 mb-4">
        Once your child reaches age three, he will be more likely to play with other children instead of playing with you. During this process, he will start realizing the fact that not everyone thinks exactly the way he does, and different children in his peer group have different interests and qualities. During the process, he will start drifting towards some specific children and start making distance from others. This is the time when he will be less dependent on you and will develop his own sense of identity and start making social connections.
      </p>

      <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">Emotional Skills Development</h2>
      <p className="text-lg text-gray-700 mb-4">
        Children perceive and express emotions even before they understand them. Emotional skills of the child include the ability:
      </p>

      <ul className="list-inside list-disc space-y-2 text-lg text-gray-700 mb-4">
        <li>To identify and understand his own feelings and regulate his own behavior.</li>
        <li>To understand other&apos;s feelings.</li>
        <li>To develop empathy for others.</li>
        <li>To establish and maintain good relationships.</li>
      </ul>

      <p className="text-lg text-gray-700 mb-4">
        Preschool plays a very important role in the cultivation of social and emotional skills in a child. He will start to recognize his emotional expression like happiness or anger and begin to learn how to control them. He also starts understanding and respecting the feelings of others.
      </p>

      <p className="text-lg text-gray-700 mb-4">
        At his preschool, a child undergoes significant socio-emotional development. In the company of his classmates and teachers, he will start learning to recognize and communicate his emotions and at the same time, he will start understanding the emotions of others; during this process, he will start building skills to connect with family, peers, teachers, and the community.
      </p>

      <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">The Role of Preschool in Development</h2>
      <p className="text-lg text-gray-700 mb-4">
        The socio-emotional skills they learn at this stage pave the way for them to understand friendship, develop routines, and interpret various situations. They learn to share a toy, take turns with a classmate when playing, share their tiffin with their friends, and pay attention when the teacher reads a story.
      </p>

      <p className="text-lg text-gray-700 mb-4">
        However, the most common emotional milestone for the preschooler is the self-regulation of his own temperament. Children of this age have a tendency toward anxiety and many of them still throw tantrums, but they have a good understanding of their moods. Preschool helps them to better manage their anxiety and mood by creating the right environment and communicating essential information. Preschool children are more likely to understand the value of cooperation and they like to play with their friends rather than alone and form positive relationships with their classmates.
      </p>

      <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">Language Development</h2>
      <p className="text-lg text-gray-700 mb-4">
        The development of speech and language refers to the skills your child uses to understand and communicate with others. Language development helps him to communicate what he feels. Though language development continues throughout life, initially your child will pick up the language from you and other family members and he will learn most of the basics by age 6.
      </p>

      <p className="text-lg text-gray-700 mb-4">
        Once your child starts going to his preschool, his vocabulary will start developing fast. He will start understanding formal and informal words and will learn how to speak to his teachers, caregivers, and classmates.
      </p>

      <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">Gross Motor Skills</h2>
      <p className="text-lg text-gray-700 mb-4">
        Gross motor skills are the skills which involve large muscles of our legs, arms, and the rest of the body. The process that a child follows from learning to lift his head or leg as a baby and walk, run, and jump as a toddler to playing a sport in school is known as his gross motor development.
      </p>

      <p className="text-lg text-gray-700 mb-4">
        It is very important for children to develop skills such as muscle strength, balance, core strength, posture control, and coordination. Preschools help children develop gross motor skills by encouraging activities to run, jump, hop, throw, and catch, climb, pedal tricycles, push and pull, and more.
      </p>

      <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">Fine Motor Skills</h2>
      <p className="text-lg text-gray-700 mb-4">
        Fine motor skills involve small muscle movements, such as those required for eating, lacing shoes, coloring, writing, and other detailed tasks.
      </p>

      <ul className="list-inside list-disc space-y-2 text-lg text-gray-700 mb-4">
        <li>To hold a spoon or fork to eat.</li>
        <li>Button & un-button, Zip & un-zip.</li>
        <li>Scribbling with pencil or crayons.</li>
        <li>Sketching.</li>
        <li>Making objects using floor dough.</li>
        <li>Opening and closing containers.</li>
        <li>Paper folding and cutting.</li>
        <li>Using paint & brush, markers, and chalk.</li>
      </ul>

      <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">Preschool Nurtures Curiosity</h2>
      <p className="text-lg text-gray-700 mb-4">
        Curiosity is at the heart of creativity, and it&apos;s essential to nurture your child's curiosity at preschool. Teachers play an important role in this by observing, asking questions, and listening to their imaginations and ideas. Children are encouraged to ask questions and explore the world around them.
      </p>

      <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">Preparing for Formal School</h2>
      <p className="text-lg text-gray-700 mb-4">
        Preschool is the first stage of learning in a structured environment. It prepares children for their formal school education by expanding their vocabulary, teaching them social behavior, and introducing them to basic academics.
      </p>

      <p className="text-lg text-gray-700 mb-4">
        By the time they finish preschool, children become more confident, responsible, and disciplined. They start to take care of their school bags, tiffins, and other belongings, getting ready for their formal school education.
      </p>
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
      <div className="flex flex-wrap gap-4 w-fit justify-start">
  {[...firstThreeBlogs, ...remainingBlogs].map((blog) => (
    <div key={blog.id} className="w-fit">
      <BlogCard
        id={blog.id}
        title={blog.title}
        writer={blog.writer}
        image={blog.image}
        onClick={() => openModal(blog.id)} // Properly wrap the function call to avoid issues
      />
    </div>
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
