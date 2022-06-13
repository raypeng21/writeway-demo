import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

var router = express.Router();


//update user
router.put("/:id", async(req, res) => {
    if (req.body.userId  === req.params.id  || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                return res.status(500).json(err);
            }

        }

        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set:req.body,
            });
            res.status(208).json("Account has been updated")  //error come from status.app(200)
        } catch(err){
            console.log(err)
            return res.status(500).json(err);  //????? Here is a  error, db can be updated but catch err
        }
    }else{
        return res.status(403).json("You can only update your own account")
    }
})



//update online status
router.put("/online/:id", async(req, res) => {

        try{
            const user = await User.findById(req.params.id);
            await user.updateOne({$set:{OnlineStatus: true}})    //change online status to true

            res.status(209).json("Status has been changed to online")  //error come from status.app(200)
        } catch(err){
            console.log(err)
            return res.status(500).json(err);  //????? Here is a  error, db can be updated but catch err
        }
    
})

//update offline status
router.put("/offline/:id", async(req, res) => {

        try{
            const user = await User.findById(req.params.id);
            await user.updateOne({$set:{OnlineStatus: false}})    //change online status to true

            res.status(209).json("Status has been changed to offline")  //error come from status.app(200)
        } catch(err){
            console.log(err)
            return res.status(500).json(err);  //????? Here is a  error, db can be updated but catch err
        }

})


//delete user
router.delete("/:id", async(req, res) => {
    if (req.body.userId  === req.params.id  || req.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(208).json("Account has been deleted successful") 
        } catch(err){
            console.log(err)
            return res.status(500).json(err);  
        }
    }else{
        return res.status(403).json("You can only delete your own account")
    }
})

//get a user 
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
      console.log(err)
    }
  });
  

//get friends
router.get("/friends/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
        user.following.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const { _id, username, profilePicture, OnlineStatus} = friend;
        friendList.push({ _id, username, profilePicture, OnlineStatus });
      });
      res.status(200).json(friendList)
    } catch (err) {
      res.status(500).json(err);
      console.log(err)
    }
  });


//follow a user

router.put("/:id/follow" , async (req, res) => {
    if(req.body.userId !== req.params.id){       //if the id is not the user himself
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(!user.followers.includes(req.body.userId)){      //if not follow
                await user.updateOne({$push:{followers: req.body.userId}})    //add target user's followers list
                await currentUser.updateOne({$push:{following: req.params.id}}) //add current user's following list
                res.status(200).json("User has been followed")
            }else {
                res.status(403).json("You already followed this user")
            }

        }catch(err){
            res.status(500).json(err) 
        }
    }else{                                       // if the id is the user himself
        res.status(403).json("You cannot follow your self.")
    }
})
//unfollow a user 
router.put("/:id/unfollow" , async (req, res) => {
    if(req.body.userId !== req.params.id){       //if the id is not the user himself
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(user.followers.includes(req.body.userId)){      //if this user exist in current user's following list
                await user.updateOne({$pull:{followers: req.body.userId}})  
                await currentUser.updateOne({$pull:{following: req.params.id}}) 
                res.status(200).json("User has been unfollowed")
            }else {
                res.status(403).json("You didn't follow this user")
            }

        }catch(err){
            res.status(500).json(err) 
        }
    }else{                                       // if the id is the user himself
        res.status(403).json("You cannot unfollow your self.")
    }
})


export default router;
