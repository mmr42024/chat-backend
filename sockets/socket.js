const {io} = require('../index');
const { checkJWT } = require('../helpers/jwt');
const {userOnline, userOffline, saveMesage} = require('../controllers/socket')


// Socket messages
io.on('connection', client => {

    console.log('Cliente conectado');
    const [isCheckJWT, uid] = checkJWT(client.handshake.headers['x-token']);
    //Verify authentication

    if(!isCheckJWT){return client.disconnect();}
    //Client autenticated.
    userOnline(uid);
    //Enter the user into a room
    // Global room, client.id, 
    client.join(uid);

    //Listening to the customer personal-message.
    client.on('personal-message', async (payload) => {
        //TODO Save message
        await saveMesage(payload);

        io.to(payload.to).emit('personal-message', payload);
    });

    


    client.on('disconnect', () => {
        userOffline(uid);
     });
});