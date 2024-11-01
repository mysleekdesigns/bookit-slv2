import dbConnect from '@/backend/config/dbConnect';
import { deleteUser, getUserDetails, updateUser } from '@/backend/controllers/authControllers';
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

// this route is use on all 3 below it
router.use(isAuthenticatedUser, authorizeRoles("admin"));

router.get(getUserDetails);
router.put(updateUser);
router.delete(deleteUser);

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}

export async function PUT(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}

export async function DELETE(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}