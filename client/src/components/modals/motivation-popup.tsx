import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Star, Zap, Trophy, Heart } from "lucide-react";
import { getRandomQuote, generateMotivationalMessage } from "@/lib/motivation";

interface MotivationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: any;
}

export default function MotivationPopup({ isOpen, onClose, userData }: MotivationPopupProps) {
  const [message, setMessage] = useState("");
  const [icon, setIcon] = useState<React.ReactNode>(null);

  useEffect(() => {
    if (isOpen) {
      // Generate appropriate message based on user data
      const motivationMessage = userData 
        ? generateMotivationalMessage(userData) 
        : getRandomQuote();
      
      setMessage(motivationMessage);
      
      // Set appropriate icon based on message content
      if (motivationMessage.includes("🎉") || motivationMessage.includes("Amazing")) {
        setIcon(<Trophy className="h-8 w-8 text-yellow-500" />);
      } else if (motivationMessage.includes("🔥") || motivationMessage.includes("streak")) {
        setIcon(<Zap className="h-8 w-8 text-orange-500" />);
      } else if (motivationMessage.includes("⚡") || motivationMessage.includes("productivity")) {
        setIcon(<Star className="h-8 w-8 text-blue-500" />);
      } else {
        setIcon(<Heart className="h-8 w-8 text-pink-500" />);
      }
    }
  }, [isOpen, userData]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4 text-center border-none shadow-2xl">
        {/* Custom backdrop with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-lg" />
        
        {/* Content */}
        <div className="relative z-10 p-6">
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
            data-testid="button-close-motivation"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Icon */}
          <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            {icon}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-800 dark:text-foreground mb-4">
            Stay Motivated!
          </h3>

          {/* Message */}
          <p className="text-slate-600 dark:text-muted-foreground mb-6 leading-relaxed">
            {message}
          </p>

          {/* Action Button */}
          <Button 
            onClick={onClose}
            className="btn-primary min-w-[120px]"
            data-testid="button-dismiss-motivation"
          >
            Keep Going!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}