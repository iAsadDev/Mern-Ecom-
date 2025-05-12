import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiUser, FiClock } from 'react-icons/fi';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`http://localhost:5000/api/blogposts/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setBlog(data);
        setImgSrc(`http://localhost:5000/uploads/${data.image}`);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
    else {
      setError('Invalid blog ID');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Blog</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  // Calculate reading time (approx 200 words per minute)
  const wordCount = blog.description.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link
          to="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition font-medium group"
        >
          <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Blogs
        </Link>
      </div>

      <article className="bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Hero Image Section */}
        <div className="relative h-96 sm:h-[500px] w-full overflow-hidden">
          <img
            src={imgSrc}
            alt={blog.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={() => setImgSrc('https://source.unsplash.com/random/1600x900/?blog,writing')}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 drop-shadow-lg">{blog.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
              <div className="flex items-center">
                <FiUser className="mr-2" />
                <span>{blog.author || 'Unknown Author'}</span>
              </div>
              <div className="flex items-center">
                <FiCalendar className="mr-2" />
                <span>
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <FiClock className="mr-2" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-10 lg:p-12">
          <div className="prose prose-lg max-w-none text-gray-700">
            {blog.description.split('\n').map((paragraph, i) => (
              <p key={i} className="mb-6 last:mb-0">{paragraph}</p>
            ))}
          </div>

          {/* Tags/Categories (if available) */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2">
              {blog.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* Related Posts or Call-to-Action */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold mb-6">Enjoyed this article?</h3>
        <Link
          to="/blog"
          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          Explore More Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogDetails;