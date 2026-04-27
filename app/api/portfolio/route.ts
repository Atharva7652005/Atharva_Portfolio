import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Portfolio from '@/lib/models/Portfolio';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Fetch the first portfolio document (assuming single user portfolio)
    const portfolio = await Portfolio.findOne().lean();
    
    if (!portfolio) {
      // If no data exists yet, return empty or specific status
      return NextResponse.json({ message: 'No portfolio data found', data: null }, { status: 404 });
    }
    
    return NextResponse.json({ data: portfolio }, { status: 200 });
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    // Upsert the portfolio data (find the first one and update, or create if it doesn't exist)
    const portfolio = await Portfolio.findOneAndUpdate(
      {}, // Match any document
      { $set: body }, // Update with request body
      { new: true, upsert: true } // Return new document, create if not found
    );

    return NextResponse.json({ message: 'Portfolio data saved successfully', data: portfolio }, { status: 200 });
  } catch (error) {
    console.error('Error saving portfolio data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
