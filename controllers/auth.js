const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const {generateJWT} = require('../helpers/jwt');



const createUser = async (req, res = response) => {

        const {email, password} = req.body;

        try {
            emailExists =  await User.findOne({email});

            if(emailExists){
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya está registrado.'
                });
            }

            const user = new User(req.body);          

            //Encrypt password
           const salt = bcrypt.genSaltSync();
           user.password = bcrypt.hashSync(password, salt);
            
            await user.save();

            //Generate JWT

            const token = await generateJWT(user.id);

            res.json({
                ok: true,
                user,
                token,
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false, 
                msg: 'Estamos teniendo problemas. Por favor comunicate con las líneas de soporte.'
            });
        }       
    }
    //const logn ... req, res....
    // {ok: true, msg: 'login'}

const login = async (req, res = response) => {

    const {email, password} = req.body;

    try {
        userDB =  await User.findOne({email});

        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: 'El correo no está registrado.'
            });
        }

        const validatePassword = bcrypt.compareSync(password, userDB.password);

        if(!validatePassword){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es válida.'
            });
        }

        //Generate JWT
        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            user: userDB,
            token,
        });

    } catch (error) {
        console.log(error);
            res.status(500).json({
                ok: false, 
                msg: 'Estamos teniendo problemas. Por favor comunicate con las líneas de soporte.'
            });
    }
}


    const renewToken = async(req, res) => {

        //const uid del usuario
        const uid = req.uid;
        
        //generar nuevo JWT, generateJWT
        const token = await generateJWT(uid);

        // Obtener el usuario por el UID, Usuario.findByID....
        const user = await User.findById(uid);

        res.json({
            ok: true,
            user,
            token,
        });
    }

    module.exports = {createUser, login, renewToken}