const router = require('express').Router();
const Message = require('../models/Message');

require('dotenv').config()

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = process.env.API_KEY;

const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

router.post('/messages', async (req, res) => {
    try {
        let { author, message } = req.body;

        if (!author || !message) {
            res.status(400).json({
                error: 'Missing author or message'
            });
            return;
        }

        const messages = await Message.find({});

        if (messages.length > 1 && messages[messages.length - 1].author === author) {
            res.status(400).json({
                error: 'Cannot send two messages in a row'
            });
            return;
        }

        messages.push({
            author,
            content: message
        });

        const newMessage = new Message({
            author,
            content: message
        });

        await newMessage.save();

        const result = await client.generateMessage({
            model: MODEL_NAME, // Required. The model to use to generate the result.
            temperature: 1, // Optional. Value `0.0` always uses the highest-probability result.
            candidateCount: author, // Optional. The number of candidate results to generate.
            prompt: {
                // Required. Alternating prompt/response messages.
                messages,
            },
        });

        messages.push(result[0].candidates[0]);

        const newResult = new Message({
            author: result[0].candidates[0].author,
            content: result[0].candidates[0].content
        });

        await newResult.save();

        res.status(200).json({
            messages
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

router.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find({});

        res.status(200).json({
            messages
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

router.delete('/messages', async (req, res) => {
    try {
        await Message.deleteMany({});

        res.status(200).json({
            message: 'Messages deleted'
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

module.exports = router;