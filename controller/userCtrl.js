const User = require('../models/userModel');

const { getTodayFullFormat } = require('../units/supportDate');

const userCtrl = {
    saveCopy: async (req, res) => {
        try {
            const { name } = req.params;
            const dataOnBody = req.body;

            console.log("dataOnBody", dataOnBody);
            
            const existingUser = await User.findOneAndUpdate({ name },{
                copy1: dataOnBody.copy1,
                copy2: dataOnBody.copy2,
            });

            if (!existingUser) {
                return res.json({ status: 2, message: 'Username already exists' });
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

            const existingUser = await User.findOne({ name },{ copy1: 1, copy2: 1 });

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
