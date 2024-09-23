import DashBoardNav from "@/components/admin/DashBoardNav";
import TopImage from "@/components/admin/TopImage";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen flex">
      <DashBoardNav />

      <main className="overflow-y-scroll flex flex-col">
        <div className="h-[30vh] xl:h-[35vh]">
          <TopImage />
        </div>

        <div className="min-h-[60vh]">{children}</div>
      </main>
    </div>
  );
}
