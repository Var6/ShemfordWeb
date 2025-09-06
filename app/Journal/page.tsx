'use client';
import React, { useState, useEffect } from 'react';
import { BookOpen, User, Calendar, Clock, Search, Filter, X, Heart, Share2, Bookmark, Eye } from 'lucide-react';

interface Blog {
  id: number;
  title: string;
  writer: string;
  image: string;
  content: React.FunctionComponent;
  category: string;
  readTime: string;
  publishDate: string;
  views: number;
  featured?: boolean;
  excerpt: string;
}

const blogData: Blog[] = [
  {
    id: 1,
    title: "IMPORTANCE OF PRESCHOOL EDUCATION",
    writer: "Rishabh Ranjan",
    image: "bg-gradient-to-br from-blue-500 to-indigo-600",
    category: "Education",
    readTime: "8 min read",
    publishDate: "March 15, 2025",
    views: 1250,
    featured: true,
    excerpt: "Children are born ready to learn; they learn every second of their lives. The first 6 years of a child's life is crucial for brain development...",
    content: () => (
      <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
        <p className="text-xl leading-relaxed mb-6">
          Children are born ready to learn; they learn every second of their lives. Though we learn throughout our life but the first 6 years of child's life is very important for learning as brain development is on its peak during this period.
        </p>
        
        <p className="mb-6">
          In the first 6 years of life, more than one million neural connections are formed each second and 90% child's brain develops. The quality of a child's experiences during this period makes a critical difference as their brains develop, providing either strong or weak foundations for learning.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">The Foundation Years</h2>
        <p className="mb-6">
          The early years are the most important time to start building a strong foundation for your child as he strives to reach his developmental milestones. Though his learning begins at home and he learns basic skills of language, colors, eating, etc. from you and other family members but as he turn 2, now its time to send him to a good preschool because quality early childhood education can make a big difference.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">The Magic of Preschool</h2>
        <p className="mb-6">
          The preschool plays a magic role in the development of child's skills. Your Child have first time come out of the entirely protected home environment to an open environment of preschool and transit from being entirely dependent on you, to being independent.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl my-8 border-l-4 border-blue-500">
          <p className="text-blue-800 dark:text-blue-200 font-medium">
            This is the time when he starts asking 'who', 'what', 'where', 'how', and 'why' all the time and looking for answer for his every small question.
          </p>
        </div>

        <p className="mb-6">
          Preschool is an entirely new world where he will have structured and playful social environment and the place where he will find answers of most of his questions. He will form new connections with his peer group, teachers and caregivers.
        </p>
      </div>
    ),
  },
  {
    id: 2,
    title: "COGNITIVE DEVELOPMENT IN EARLY YEARS",
    writer: "Rishabh Stark",
    image: "bg-gradient-to-br from-purple-500 to-pink-600",
    category: "Development",
    readTime: "6 min read",
    publishDate: "March 12, 2025",
    views: 980,
    featured: true,
    excerpt: "Cognitive skills are the core skills our brain uses to think, read, learn, remember, reason, and pay attention...",
    content: () => (
      <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
        <p className="text-xl leading-relaxed mb-6 bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent font-bold">
          Cognitive skills are the core skills our brain uses to think, read, learn, remember, reason, and pay attention. Working together, they gain information and move process it into knowledge we apply in our everyday life.
        </p>
        
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Understanding Cognitive Skills</h2>
        <p className="mb-6">
          Cognitive skill refers to the ability of your child to think, explore and understand. Development of cognitive skill for your child is the development of knowledge, ability to solving problems, figuring out things himself and his capacity to understand the world around him.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">The Power of Play</h2>
        <p className="mb-6">
          Play is most important for your cognitive development of your child and in his preschool he will learn every thing by play-way method it will enhance his ability to think, understand, communicate, remember, imagine and work out what might happen next.
        </p>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl my-8">
          <h3 className="text-xl font-semibold mb-4 text-purple-800 dark:text-purple-200">Key Cognitive Milestones</h3>
          <ul className="space-y-2 text-purple-700 dark:text-purple-300">
            <li>• Learning to solve puzzles from simple to complex</li>
            <li>• Understanding concepts like 'bigger' and 'taller'</li>
            <li>• Developing sense of humor and delight in jokes</li>
            <li>• Predicting what will happen next in stories</li>
            <li>• Learning to negotiate with friends</li>
            <li>• Developing concept of time</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "SOCIO-EMOTIONAL DEVELOPMENT",
    writer: "Meera Sinha",
    image: "bg-gradient-to-br from-green-500 to-teal-600",
    category: "Psychology",
    readTime: "10 min read",
    publishDate: "March 10, 2025",
    views: 1420,
    featured: false,
    excerpt: "Socio-emotional skills are one of the most important skills children develop as they grow. These skills prepare children for effective communication...",
    content: () => (
      <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
        <p className="text-xl leading-relaxed mb-6">
          Socio-emotional skills are one of the most important skills children develop as they grow. Developing social skills in your child will prepare him for effective communication and cooperation with others.
        </p>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Social Skills Development</h2>
        <p className="mb-6">
          Once your child reaches age three, he will be more likely to play with other children instead of playing with you. During this process, he will start realizing the fact that not everyone thinks exactly the way he does.
        </p>

        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl my-8">
          <h3 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-200">Emotional Skills Include:</h3>
          <ul className="space-y-3 text-green-700 dark:text-green-300">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              To identify and understand his own feelings and regulate his own behavior
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              To understand other's feelings
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              To develop empathy for others
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              To establish and maintain good relationships
            </li>
          </ul>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">The Role of Preschool</h2>
        <p className="mb-6">
          Preschool plays a very important role in the cultivation of social and emotional skills in a child. The socio-emotional skills they learn at this stage pave the way for them to understand friendship, develop routines, and interpret various situations.
        </p>
      </div>
    ),
  },
  {
    id: 4,
    title: "BUILDING SOCIAL SKILLS IN PRESCHOOL",
    writer: "Alice Johnson",
    image: "bg-gradient-to-br from-orange-500 to-red-600",
    category: "Social Skills",
    readTime: "5 min read",
    publishDate: "March 8, 2025",
    views: 750,
    featured: false,
    excerpt: "Preschool plays a major role in shaping a child's social skills. Learn how structured environments help children develop essential social competencies...",
    content: () => (
      <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
        <p className="text-xl leading-relaxed mb-6">
          Preschool plays a major role in shaping a child's social skills. In a structured yet nurturing environment, children learn to interact with peers, share resources, and develop empathy.
        </p>
        
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Key Social Milestones</h2>
        <p className="mb-6">
          Through guided activities and free play, children develop crucial social competencies that will serve them throughout their lives.
        </p>
      </div>
    ),
  },
];

const categories = ['All', 'Education', 'Development', 'Psychology', 'Social Skills'];

const BlogPage: React.FC = () => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedBlogs, setLikedBlogs] = useState<number[]>([]);
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState<number[]>([]);

  const toggleLike = (blogId: number) => {
    setLikedBlogs(prev => 
      prev.includes(blogId) 
        ? prev.filter(id => id !== blogId)
        : [...prev, blogId]
    );
  };

  const toggleBookmark = (blogId: number) => {
    setBookmarkedBlogs(prev => 
      prev.includes(blogId) 
        ? prev.filter(id => id !== blogId)
        : [...prev, blogId]
    );
  };

  const filteredBlogs = blogData.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.writer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredBlogs = filteredBlogs.filter(blog => blog.featured);
  const regularBlogs = filteredBlogs.filter(blog => !blog.featured);

  const openModal = (id: number) => {
    const blog = blogData.find((b) => b.id === id);
    if (blog) setSelectedBlog(blog);
  };

  const closeModal = () => {
    setSelectedBlog(null);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedBlog && e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedBlog]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Educational Insights
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Discover expert perspectives on early childhood development and education
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-3 rounded-xl whitespace-nowrap font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Articles */}
        {featuredBlogs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
              Featured Articles
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {featuredBlogs.map((blog, index) => (
                <article
                  key={blog.id}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => openModal(blog.id)}
                >
                  {/* Hero Image */}
                  <div className={`${blog.image} h-56 relative`}>
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-medium bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-full border border-white border-opacity-30">
                        Featured
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(blog.id);
                        }}
                        className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all"
                      >
                        <Heart className={`w-4 h-4 ${likedBlogs.includes(blog.id) ? 'text-red-500 fill-current' : 'text-white'}`} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(blog.id);
                        }}
                        className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all"
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarkedBlogs.includes(blog.id) ? 'text-yellow-500 fill-current' : 'text-white'}`} />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-medium">
                        {blog.category}
                      </span>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {blog.publishDate}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {blog.readTime}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{blog.writer}</p>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Eye className="w-4 h-4 mr-1" />
                            {blog.views} views
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Regular Articles */}
        {regularBlogs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Latest Articles
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {regularBlogs.map((blog, index) => (
                <article
                  key={blog.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => openModal(blog.id)}
                >
                  <div className={`${blog.image} h-40 relative`}>
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(blog.id);
                        }}
                        className="p-1.5 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all"
                      >
                        <Heart className={`w-4 h-4 ${likedBlogs.includes(blog.id) ? 'text-red-500 fill-current' : 'text-white'}`} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(blog.id);
                        }}
                        className="p-1.5 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all"
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarkedBlogs.includes(blog.id) ? 'text-yellow-500 fill-current' : 'text-white'}`} />
                      </button>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3 text-xs text-gray-600 dark:text-gray-400">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                        {blog.category}
                      </span>
                      <span>{blog.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {blog.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mr-2">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{blog.writer}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Eye className="w-3 h-3 mr-1" />
                        {blog.views}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No articles found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}

        {/* Blog Modal */}
        {selectedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className={`${selectedBlog.image} h-64 relative rounded-t-2xl`}>
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-t-2xl"></div>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 text-sm font-medium bg-white bg-opacity-20 backdrop-blur-sm rounded-full border border-white border-opacity-30">
                      {selectedBlog.category}
                    </span>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {selectedBlog.publishDate}
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {selectedBlog.readTime}
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold mb-2">{selectedBlog.title}</h1>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center mr-3">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{selectedBlog.writer}</p>
                      <div className="flex items-center text-sm opacity-90">
                        <Eye className="w-4 h-4 mr-1" />
                        {selectedBlog.views} views
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="flex items-center gap-4 mb-8">
                  <button
                    onClick={() => toggleLike(selectedBlog.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      likedBlogs.includes(selectedBlog.id)
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedBlogs.includes(selectedBlog.id) ? 'fill-current' : ''}`} />
                    Like
                  </button>
                  <button
                    onClick={() => toggleBookmark(selectedBlog.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      bookmarkedBlogs.includes(selectedBlog.id)
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarkedBlogs.includes(selectedBlog.id) ? 'fill-current' : ''}`} />
                    Save
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>

                <selectedBlog.content />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;