import express, {Request, Response} from 'express';

import {User, Cards, Containers, Boards} from "../persist/model";

export const cardSetUp = function(app:any){

    // the line below is a lie
    //will need to be able to get all cards
    //fundemently broken but kept as an example to look at
    // app.get("/cards", async (req:Request, res:Response)=>{
    //     // console.log(typeof req.user);
    //     if(!req.user){
    //         res.status(401).json({message:"unauthed"});
    //         return;
    //     }
    //     let list:Array<Object>;
    //     try {
    //         list = await Cards.find({ownerID: req.user.id}, "-password");
    //     } catch (error) {
    //         console.log("error in retiving all cards by a user ",error);
    //         res.status(500).json(error);
    //         return;
    //     }
    //     res.status(200).json(list);
    // });

    //will need to be able to get cards by id

    //will need to be able to update cards by id

    //will need to be able to delete cards by id
    // app.delete("/card/:id", async (req:Request, res:Response)=>{
    //     //fix this later
    //     if (!req.user){
    //         res.status(404).json({ message: "unauthed"});
    //         return;
    //     }
    //     let card;
    //     try{
    //         card = await Cards.findById(req.params.id);
    //     }catch (err){
    //         res.status(500).json({
    //             message: `failed to delete card`,
    //             error: err,
    //         });
    //         return;
    //     }
    //     if( card == null){
    //         res.status(404).json({
    //             message: `cannot find card`,
    //             card_id: req.params.card_id,
    //         });
    //         //console.log("cannot find it");
    //         return;
    //     }
    //     if( card.user_id)



    //needs to be reworked
    //will need to create an card
    app.post("/cards/:boardId/:containerId", async (req:Request, res:Response)=>{
        const boardID = req.params.boardId;
        const containerId = req.params.containerId;
        if(!req.user){
            res.status(401).json({message:"unauthed"});
            return;
        }


    });
    //will need to mark an card as complete by id


}