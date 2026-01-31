import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectLanguage() {
  return (
    <Select defaultValue="english">
      <SelectTrigger className="text-white-text border-0 [&_svg]:stroke-white-text cursor-pointer">
        <SelectValue placeholder="Select lang" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="english">English</SelectItem>
        <SelectItem value="arabic">Arabic</SelectItem>
        <SelectItem value="french">French</SelectItem>
      </SelectContent>
    </Select>
  );
}
