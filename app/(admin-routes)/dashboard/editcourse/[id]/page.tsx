import EditCourse from "@/components/Admin/EditCourse";

const page = ({ params }: { params: any }) => {
  return (
    <>
      <EditCourse course={params.id} />
    </>
  );
};
export default page;
