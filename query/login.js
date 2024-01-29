const httpStatus = require('http-status');
const { users } = require('../models');

const checkCredentials = async (user_email, user_password) => {
    try {
        const checkEmailInUser = await users.findOne({
            user_email,
            user_password
        }, {
            user_email: 1, user_type: 1
        });
        if (checkEmailInUser) {
            return Promise.resolve({
                status: true, statusCode: httpStatus.OK, data: checkEmailInUser,
            });

        }
        else {
            return Promise.resolve({
                status: false, statusCode: httpStatus.NOT_FOUND, message : "Please Register if not already done or check your creds"      
            });
        }

    } catch (error) {
        console.error(error);
        return Promise.resolve({
            status:false , message : "Internal Server Error"
        });
    }
};



const createNewUser = async (user_name , user_email, user_password , user_type) => {
    try {
        const checkEmailInUser = await users.findOne({
            user_email,
        }, {
            user_email: 1
        });
        if (checkEmailInUser) {
            return Promise.resolve({
                status: false, statusCode: httpStatus.CONFLICT, message : "User already Exists",
            });
        }
        else {
            
            await users.create({
                user_name,
                user_email,
                user_password,
                user_type
            })

            return Promise.resolve({
                status: true, statusCode: httpStatus.CREATED, message : "User Created Successfully"      
            });
        }

    } catch (error) {
        console.error(error);
        return Promise.resolve({
            status:false , message : "Internal Server Error"
        });
    }
};


module.exports = { checkCredentials , createNewUser };
