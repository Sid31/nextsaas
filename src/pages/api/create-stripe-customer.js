import initStripe from "stripe";
import { supabase } from "../../../utils/supabase";

const handler = async (req, res) => {
  
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the Authorization header
  
  if (!token || token !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send("You are not authorized to call this API");
  }

  try {
    const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
    
    const customer = await stripe.customers.create({
      email: req.body.record.email,
    });

    await supabase
      .from("profile")
      .update({
        stripe_customer: customer.id,
      })
      .eq("id", req.body.record.id);

    res.send({ message: `stripe customer created: ${customer.id}` });
  } catch(error) {
    console.error(error); // Keep this line to log errors to the console.
    res.status(500).send("Internal Server Error");
  }
};

export default handler;
