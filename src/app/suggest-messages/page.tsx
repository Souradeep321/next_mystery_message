import SuggestMessagesStream from "@/components/SuggestMessagesStream";

export default function Page() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Anonymous Message Suggestions</h1>
      <SuggestMessagesStream />
    </div>
  );
}
