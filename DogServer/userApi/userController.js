const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/userSchema.js');
const Favorite = require('../models/favoriteSchema.js');
const favoriteSchema = require('../models/favoriteSchema.js');

exports.createUser = async (req, res) => {
    let user = req.body.name;
    try {
        const newPers = await User.create({ name: user });
        if (!newPers) {
            return res.status(400).json({
                status: "fail",
                message: "enter name for create"
            })
        }
        res.status(201).json({
            status: "success",
            data: newPers
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}
exports.getUsers = async (req, res) => {
    try {
        let finded = await User.find({}, {}, {})
        res.status(200).json({
            status: "success",
            data: finded
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}
exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id
        if (await User.Counter) {
            return res.status(404).json({
                status: "fail",
                message: "any user not found"
            })
        }
        const finded = await User.findOne({ _id: id });
        if (!finded) {
            return res.status(404).json({
                status: "fail",
                message: "user not found"
            })
        }
        res.status(200).json({
            status: "success",
            data: finded
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
exports.changeName = async (req, res) => {
    try {
        let id = req.params.id;
        let updated = await User.findByIdAndUpdate(
            id,
            {
                $set: { name: req.body.name }
            },
            { new: true }
        );
        if (!updated) {
            return res.status(400).json({
                status: "fail",
                message: "user not found"
            })
        }
        res.status(200).json({
            status: "success",
            data: updated
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}
exports.changeProfile = async (req, res) => {
    try {
        let id = req.params.id
        const favCount = await Favorite.countDocuments({ _id: req.body.profilePic, user: id, })
        if (!favCount) {
            return res.status(404).json({
                status: "fail",
                message: "this dog can't be profile picture, only your favorite"
            })
        }
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: { profilePic: req.body.profilePic } },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            status: "success",
            data: updatedUser
        })
        console.log(updatedUser);


    } catch (error) {

        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
exports.deleteUser = async (req, res) => {
    try {
        let id = req.params.id;
        let deleted = await User.deleteOne({ _id: id });
        if (!deleted.deletedCount) {
            return res.status(404).json({
                status: "fail",
                message: "user is not definde"
            })
        }
        let updated2 = await Favorite.deleteMany({ user: id });
        res.status(200).json({
            status: "success",
            data: updated2
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
exports.deleteProfile = async (req, res) => {
    try {
        let id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid ID format',
            });
        }
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "not defide"
            })
        }
        if (!user.modifiedCount) {
            return res.status(404).json({
                status: "fail",
                message: "you havn't a picture"
            })
        }
        const deleted = await User.updateOne({ id }, { $set: { profilePic: '' } });
        res.status(200).json({
            status: "success",
            data: deleted
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}
exports.createFavorite = async (req, res) => {
    try {
        const id = req.params.id;
        const image = req.body.imgSrc;
        const user = await User.findById({ _id: id });
        if (!user) {
            return res.status(400).json({
                status: "fail",
                message: "user not found"
            })
        }
        // const checkIFCreated = Favorite.findById({
        //     imgSrc: image,
        //     user: user._id
        // })
        // console.log("Dbg 200 : " + checkIFCreated);
        // if(checkIFCreated){
        //     return res.status(400).json({
        //         status: "fail",
        //         message: "you still "
        //     })
        // }
        const updated = await Favorite
            .create({
                imgSrc: image,
                user: user._id
            });

        res.status(201).json({
            status: "success",
            data: updated
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
exports.getFavorite = async (req, res) => {
    try {
        const userId = req.params.id;
        const query = req.query;
        let filter = { user: userId };
        if (query.name) {
            filter.name = { $regex: query.name };
        }
        let limited = query.limit ? parseInt(query.limit) : 20;
        let skiped = query.skip ? parseInt(query.skip) : 0;

        let favorites = await Favorite
            .find(filter)
            .limit(limited)
            .skip(skiped);
        if (!favorites) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            });
        }
        res.status(200).json({
            status: "success",
            data: favorites
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
exports.deleteFav = async (req, res) => {
    try {
        let userId = req.params.id;
        let favId = req.params.favId;

        // Attempt to delete the favorite document
        let deleted = await Favorite.deleteOne({ user: userId, _id: favId });

        // Check if any document was deleted
        if (!deleted.deletedCount) {
            return res.status(404).json({
                status: "fail",
                message: "Favorite not found or already deleted."
            });
        }

        // Send success response
        res.status(200).json({
            status: "success",
            message: "Favorite successfully deleted",
            data: deleted
        });
    } catch (error) {
        // Send error response
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.updateFavName = async (req, res) => {
    try {
        let favId = req.params.favId;
        let userId = req.params.id
        let newName = req.body.name;
        let updated = await Favorite.findByIdAndUpdate(
            { user: userId, _id: favId },
            { $set: { name: newName } },
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({
                status: "fail",
                message: "user not found"
            })
        }
        res.status(200).json({
            status: "success",
            data: updated
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
exports.deleteFavPic = async (req, res) => {
    try {
        let userId = req.params.id;
        let favId = req.params.favId;
        const deleted = await Favorite.deleteOne(
            { user: userId, _id: favId }
        )
        if (!deleted.deletedCount) {
            return res.status(404).json({
                status: "fail",
                message: "not defide"
            })
        }
        const user = await User.deleteOne(
            { _id: userId, profilePic: favId },
            { $unset: { profilePic: '' } })
        if (!user) console.log("not uset pic");

        res.status(200).json({
            status: "success",
            data: user
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }


}



