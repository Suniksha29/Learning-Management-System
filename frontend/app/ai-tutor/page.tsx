'use client';

import React from 'react';
import AiChat from '@/components/AiChat';

export default function AiTutorPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🎓 AI Tutor Assistant
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get instant help with your studies! Ask questions about any topic you&apos;re learning, 
            and our AI tutor will provide clear, beginner-friendly explanations.
          </p>
        </div>
        
        <AiChat />
        
        <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl mb-2">📚</div>
            <h3 className="font-semibold text-gray-900 mb-1">Course Help</h3>
            <p className="text-sm text-gray-600">
              Get explanations for concepts from your enrolled courses
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl mb-2">💡</div>
            <h3 className="font-semibold text-gray-900 mb-1">Study Tips</h3>
            <p className="text-sm text-gray-600">
              Learn effective study strategies and techniques
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl mb-2">❓</div>
            <h3 className="font-semibold text-gray-900 mb-1">Q&A</h3>
            <p className="text-sm text-gray-600">
              Ask any question and get clear, simple answers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
