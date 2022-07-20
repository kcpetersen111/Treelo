import express, {Request, Response} from 'express';

import {User, Cards, Containers, Boards} from "../persist/model";

export const containerSetUp = function(app:any){


    //will need to get all containers from a board
    app.get("/container/:boardId", async (req:Request, res:Response)=>{
        const id = req.params.boardId;
        if(!req.user){
            res.status(401).json({message:"unauthed"});
            return;
        }
        let board:typeof Boards;
        try {
            board = await Boards.findById(id);
        } catch (error) {
            res.status(500).json(error);
            return;
        }
        if(board.ownerID != req.user.id){
            res.status(403).json({"message":"you are not authorized to view that board"});
            return;
        }
        res.status(201).json(board.cards);

    });
    //will need to get container by id
    app.get("/container/:containerId", async (req:Request, res:Response)=>{
        if (!req.user){
            res.status(401).json({message:"unauthed"});
            return;
        }
        const containerId = req.params.containerId;
        let container;
        try{
            container= await Containers.findOne({creatorId:req.user.id}).populate({
                path:"events"
            });
         } catch (err){
            res.status(500).json({
                message: `error when finding board`,
                error: err,
            });
            return;
         }

         if (!container){
            res.status(404).json({
                message: `not found`,
                container_id: containerId,
            })
            return;
         }
         res.status(200).json(container);
         return;
        
    })
    //will need to update container by id
    //will need to delete container by id
    // app.delete("/container/:id", async (req:Request, res:Response)=>{
    //     //fix later
    //     if (!req.user){
    //         res.status(404).json({ message: "unauthed"});
    //         return;
    //     }
    //     let container;
    //     try{
    //         container = await Containers.findById(req.params.id);
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
    //             container_id: req.params.container,
    //         });
    //         //console.log("cannot find it");
    //         return;
    //     }
    //     if( container.user_id)

    //will need to create container on a board id
    app.post("/board/:boardID/container",async (req:Request, res:Response)=>{
        const id = req.params.boardID;
        if(!req.user){
            res.status(401).json({message:"unauthed"});
            return;
        }
        let container = await Containers.create({
            "creatorID": req.user.id,
            "name": req.body.containerName,
            "description": req.body.description,
            "cards": [],
        });
        let board;
        try {
            board = await Boards.findByIdAndUpdate(
                id,
                {
                    $push:{
                        ID: container._id,
                    }
                });
            res.status(201).json(board);
        } catch (error) {
            res.status(500).json(error);
            return;
        }



    });

}
