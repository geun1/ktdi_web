import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const now = new Date();

    const popups = await prisma.popup.findMany({
      where: {
        isActive: true,
        OR: [
          {
            startDate: null,
            endDate: null,
          },
          {
            startDate: { lte: now },
            endDate: null,
          },
          {
            startDate: null,
            endDate: { gte: now },
          },
          {
            startDate: { lte: now },
            endDate: { gte: now },
          },
        ],
      },
      orderBy: {
        order: 'asc',
      },
    });

    return NextResponse.json(popups);
  } catch (error) {
    console.error('Failed to fetch popups:', error);
    return NextResponse.json({ error: 'Failed to fetch popups' }, { status: 500 });
  }
}
