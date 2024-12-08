import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Add these to your .env file:
// GOOGLE_PRIVATE_KEY="your-private-key-from-json"
// GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service-account-email"
// GOOGLE_SHEET_ID="your-sheet-id"

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
];

export async function POST(req: Request) {
  try {
    const { source } = await req.json();

    const jwt = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      scopes: SCOPES,
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, jwt);
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow({
      timestamp: new Date().toISOString(),
      source: source,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Survey submission error:', error);
    return Response.json({ error: 'Failed to submit survey' }, { status: 500 });
  }
} 