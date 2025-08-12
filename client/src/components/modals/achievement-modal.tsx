import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

interface Achievement {
  type: string;
  title: string;
  description: string;
}

interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievement: Achievement;
}

export default function AchievementModal({ isOpen, onClose, achievement }: AchievementModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-accent to-warning rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="h-10 w-10 text-white" />
        </div>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800 dark:text-foreground mb-2">
            Achievement Unlocked!
          </DialogTitle>
        </DialogHeader>
        <p className="text-slate-600 dark:text-muted-foreground mb-4">
          {achievement.description}
        </p>
        <Button 
          onClick={onClose}
          className="btn-primary"
          data-testid="button-close-achievement"
        >
          Awesome!
        </Button>
      </DialogContent>
    </Dialog>
  );
}
