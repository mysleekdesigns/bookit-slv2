import dbConnect from '@/backend/config/dbConnect';
import { allRooms } from '@/backend/controllers/roomControllers';
import { authorizeRoles, isAuthenticatedUser } from '@/backend/middleware/auth';
import { createEdgeRouter } from 'next-connect';
import { NextRequest } from 'next/server';

interface RequestContext {};

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

// below is how you can protect the route using authenticated roles
//router.use(isAuthenticatedUser, authorizeRoles('admin')).get(allRooms);

router.get(allRooms);

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}