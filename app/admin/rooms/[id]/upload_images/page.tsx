import Home from "@/components/Home";
import Error from "@/app/error";
import AllRooms from "@/components/admin/AllRooms";
import { getAuthHeader } from "@/helpers/authHeader";
import UpdateRoom from "@/components/admin/UpdateRoom";
import UploadRoomImages from "@/components/admin/UploadRoomImages";

export const metadata = {
  title: "Upload Room Images - ADMIN",
};

const getRoom = async (id: string) => {
  const authHeaders = getAuthHeader();

  const res = await fetch(`${process.env.API_URL}/api/rooms/${id}`, {
    headers: authHeaders.headers,
  });
  return res.json();
};

export default async function AdminUploadImagesPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getRoom(params?.id);

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <UploadRoomImages data={data} />;
}
