import { NextRequest, NextResponse } from 'next/server';
import {getContainerCupsFromUser, createContainerCup, updateContainerCup, deleteContainerCup} from '@/utils/supabase/db';
import ContainerCup from '@/types/containercup';

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get('userId') || '';

    try {
        const data = await getContainerCupsFromUser(userId);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch container cups' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const cup: ContainerCup = await req.json();

    try {
        const data = await createContainerCup(cup);
        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create container cup' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const { id, updates } = await req.json();

    try {
        const data = await updateContainerCup(id, updates);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update container cup' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const id = parseInt(req.nextUrl.searchParams.get('id') || '');

    try {
        const data = await deleteContainerCup(id);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete container cup' }, { status: 500 });
    }
}
