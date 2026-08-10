'use client';
import React, { useState, useEffect } from 'react';
import { BookOpen, User, Calendar, Clock, Search, Filter, X, Heart, Share2, Bookmark, Eye } from 'lucide-react';

import { usePageContent } from '@/lib/content/client';

interface Blog {
  id: number;
  title: string;
  writer: string;
  image: string;
  body: string;
  category: string;
  readTime: string;
  publishDate: string;
  views: number;
  featured?: boolean;
  excerpt: string;
}

/** Renders an article body: "## " starts a subheading, "- " a bullet. */
const ArticleBody: React.FC<{ body: string }> = ({ body }) => {
  const blocks = (body ?? '').split('\n').map((l) => l.trim()).filter(Boolean);

  return (
    <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
      {blocks.map((block, i) => {
        if (block.startsWith('## ')) {
          return (
            <h2 key={i} className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {block.slice(3)}
            </h2>
          );
        }
        if (block.startsWith('- ')) {
          return (
            <li key={i} className="ml-6 list-disc mb-2 leading-relaxed">
              {block.slice(2)}
            </li>
          );
        }

        return (
          <p key={i} className="mb-6 leading-relaxed">
            {block}
          </p>
        );
      })}
    </div>
  );
};

const BlogPage: React.FC = () => {
  const { t, list } = usePageContent('journal');
  const categories = t('categories').split(',').map((c) => c.trim()).filter(Boolean);
  const blogData: Blog[] = list<Record<string, string>>('posts').map((p, i) => ({
    id: i,
    title: p.title ?? '',
    writer: p.writer ?? '',
    image: p.image ?? '',
    body: p.body ?? '',
    category: p.category ?? '',
    readTime: p.readTime ?? '',
    publishDate: p.publishDate ?? '',
    views: Number(p.views) || 0,
    featured: p.featured === 'yes',
    excerpt: p.excerpt ?? '',
  }));
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
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* ── Hero ── */}
      <div className="w-full bg-linear-to-r from-orange-600 to-amber-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15
            rounded-2xl mb-5 border border-white/20">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-100 mb-3">
            {t('hero.eyebrow')}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('hero.title')}</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="sr-only">Journal content</div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-orange-200 dark:border-orange-800
                bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2.5 rounded-xl whitespace-nowrap text-sm font-semibold
                  transition-all duration-200 border-2 ${
                  selectedCategory === category
                    ? 'bg-orange-600 border-orange-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-900 border-orange-100 dark:border-orange-900/40 text-gray-700 dark:text-gray-300 hover:border-orange-300 hover:bg-orange-50'
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
              <BookOpen className="w-6 h-6 text-orange-600 mr-2" />
              {t('featuredTitle')}
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {featuredBlogs.map((blog, index) => (
                <article
                  key={blog.id}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xs hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => openModal(blog.id)}
                >
                  {/* Hero Image */}
                  <div className={`${blog.image} h-56 relative`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-xs text-white rounded-full border border-white/30">
                        Featured
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(blog.id);
                        }}
                        className="p-2 bg-white/20 backdrop-blur-xs rounded-full hover:bg-white/30 transition-all"
                      >
                        <Heart className={`w-4 h-4 ${likedBlogs.includes(blog.id) ? 'text-red-500 fill-current' : 'text-white'}`} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(blog.id);
                        }}
                        className="p-2 bg-white/20 backdrop-blur-xs rounded-full hover:bg-white/30 transition-all"
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarkedBlogs.includes(blog.id) ? 'text-yellow-500 fill-current' : 'text-white'}`} />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 rounded-full font-medium">
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

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-linear-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mr-3">
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
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => openModal(blog.id)}
                >
                  <div className={`${blog.image} h-40 relative`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(blog.id);
                        }}
                        className="p-1.5 bg-white/20 backdrop-blur-xs rounded-full hover:bg-white/30 transition-all"
                      >
                        <Heart className={`w-4 h-4 ${likedBlogs.includes(blog.id) ? 'text-red-500 fill-current' : 'text-white'}`} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(blog.id);
                        }}
                        className="p-1.5 bg-white/20 backdrop-blur-xs rounded-full hover:bg-white/30 transition-all"
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

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {blog.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-linear-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mr-2">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className={`${selectedBlog.image} h-64 relative rounded-t-2xl`}>
                <div className="absolute inset-0 bg-black/50 rounded-t-2xl"></div>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-xs rounded-full hover:bg-white/30 transition-all"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 text-sm font-medium bg-white/20 backdrop-blur-xs rounded-full border border-white/30">
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
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-xs rounded-full flex items-center justify-center mr-3">
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

                <ArticleBody body={selectedBlog.body} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;