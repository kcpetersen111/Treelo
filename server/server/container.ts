import express, {Request, Response} from 'express';

import {User, Events, Containers, Boards} from "../persist/model";

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
        res.status(201).json(board.events);

    });
    //will need to get container by id
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
    //             message: `failed to delete event`,
    //             error: err,
    //         });
    //         return;
    //     }
    //     if( event == null){
    //         res.status(404).json({
    //             message: `cannot find event`,
    //             container_id: req.params.container,
    //         });
    //         //console.log("cannot find it");
    //         return;
    //     }
    //     if( container.user_id)

    //will need to create container on a board id
    app.post("/board/:boardID",async (req:Request, res:Response)=>{
        const id = req.params.boardID;
        if(!req.user){
            res.status(401).json({message:"unauthed"});
            return;
        }
        let board;
        try {
            board = await Boards.findByIdAndUpdate(
                id,
                {
                    $push:{
                        container:{
                            createorID: req.user.id,
                            containerName: req.body.containerName,
                            description: req.body.description,
                            events: [],
                        }
                    }
                });
            res.status(201).json(board);
        } catch (error) {
            res.status(500).json(error);
            return;
        }



    });

}