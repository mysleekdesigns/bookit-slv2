import { NextRequest, NextResponse } from "next/server";
import Room, { IImage, IReview, IRoom } from "../models/room";
import ErrorHandler from "../utils/errorHandler";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import APIFilters from "../utils/apiFilters";
import Booking from "../models/booking";
import { delete_file, upload_file } from "../utils/cloudinary";

// Get all rooms => /api/rooms
export const allRooms = catchAsyncErrors(async (req: NextRequest) => {
  const resPerPage: number = 4;

  const { searchParams } = new URL(req.url);

  const queryStr: any = {};
  searchParams.forEach((value, key) => {
    queryStr[key] = value;
  });

  const apiFilters = new APIFilters(Room, queryStr).search().filter();

  // TODO this caused an Hello error when a user logged in so it was commented out
  //throw new ErrorHandler('Hello ', 400);

  let rooms: IRoom[] = await apiFilters.query;
  const filteredRoomsCount: number = rooms.length;

  apiFilters.pagination(resPerPage);
  rooms = await apiFilters.query.clone();

  return NextResponse.json({
    success: true,
    filteredRoomsCount,
    resPerPage,
    rooms,
  });
});

// Create new room => /api/admin/rooms
export const newRoom = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  body.user = req.user._id;

  const room = await Room.create(body);

  return NextResponse.json({
    success: true,
    room,
  });
});

// Get room details => /api/admin/rooms/:id
export const getRoomDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id).populate("reviews.user");

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

// Update room details => /api/admin/rooms/:id
export const updateRoomDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    let room = await Room.findById(params.id);
    const body = await req.json();

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    room = await Room.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

// Update room images => /api/admin/rooms/:id/upload_images
export const uploadRoomImages = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);
    const body = await req.json();

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    const uploader = async (image: string) =>
      upload_file(image, "bookit/rooms");

    const urls = await Promise.all((body?.images).map(uploader));

    room?.images?.push(...urls);

    await room.save();

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

// Delete room images => /api/admin/rooms/:id/delete_image
export const deleteRoomImage = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);
    const body = await req.json();

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    const isDeleted = await delete_file(body?.imgId);

    if(isDeleted) {
      room.images = room?.images.filter(
        (img: IImage) => img.public_id !== body.imgId
      )
    }

    await room.save();

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

// Delete room details => /api/admin/rooms/:id
export const deleteRoom = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);


    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    // Delete images associated with the room
    for(let i=0; i < room?.images?.length; i++) {
      await delete_file(room?.images[i].public_id);
    }

    await room.deleteOne();

    return NextResponse.json({
      success: true,
    });
  }
);

// Create/Update room review => /api/reviews
export const createRoomReview = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();
  const { rating, comment, roomId } = body;

  const review = {
    user: req.user._id,
    rating: Number(rating),
    comment,
  };

  const room = await Room.findById(roomId);

  const isReviewed = room?.reviews?.find(
    (r: IReview) =>
      r.user?.toString() === (req.user as { _id: string })._id.toString()
  );

  if (isReviewed) {
    room?.reviews?.forEach((review: IReview) => {
      if (
        review.user?.toString() === (req.user as { _id: string })._id.toString()
      ) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    room.reviews.push(review);
    room.numOfReviews = room.reviews.length;
  }

  room.ratings =
    room?.reviews?.reduce(
      (acc: number, item: { rating: number }) => item.rating + acc,
      0
    ) / room?.reviews?.length;

  await room.save();

  return NextResponse.json({
    success: true,
  });
});

// Can guest review room => /api/reviews/can_review
export const canReview = catchAsyncErrors(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");

  const bookings = await Booking.find({ user: req.user._id, room: roomId });

  const canReview = bookings?.length > 0 ? true : false;

  return NextResponse.json({
    canReview,
  });
});

// Get all rooms Admin => /api/admin/rooms
export const allAdminRooms = catchAsyncErrors(async (req: NextRequest) => {
  const rooms = await Room.find();

  return NextResponse.json({
    rooms,
  });
});
