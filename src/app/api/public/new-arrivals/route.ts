import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

function checkSupabaseAdmin() {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Supabase not configured. Please set environment variables.' },
      { status: 503 }
    )
  }
  return null
}

export async function GET() {
  const configError = checkSupabaseAdmin()
  if (configError) return configError

  try {
    const { data: products, error } = await supabaseAdmin!
      .from('new_arrivals')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      )
    }

    return NextResponse.json({ products: products || [] })
  } catch (error) {
    console.error('Fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}