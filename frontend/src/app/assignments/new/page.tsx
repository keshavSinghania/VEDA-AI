import CreateAssignmentForm from "@/components/assignments/CreateAssignmentForm";
import Header from "@/components/assignments/Header";

export default function Page() {
  return (
    <div
      className="bg-[#E7E7E7] min-h-screen w-full"
      style={{
        paddingTop: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingBottom: "30px",
      }}
    >
      <Header />

      <div
        className="flex items-center justify-center"
        style={{
          marginTop: "18px",
        }}
      >
        <CreateAssignmentForm />
      </div>
    </div>
  );
}