import { Redis } from '@upstash/redis';

// Initialize Upstash Redis client if credentials are present (supporting both standard Upstash and Vercel KV environment variables)
const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

let redis = null;
if (redisUrl && redisToken) {
  redis = new Redis({
    url: redisUrl,
    token: redisToken,
  });
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (!redis) {
    return res.status(500).json({ error: 'Upstash Redis environment variables not configured' });
  }

  try {
    if (req.method === 'GET') {
      const properties = await redis.get('unique_homes_properties');
      return res.status(200).json(properties || []);
    }

    if (req.method === 'POST') {
      const { properties } = req.body;
      if (!Array.isArray(properties)) {
        return res.status(400).json({ error: 'Invalid properties payload: must be an array' });
      }
      await redis.set('unique_homes_properties', properties);
      return res.status(200).json({ success: true, message: 'Properties updated successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Redis API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
