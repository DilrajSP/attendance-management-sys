"use client";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { updateStudentProfile } from "../actions/profile";

export default function StudentProfileForm({ student }: { student: any }) {
  const router = useRouter();

  async function handleClientAction(formData: FormData) {
    const result = await updateStudentProfile(formData);

    if (result?.error) {
      toast.error(result.error); // ✅ Shows red toast error
    } else {
      toast.success("Profile updated!");
      router.push("/student/dashboard"); // ✅ Redirects on success
      router.refresh();
    }
  }

  return (
    <form action={handleClientAction} className="space-y-6">
      <div className="space-y-2">
        <Label>Name</Label>
        <Input value={student.name ?? ""} disabled />
      </div>

      <div className="space-y-2">
        <Label>Student Code</Label>
        <Input value={student.studentCode ?? ""} disabled />
      </div>

      <div className="space-y-2">
        <Label>Course</Label>
        <Select name="course" defaultValue={student.course ?? undefined}>
          <SelectTrigger>
            <SelectValue placeholder="Select course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BCA">BCA</SelectItem>
            <SelectItem value="BCS">BCS</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Year</Label>
        <Select
          name="year"
          defaultValue={student.year ? String(student.year) : undefined}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Section</Label>
        <Select name="section" defaultValue={student.section ?? undefined}>
          <SelectTrigger>
            <SelectValue placeholder="Select section" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A">A</SelectItem>
            <SelectItem value="B">B</SelectItem>
            <SelectItem value="C">C</SelectItem>
            <SelectItem value="D">D</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">
        Save Profile
      </Button>
    </form>
  );
}
