'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GraduationCap, BookOpen, Award, ArrowRight, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className={`relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Navigation */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LMS
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="px-6 py-2.5 text-gray-700 font-medium hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md mb-8 border border-gray-100">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">AI-Powered Learning Experience</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-tight">
              Learn Without
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                Limits
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Access world-class courses, learn at your own pace, and get AI-powered assistance 
              whenever you need it. Your journey to mastery starts here.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/auth/register"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Start Learning Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/ai-tutor"
                className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300 flex items-center space-x-2"
              >
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span>Try AI Tutor</span>
              </Link>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Comprehensive Courses</h3>
                <p className="text-gray-600">
                  Access curated content across multiple disciplines with structured learning paths
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">AI Tutor Assistance</h3>
                <p className="text-gray-600">
                  Get instant help from our AI-powered tutor available 24/7 for personalized support
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Track Progress</h3>
                <p className="text-gray-600">
                  Monitor your learning journey with detailed progress tracking and achievements
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Stats Section */}
        <div className="bg-white/60 backdrop-blur-sm border-y border-gray-100 py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">4+</div>
                <div className="text-gray-600">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">24+</div>
                <div className="text-gray-600">Sections</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">175+</div>
                <div className="text-gray-600">Videos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
                <div className="text-gray-600">AI Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-100 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-gray-900">Learning Management System</span>
              </div>
              <p className="text-gray-500 text-sm">
                © 2026 LMS. Empowering education through technology.
              </p>
              <div className="flex items-center space-x-6">
                <Link href="/ai-tutor" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">AI Tutor</span>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
