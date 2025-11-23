import chambers from "@/data/chambers.json";
import PrescriptionForm from "./main";

export default async function Page({
  params,
}: {
  params: Promise<{ chamberId: string }>;
}) {
  const { chamberId } = await params;

  if (!chamberId || !chambers.find((item) => String(item.id) === chamberId)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">Chamber not found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">
        {chambers.find((item) => String(item.id) === chamberId)?.name}
      </h1>
      <p className="text-sm opacity-90">
        {chambers.find((item) => String(item.id) === chamberId)?.address}
      </p>
      <div className="w-1/5 border-2 border-t border-gray-300 my-6" />

      <PrescriptionForm />
    </div>
  );
}
