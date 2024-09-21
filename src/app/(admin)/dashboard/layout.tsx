import DashBoardNav from "@/components/admin/DashBoardNav";
import TopImage from "@/components/admin/TopImage";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-[15%] h-full">
        <DashBoardNav />
      </div>
      <main className="w-65% h-full overflow-y-scroll">
        <div className="h-[30vh] xl:h-[35vh]">
          <TopImage />
        </div>

        <div className="min-h-[60vh]">{children}</div>
      </main>
    </div>
  );
}
