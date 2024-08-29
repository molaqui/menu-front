// src/services/vonageMessageService.js

const API_URL = 'https://spring-menu-production.up.railway.app/api/send-message';

const sendMessage = async (message) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: message }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.text();
        return result;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

const sendTableNumber = async (tableNumber) => {
    const message = `Please go to table number: ${tableNumber}`;
    return sendMessage(message);
};

const vonageMessageService = {
    sendMessage,
    sendTableNumber,
};

export default vonageMessageService;