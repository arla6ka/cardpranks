import { NextResponse } from 'next/server';

const API_KEY = 'test_hw_d7137b5df0029b8602c2';
interface StationeryDesign {
  _id: string;
  name: string;
  preview_url: string;
}

interface StationeryDesignWithCategory extends StationeryDesign {
  category: 'christmas' | 'other';
}
const CHRISTMAS_DESIGNS = [
  'Happy Holidays',
  'Merry Christmas',
  'Xmas',
  'Eco Holidays',
  'Holiday Season',
  'Merry Christmas'
];

export async function GET() {
  try {
    const response = await fetch('https://api.handwrite.io/v1/stationery', {
      method: 'GET',
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as StationeryDesign[];
    
    const christmasDesigns = data.filter((design: StationeryDesign) => 
      CHRISTMAS_DESIGNS.includes(design.name)
    );
    const otherDesigns = data.filter((design: StationeryDesign) => 
      !CHRISTMAS_DESIGNS.includes(design.name)
    );

    const sortedChristmasDesigns = christmasDesigns.sort((a, b) => {
      return CHRISTMAS_DESIGNS.indexOf(a.name) - CHRISTMAS_DESIGNS.indexOf(b.name);
    });

    const markedChristmasDesigns: StationeryDesignWithCategory[] = sortedChristmasDesigns.map(design => ({
      ...design,
      category: 'christmas'
    }));
    const markedOtherDesigns: StationeryDesignWithCategory[] = otherDesigns.map(design => ({
      ...design,
      category: 'other'
    }));

    return NextResponse.json([...markedChristmasDesigns, ...markedOtherDesigns]);
  } catch (error) {
    console.error('Error fetching stationery:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}