import express, {Request, Response} from 'express';

import {User, Events, Containers, Boards} from "../persist/model";

export const boardSetUp = function(app:any){
    //will need to get all boards that were created by a user 
    app.get("/board", async (req:Request, res:Response)=>{
        if (!req.user){
            res.status(401).json({message:"unauthed"});
            return;
        }
        let boards:[typeof Boards];
        try {
            boards = Boards.find({creatorId:req.user.id})
        } catch (error) {
            res.status(500).json({
                message:"Internal server error, could not create board",
                error:error,
            });
            return;
        }

        res.status(201).json(boards);
    });
    //will need to update board
    //will need to delete board

    //will need to create board
    app.post("/board", async (req:Request, res:Response)=>{
        if(!req.user){
            res.status(401).json({message:"unauthed"});
            return;
        }
        try {
            let board = await Boards.create({
                creatorID: req.user.id,
                boardName: req.body.boardName,
                description: req.body.description,
                container: [],
            });
            res.status(201).json(board);
        } catch (error) {
            res.status(500).json({
                message:"Internal server error, could not create board",
                error:error,
            });
        }
    });

};