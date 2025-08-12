import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddExpenseModal({ isOpen, onClose }: AddExpenseModalProps) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "Food",
  });

  const categories = ["Food", "Transport", "Entertainment", "Shopping", "Bills", "Health", "Education"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement expense creation
    console.log("Creating expense:", formData);
    onClose();
    setFormData({
      description: "",
      amount: "",
      category: "Food",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4 w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-800 dark:text-foreground">
            Add New Expense
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Description
            </Label>
            <Input
              id="description"
              type="text"
              placeholder="Enter expense description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              data-testid="input-expense-description"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                data-testid="input-expense-amount"
                required
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Category
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger data-testid="select-expense-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={onClose}
              data-testid="button-cancel-expense"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              data-testid="button-submit-expense"
            >
              Add Expense
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
