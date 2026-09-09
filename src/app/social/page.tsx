"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import SocialPostCard from "@/components/SocialPostCard";
import TrendingSidebar from "@/components/TrendingSidebar";
import { socialPosts as initialPosts, trendingTopics, SocialPost } from "@/data/social";
import { PenSquare } from "lucide-react";

export default function SocialPage() {
  const [posts, setPosts] = useState<SocialPost[]>(initialPosts);
  const [newPostContent, setNewPostContent] = useState("");

  const handlePost = () => {
    if (!newPostContent.trim()) return;
    const post: SocialPost = {
      id: String(Date.now()),
      user: { name: "John Doe", avatar: "JD" },
      content: newPostContent.trim(),
      likes: 0,
      comments: 0,
      timestamp: "Just now",
      liked: false,
    };
    setPosts([post, ...posts]);
    setNewPostContent("");
  };

  const rightPanel = (
    <div className="space-y-6">
      <TrendingSidebar topics={trendingTopics} />
    </div>
  );

  return (
    <AppLayout rightPanel={rightPanel}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Social
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Follow conversations and share your predictions
            </p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
            <PenSquare className="w-4 h-4" />
            New Post
          </button>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                JD
              </span>
            </div>
            <div className="flex-1">
              <textarea
                placeholder="Share your prediction or insight..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handlePost}
                  disabled={!newPostContent.trim()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <SocialPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
