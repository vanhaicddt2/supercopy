const User = require('../models/userModel');

const { getTodayFullFormat } = require('../units/supportDate');

const userCtrl = {
    saveCopy: async (req, res) => {
        try {
            const { name } = req.params;
            const dataOnBody = req.body;
            let existingUser;

            if ("picture1" in dataOnBody) {
                existingUser = await User.findOneAndUpdate({ name },{ picture1 : dataOnBody.picture1 });
            } else {
                existingUser = await User.findOneAndUpdate({ name },{
                    copy1: dataOnBody.copy1,
                    copy2: dataOnBody.copy2,
                    copy3: dataOnBody.copy3,
                    copy4: dataOnBody.copy4,
                    copy5: dataOnBody.copy5,
                    copy6: dataOnBody.copy6,
                    copy7: dataOnBody.copy7,
                });
            }         
            
            if (!existingUser) {
                return res.json({ status: 2, message: 'Username already exists' });
            }
            
            // 🔄 Emit real-time update to all connected clients
            if (global.io) {
                global.io.emit('content:updated', {
                    name: name,
                    type: 'content_saved',
                    message: `Content updated for ${name}`,
                    data: dataOnBody,
                    timestamp: new Date().toISOString(),
                });
                console.log('📡 [Socket.io] Emitted content:updated for:', name);
            }
            
            res.json({ status: 1, message: 'User saved successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },
    takeData: async (req, res) => {
        try {
            const { name } = req.params;

            const existingUser = await User.findOne({ name },);

            if (!existingUser) {
                return res.json({ status: 2, message: 'Username already exists' });
            }

            return res.json({ 
                status : 1,
                data: existingUser
            })
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },
}

module.exports = userCtrl;
