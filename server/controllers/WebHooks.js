import { Webhook } from "svix";
import User from "../models/User.js";


//API to handle clerk webhooks
const clerkWebHooks = async (req,res) => {
    try{
        console.log('Webhook received:', req.body.type); // Add logging

        if (!process.env.CLERK_WEBHOOK_SECRET) {
            console.error('Webhook secret not configured');
            return res.status(500).json({ success: false, message: 'Webhook secret not configured' });
        }

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await whook.verify(JSON.stringify(req.body),{
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        console.log('Webhook verified successfully'); // Add logging

        const {data , type} = req.body
        
        switch(type){
            case 'user.created' : {
                console.log('Processing user.created for ID:', data.id); // Add logging

                const userData = {
                    _id : data.id,
                    email : data.email_addresses[0].email_address,
                    name : data.first_name + " " + data.last_name,
                    image : data.image_url,
                    resume : ''
                }

                await User.create(userData);
                console.log('User created in DB:', userData._id); // Add logging
                res.json({})
                break;
            }

            case 'user.updated' : {
                console.log('Processing user.updated for ID:', data.id); // Add logging

                const userData = {
                    email : data.email_addresses[0].email_address,
                    name : data.first_name + " " + data.last_name,
                    image : data.image_url,
                    
                }
                await User.findByIdAndUpdate(data.id , userData);
                console.log('User updated in DB:', data.id); // Add logging
                res.json({})
                break;
            }

            case 'user.deleted' : {
                console.log('Processing user.deleted for ID:', data.id); // Add logging

                await User.findByIdAndDelete(data.id)
                console.log('User deleted from DB:', data.id); // Add logging
                res.json({})
                break;
            }

            default:
                console.log('Unhandled webhook type:', type); // Add logging
                break;
        }

    }
    catch(error){
        console.error('Webhook error:', error.message);
        res.json({success : false , message : error.message})
    }
}

export { clerkWebHooks };

