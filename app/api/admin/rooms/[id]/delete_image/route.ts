import dbConnect from '@/backend/config/dbConnect';
import { deleteRoomImage } from '@/backend/controllers/roomControllers';
import { authorizeRoles, isAuthenticatedUser } from '@/backend/middleware/auth';
import { createEdgeRouter } from 'next-connect';
import { NextRequest } from 'next/server';

interface RequestContext {
    params: {
        id: string;
    }
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles('admin')).put(deleteRoomImage);
// router.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteRoom);

export async function PUT(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}

export async function DELETE(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}

