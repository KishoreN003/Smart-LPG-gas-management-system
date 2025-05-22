require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Twilio credentials (store in .env for security)
const accountSid = process.env.TWILIO_SID || 'AC86cd46d4ffc09544d0630bff2cfd7ff2';
const authToken = process.env.TWILIO_AUTH || 'af138a59ec25e699d0f71c8c4ccd8d6f';
const client = twilio(accountSid, authToken);

const TWILIO_PHONE = process.env.TWILIO_PHONE || '+19472105095';
const USER_PHONE = process.env.USER_PHONE || '+919363591964';

// Route to handle SMS sending
app.post("/send-sms", async (req, res) => {
    console.log("📩 Incoming Request:", req.body);  

    // Ensure numerical values
    const gasUsed = Number(req.body.gasUsed);
    const gasRemaining = Number(req.body.gasRemaining);
    const estimatedDays = Number(req.body.estimatedDays);

    // Debugging: Log data types
    console.log("🛠️ Type Check:", { 
        gasUsed: typeof gasUsed, 
        gasRemaining: typeof gasRemaining, 
        estimatedDays: typeof estimatedDays 
    });

    // Condition check logging
    console.log(`🛠️ Checking Condition: estimatedDays (${estimatedDays}) <= 12`);

    if (estimatedDays <= 12) {  
        let message = `⚠️ Gas Alert! Days Left: ${estimatedDays}, Gas Used: ${gasUsed} kg, Gas Remaining: ${gasRemaining} kg.`;

        console.log("📢 Sending SMS:", message);  

        try {
            const msg = await client.messages.create({
                body: message,
                from: TWILIO_PHONE,
                to: USER_PHONE,
            });

            console.log("✅ SMS Sent:", msg.sid);  
            return res.json({ success: true, sid: msg.sid });
        } catch (error) {
            console.error("❌ Twilio Error:", error);
            return res.status(500).json({ success: false, error: error.message });
        }
    } else {
        console.log("❌ Condition NOT met, skipping SMS...");
    }

    res.json({ success: false, message: `No SMS sent, days left is ${estimatedDays}.` });
});

// Start the server
const PORT = process.env.PORT || 5020;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
