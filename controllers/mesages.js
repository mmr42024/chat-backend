
const Message = require('../models/message');


const getChat = async (req, res) => {

    const myId = req.uid;
    const messageFrom = req.params.from;

    const last30 = await Message.find({
        $or: [{from: myId, to: messageFrom}, {from: messageFrom, to: myId}]
    })
    .sort({createdAt: 'desc'}).limit(30);

    res.json({
        ok: true, 
        message: last30
    });

}

module.exports = {getChat}



