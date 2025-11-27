import SuggestMessagesStream from "@/components/SuggestMessagesStream";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="p-8">
      <Button className="">Go back</Button>
      <h1 className="text-2xl font-bold mb-4">Anonymous Message Suggestions</h1>
      <SuggestMessagesStream />
    </div>
  );
}
