import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

import { authOptions } from '@/app/auth'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  return NextResponse.json({
    isAdmin: process.env.ADMIN_USER,
    user: session?.user,
  })
}
