"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdArrowBack, MdAdd, MdThumbUp, MdComment, MdShare } from "react-icons/md";

interface Post {
  id: number;
  author: string;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
}

export default function CommunityPage() {
  const router = useRouter();
  const [showAddPost, setShowAddPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Rajesh Kumar",
      content: "Best route from Andheri to Bandra during evening hours? Need to avoid traffic.",
      likes: 12,
      comments: 5,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      author: "Amit Singh",
      content: "Found a great dhaba near NH48. Clean food and good parking space. Highly recommended!",
      likes: 24,
      comments: 8,
      timestamp: "4 hours ago",
    },
    {
      id: 3,
      author: "Vikram Patel",
      content: "Anyone else facing issue with Fastag recharge? Mine is not getting updated since morning.",
      likes: 8,
      comments: 3,
      timestamp: "6 hours ago",
    },
  ]);

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPostContent.trim()) {
      const newPost: Post = {
        id: Date.now(),
        author: localStorage.getItem("userName") || "You",
        content: newPostContent,
        likes: 0,
        comments: 0,
        timestamp: "Just now",
      };
      setPosts([newPost, ...posts]);
      setNewPostContent("");
      setShowAddPost(false);
    }
  };

  return (
    <div className="min-h-screen bg-light pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <MdArrowBack className="text-2xl" />
            </button>
            <h1 className="text-2xl font-bold">Community</h1>
          </div>
          <button
            onClick={() => setShowAddPost(!showAddPost)}
            className="bg-white text-blue-500 p-3 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            <MdAdd className="text-2xl" />
          </button>
        </div>
        <p className="mt-2 text-sm opacity-90">Connect with fellow drivers</p>
      </div>

      {/* Add Post Form */}
      {showAddPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-dark mb-4">Create Post</h2>
            <form onSubmit={handleAddPost} className="space-y-4">
              <div>
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Share something with the community..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none h-32 resize-none"
                  required
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddPost(false)}
                  className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Posts Feed */}
      <div className="px-6 mt-6">
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-5 rounded-xl shadow-md">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-dark">{post.author}</p>
                  <p className="text-xs text-gray-500">{post.timestamp}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{post.content}</p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
                  <MdThumbUp className="text-xl" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
                  <MdComment className="text-xl" />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
                  <MdShare className="text-xl" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 mt-6">
        <h2 className="text-lg font-bold text-dark mb-3">Popular Topics</h2>
        <div className="flex flex-wrap gap-2">
          {["Routes", "Traffic Updates", "Food Spots", "Fuel Prices", "Tips & Tricks", "Vehicle Care"].map(
            (topic) => (
              <button
                key={topic}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm hover:shadow-md hover:bg-primary hover:text-white transition-all"
              >
                {topic}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
