"use client";

import { SocialPost } from "@/data/social";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";

interface SocialPostCardProps {
  post: SocialPost;
}

export default function SocialPostCard({ post }: SocialPostCardProps) {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {post.user.avatar}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {post.user.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {post.timestamp}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            {post.content}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 text-sm transition-colors ${
                liked
                  ? "text-red-500"
                  : "text-gray-500 dark:text-gray-400 hover:text-red-500"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${liked ? "fill-current" : ""}`}
              />
              {likes}
            </button>
            <button className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-4 h-4" />
              {post.comments}
            </button>
            <button className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
