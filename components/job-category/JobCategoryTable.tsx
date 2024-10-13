"use client";

import { Category } from "@prisma/client";
import { useState } from "react";
import {
  deleteJobCategory,
  updateJobCategory,
} from "@/app/actions/JobCategoryActions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function JobCategoryTable({
  categories,
}: {
  categories: Category[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editName, setEditName] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setEditName(category.name);
    setIsOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingCategory) return;

    const formData = new FormData();
    formData.append("id", editingCategory.id);
    formData.append("name", editName);

    const result = await updateJobCategory(formData);
    if (result.success) {
      setIsOpen(false);
      setEditingCategory(null);
      router.refresh();
      toast({
        title: "Job category updated successfully",
        description: "The job category has been updated successfully.",
        variant: "default",
      });
    } else {
      toast({
        title: "Failed to update job category",
        description: "The job category has not been updated.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    const formData = new FormData();
    formData.append("id", id);

    const result = await deleteJobCategory(formData);
    if (result.success) {
      router.refresh();
      toast({
        title: "Job category deleted successfully",
        description: "The job category has been deleted successfully.",
        variant: "default",
      });
    } else {
      toast({
        title: "Failed to delete job category",
        description: "The job category has not been deleted.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(category)}
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the job category &quot;{category.name}&quot; and
                        remove it from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(category.id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Edit the job category name here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleUpdate}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
