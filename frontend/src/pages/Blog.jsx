import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [state, setState] = useState({
    blogs: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogposts');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setState({
          blogs: data.reverse(),
          loading: false,
          error: null
        });
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    };

    fetchBlogs();
  }, []);

  const { blogs, loading, error } = state;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p>{error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Latest Blog Posts</h1>
        <p className="mt-2 text-gray-600">Discover our newest articles</p>
      </header>

      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No blog posts available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </main>
  );
};

const BlogCard = ({ blog }) => {
  const [imgSrc, setImgSrc] = useState(
    blog.image 
      ? `http://localhost:5000/uploads/${blog.image}`
      : 'https://via.placeholder.com/400x225?text=No+Image'
  );

  return (
    <Link
      to={`/blog/${blog._id}`}
      className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col"
    >
      <div className="h-48 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
        <img 
          src={imgSrc}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={() => setImgSrc('https://via.placeholder.com/400x225?text=Image+Not+Found')}
        />
      </div>
      <div className="p-5 flex-grow">
        <h2 className="text-xl font-bold mb-2 line-clamp-2 text-gray-800 group-hover:text-blue-600 transition-colors">
          {blog.title}
        </h2>
        <p className="text-gray-500 text-sm mb-3">By {blog.author || "Admin"}</p>
        <p className="text-gray-600 line-clamp-3">{blog.description}</p>
      </div>
    </Link>
  );
};

export default Blog;