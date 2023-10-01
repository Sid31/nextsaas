import { supabase } from "../../../utils/supabase";

const handler = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    await supabase.auth.api.setAuthCookie(req, res);
  } catch (error) {
    console.error('Error setting auth cookie:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
