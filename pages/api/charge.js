// pages/api/charge.js
import nc from 'next-connect';

const handler = nc()
    .post(async (req, res) => {
        const { amount } = req.body;

        try {
            // Replace this with your actual payment processing code
            const response = await processPayment(amount);

            if (response.success) {
                res.status(200).json({ message: 'Payment successful' });
            } else {
                res.status(400).json({ message: 'Payment not successful' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

export default handler;