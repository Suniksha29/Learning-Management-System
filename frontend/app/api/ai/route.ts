import { NextRequest, NextResponse } from 'next/server';

// Use Hugging Face Router API with chat completions format
const HUGGINGFACE_API_URL = 'https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-Instruct-v0.1/chat/completions';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body || typeof body.prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request. Prompt is required.' },
        { status: 400 }
      );
    }

    const { prompt, conversationHistory = [] } = body;

    if (prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'Prompt cannot be empty' },
        { status: 400 }
      );
    }

    // Check for API key
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) {
      console.error('HUGGINGFACE_API_KEY is not configured');
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      );
    }

    // Format messages for chat completions API
    const messages = [
      {
        role: 'system',
        content: `You are a helpful, friendly AI tutor for a Learning Management System. You help students understand concepts, answer questions, and provide explanations in a clear, conversational way like ChatGPT.

Teaching style:
- Be conversational and friendly
- Explain clearly and simply for beginners
- Use examples and analogies when helpful
- Be encouraging and supportive
- Keep responses concise but informative (2-3 paragraphs max)
- If you don't know something, admit it honestly
- Focus on educational content
- Ask follow-up questions to check understanding`
      },
      ...conversationHistory.map((msg: Message) => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: prompt
      }
    ];

    console.log('Calling Hugging Face API...');
    console.log('API Key exists:', !!apiKey);

    // Prepare request payload for Mistral-7B using chat format
    const payload = {
      model: 'mistralai/Mistral-7B-Instruct-v0.1',
      messages: messages,
      max_tokens: 200,
      temperature: 0.7,
      top_p: 0.95,
      stream: false,
    };

    console.log('Payload model:', payload.model);

    // Call Hugging Face Inference API
    const response = await fetch(HUGGINGFACE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Handle model loading/cold start
      if (errorData.error && errorData.error.includes('loading')) {
        console.log('Model is loading, please retry...');
        return NextResponse.json(
          { 
            error: 'AI model is warming up. Please try again in a moment.',
            retry: true 
          },
          { status: 503 }
        );
      }

      console.error('Hugging Face API error:', errorData);
      return NextResponse.json(
        { 
          error: errorData.error || 'Failed to get AI response',
          details: response.statusText 
        },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log('AI response received');
    console.log('Result:', JSON.stringify(result, null, 2));

    // Extract the generated text from chat completions format
    let aiResponse = '';
    
    if (result.choices && result.choices.length > 0) {
      aiResponse = result.choices[0].message?.content || '';
    } else if (result.generated_text) {
      // Fallback to old format
      aiResponse = result.generated_text;
    } else {
      aiResponse = 'Sorry, I could not generate a response at this time.';
    }

    // Clean up the response
    aiResponse = aiResponse.trim();

    if (!aiResponse) {
      console.warn('Empty AI response received');
    }

    return NextResponse.json({
      reply: aiResponse,
      success: true,
    });

  } catch (error) {
    console.error('AI API Error:', error);
    
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to process AI request',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
