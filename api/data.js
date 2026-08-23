export default async function handler(req, res) {
  // 1. Only allow GET method
  if (req.method !== 'GET') {
    return res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
  }

  // 2. Read the ticket query parameter from client request
  const { ticket } = req.query;
  if (!ticket) {
    return res.status(400).json({ status: 'error', message: 'กรุณาระบุหมายเลข Ticket' });
  }

  // 3. Read secret target URL strictly from Vercel Environment Variables
  const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;

  if (!APPS_SCRIPT_URL) {
    return res.status(500).json({
      status: 'error',
      message: 'Server Configuration Error: APPS_SCRIPT_URL environment variable is missing in Vercel.'
    });
  }

  try {
    // 4. Forward the request securely to Google Apps Script
    const googleResponse = await fetch(`${APPS_SCRIPT_URL}?ticket=${encodeURIComponent(ticket)}`);
    const data = await googleResponse.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch data from backend: ' + error.message
    });
  }
}