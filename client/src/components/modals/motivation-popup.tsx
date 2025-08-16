import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Star, Zap, Trophy, Heart, Loader2, Wifi, WifiOff, RefreshCw } from "lucide-react";

interface MotivationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: any;
}

interface Quote {
  text: string;
  author: string;
  category?: string;
}

export default function MotivationPopup({ isOpen, onClose, userData }: MotivationPopupProps) {
  const [quote, setQuote] = useState<Quote>({ text: "", author: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [icon, setIcon] = useState<React.ReactNode>(null);
  const [error, setError] = useState("");

  // Fallback motivational quotes for offline use
  const fallbackQuotes: Quote[] = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Your limitation—it's only your imagination.", author: "Unknown" },
    { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
    { text: "Great things never come from comfort zones.", author: "Unknown" },
    { text: "Dream it. Wish it. Do it.", author: "Unknown" },
    { text: "Success doesn't just find you. You have to go out and get it.", author: "Unknown" },
    { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" }
  ];

  // Multiple API endpoints for better reliability
  const quoteAPIs = [
    {
      name: "Quotable",
      url: "https://api.quotable.io/random?tags=motivational,inspirational,success",
      transform: (data: any) => ({
        text: data.content,
        author: data.author,
        category: data.tags?.[0]
      })
    },
    {
      name: "ZenQuotes",
      url: "https://zenquotes.io/api/random",
      transform: (data: any) => ({
        text: data[0]?.q || data[0]?.quote,
        author: data[0]?.a || data[0]?.author,
        category: "motivation"
      })
    },
    {
      name: "Quotes API",
      url: "https://api.api-ninjas.com/v1/quotes?category=motivational",
      headers: {
        'X-Api-Key': 'YOUR_API_KEY' // You would need to get a free API key from API Ninjas
      },
      transform: (data: any) => ({
        text: data[0]?.quote,
        author: data[0]?.author,
        category: data[0]?.category
      })
    },
    {
      name: "Quotegarden",
      url: "https://quote-garden.herokuapp.com/api/v3/quotes/random",
      transform: (data: any) => ({
        text: data.data?.quoteText,
        author: data.data?.quoteAuthor,
        category: data.data?.quoteGenre
      })
    }
  ];

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fetch quote from online APIs
  const fetchOnlineQuote = async (): Promise<Quote | null> => {
    for (const api of quoteAPIs) {
      try {
        const response = await fetch(api.url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(api.headers || {})
          },
        });

        if (!response.ok) continue;

        const data = await response.json();
        const transformedQuote = api.transform(data);

        if (transformedQuote.text && transformedQuote.author) {
          return transformedQuote;
        }
      } catch (error) {
        console.warn(`Failed to fetch from ${api.name}:`, error);
        continue;
      }
    }
    return null;
  };

  // Get random fallback quote
  const getFallbackQuote = (): Quote => {
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    return fallbackQuotes[randomIndex];
  };

  // Load motivational content
  const loadMotivationalContent = async () => {
    setIsLoading(true);
    setError("");

    let selectedQuote: Quote;

    if (isOnline) {
      try {
        const onlineQuote = await fetchOnlineQuote();
        if (onlineQuote) {
          selectedQuote = onlineQuote;
        } else {
          selectedQuote = getFallbackQuote();
          setError("Using offline quotes");
        }
      } catch (error) {
        selectedQuote = getFallbackQuote();
        setError("Connection failed, using offline quotes");
      }
    } else {
      selectedQuote = getFallbackQuote();
      setError("You're offline, using cached quotes");
    }

    setQuote(selectedQuote);
    setIsLoading(false);

    // Set appropriate icon based on quote content or category
    const quoteText = selectedQuote.text.toLowerCase();
    const category = selectedQuote.category?.toLowerCase() || "";

    if (quoteText.includes("success") || quoteText.includes("achieve") || category.includes("success")) {
      setIcon(<Trophy className="h-8 w-8 text-yellow-500" />);
    } else if (quoteText.includes("work") || quoteText.includes("effort") || category.includes("work")) {
      setIcon(<Zap className="h-8 w-8 text-orange-500" />);
    } else if (quoteText.includes("dream") || quoteText.includes("believe") || category.includes("inspiration")) {
      setIcon(<Star className="h-8 w-8 text-blue-500" />);
    } else {
      setIcon(<Heart className="h-8 w-8 text-pink-500" />);
    }
  };

  // Load content when popup opens
  useEffect(() => {
    if (isOpen) {
      loadMotivationalContent();
    }
  }, [isOpen, isOnline]);

  // Generate personalized message if user data is available
  const generatePersonalizedMessage = () => {
    if (!userData) return "";

    const messages = [
      `🎯 You've got this! Keep pushing toward your goals.`,
      `⚡ Your dedication is inspiring. Stay consistent!`,
      `🌟 Every small step counts. You're making progress!`,
      `🔥 Your hard work is paying off. Don't give up now!`,
      `💪 You're stronger than you think. Keep going!`
    ];

    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg mx-4 text-center border-none shadow-2xl overflow-hidden">
        {/* Animated gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-x" />
        
        {/* Content */}
        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              {isOnline ? (
                <Wifi className="h-4 w-4 text-green-500" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-500" />
              )}
              <span className="text-xs text-slate-500">
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={loadMotivationalContent}
                disabled={isLoading}
                className="h-8 w-8 p-0"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
              
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 h-8 w-8 flex items-center justify-center"
                data-testid="button-close-motivation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 px-3 py-2 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          {/* Icon */}
          <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg ring-4 ring-white/50 dark:ring-slate-700/50">
            {isLoading ? (
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            ) : (
              icon
            )}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-slate-800 dark:text-foreground mb-4">
            {isLoading ? "Loading Inspiration..." : "Daily Motivation"}
          </h3>

          {/* Personalized message */}
          {userData && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
              <p className="text-blue-800 dark:text-blue-200 text-sm font-medium">
                {generatePersonalizedMessage()}
              </p>
            </div>
          )}

          {/* Quote */}
          {!isLoading && quote.text && (
            <div className="mb-6">
              <blockquote className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed italic mb-3">
                "{quote.text}"
              </blockquote>
              {quote.author && (
                <cite className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  — {quote.author}
                </cite>
              )}
              {quote.category && (
                <div className="mt-2">
                  <span className="inline-block bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full text-xs">
                    {quote.category}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Loading state */}
          {isLoading && (
            <div className="mb-6">
              <div className="space-y-3">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4 mx-auto"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/2 mx-auto"></div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            <Button 
              variant="outline"
              onClick={loadMotivationalContent}
              disabled={isLoading}
              className="min-w-[100px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  New Quote
                </>
              )}
            </Button>
            
            <Button 
              onClick={onClose}
              className="btn-primary min-w-[120px]"
              data-testid="button-dismiss-motivation"
            >
              Keep Going! 💪
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-4 text-xs text-slate-400 dark:text-slate-500">
            {isOnline ? (
              "Powered by online motivation APIs"
            ) : (
              "Offline mode - Cached inspirational quotes"
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}