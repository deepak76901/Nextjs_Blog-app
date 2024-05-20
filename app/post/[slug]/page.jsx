"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Spinner, Button } from "flowbite-react";

import CallToAction from "@/components/CallToAction";
import CommentSection from "@/components/CommentSection";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import Image from "next/image";

export default function PostPage() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  console.log(post)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${slug}`);
        const data = await res.json();

        if (!res.ok) {
          setError(false);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getPosts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, [slug]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="p-3 min-h-screen flex flex-col max-w-6xl  mx-auto">
      {post && (
        <div>
          <h1 className="text-3xl lg:text-4xl p-3 mt-4 font-medium text-center max-w-2xl mx-auto font-serif ">
            {post && post.title}
          </h1>
          <Link
            href={`/search?category=${post && post.category}`}
            className="self-center mt-5"
          >
            <Button color="gray" pill size="sm">
              {post && post.category}
            </Button>
          </Link>
          <Image
            src={post && post.image}
            alt={post && post.title}
            className="mt-10 p-3 max-h-[600px] w-full object-cover"
            width={700}
            height={500}
          />
          <div className="flex justify-between p-3 border-b border-slate-500 text-xs sm:text-base max-w-2xl mx-auto w-full">
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="italic">
              {post && (post.content.length / 1000).toFixed(0)} mins read.
            </span>
          </div>
          <div
            className="p-3 mx-auto max-w-2xl w-full post-content"
            dangerouslySetInnerHTML={{ __html: post && post.content }}
          ></div>
        </div>
      )}
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      {post && <CommentSection postId={post._id} />}
      <div className="flex flex-col justify-center items-center my-3">
        <h1 className="text-xl">Recent articles</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
