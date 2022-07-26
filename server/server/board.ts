import express, {Request, Response} from 'express';

import {User, Cards, Containers, Boards} from "../persist/model";
import mongoose from 'mongoose';

export const boardSetUp = function(app:any){
    
    //will need to get all boards that were created by a user 
    //broken
    app.get("/board", async (req:Request, res:Response)=>{
        if (!req.user){
            res.status(401).json({message:"unauthed"});
            return;
        }
        let boards:[typeof Boards];
        try {
            boards = await Boards.find({creatorID:{$all:req.user.id} }).populate({
                path:"container",
                populate:{
                    path:"events"
                } 
            });

        } catch (error) {
            res.status(500).json({
                message:"Internal server error, could not create board",
                error:error,
            });
            return;
        }

        res.status(200).json(boards);
    });
    //will need to update board
    app.patch("/board/:id",async(req:Request, res:Response)=>{
        const id = req.params.id;
        if(!req.user){
            res.status(401).json({message:"unauthed"});
            return;
        }
        let board;
        try {
            board = await Boards.findById(id);

        } catch (error) {
            res.status(500).json({message:"Error while looking for board"})
            return;
        }

        if(!board){
            res.status(404).json({message:"Board not found",
                                    id:id});
            return;
        }
        // console.log(req.user);
        // console.log(board.creatorID);
        if( board.creatorID.includes(req.user.id)){
            res.status(403).json({message:"You do not have access to change this board"});
            return;
        }
        let newBoard = {name:req.body.name,
                        description:req.body.description,
                        container:req.body.container};

        // console.log(newBoard);
        try {
            board = await Boards.findByIdAndUpdate(id,newBoard,{new:true});
            console.log(newBoard,board);
        } catch (error) {
            console.log(error);
            res.status(500).json({message:'An error occured while updating the database',
            error:error});
            return;
        }
        res.status(200).json(board);
    });

    //will need to delete board
    app.delete("/board/:id",async (req:Request, res:Response)=>{
        const id:string = req.params.id;
        if(!req.user){
            res.status(401).json({message:"unauthed"});
            return;
        }
        let board:typeof Boards;
        try {
            board = await Boards.findById(id);
            if(!board){
                res.status(404).json({
                    message: "board not found",
                    id: id
                });
                return;
            }
        } catch (error) {
            res.status(500).json({message:"Error in finding the board",
                                    error:error});
            return;
        }
        if(board.creatorID.includes(req.user.id)){
            res.status(403).json({message:"You are not allowed to delete that"});
            return;
        }

        try {
            board.remove();
            // console.log(`${req.user.username} deleted the board ${board.name}`);            
        } catch (error) {
            res.status(500).json({message:"Error in deleting the board",
                                    error:error});
            return;
        }
        
        res.status(200).json(board);
    });

    //will need to create board
    app.post("/board", async (req:Request, res:Response)=>{
        if(!req.user){
            res.status(401).json({message:"unauthed"});
            return;
        }
        try {
            let board = await Boards.create({
                creatorID: [req.user.id],
                name: req.body.name,
                description: req.body.description,
                container: [],
            });
            
            res.status(201).json(board);
            return;
        } catch (error) {
            res.status(500).json({
                message:"Internal server error, could not create board",
                error:error,
            });
            return;
        }
    });

    app.post("/board/:boardID/user/:userID",async (req:Request,res:Response) => {
        if(!req.user){
            res.status(401).json({message:"User is not logged in"});
            return;
        }
        //the user to be added
        const userID = req.params.userID;
        //the board to add the user to 
        const boardID = req.params.boardID;
        
        let board;
        try {
            
            board = await Boards.findById(boardID);
        } catch (error) {
            console.log(error)
            res.status(500).json(error);

            return;
        }

        if(!board){
            res.status(404).json({message:"Page not found"});
            return;
        }

        if(!board.creatorID.includes(req.user.id)){
            res.status(403).json({message:"you are not allowed to do that"});
            return;
        }
        let addedPerson;
        try {
            addedPerson = await User.findById(userID,"-password");
        } catch (error) {
            res.status(500).json(error);
            return;
        }

        if(!addedPerson){
            res.status(404).json({message:"User does not exist"});
            return;
        }

        try {

            board = await Boards.findByIdAndUpdate(boardID,{
                $push:{
                    creatorID: addedPerson._id,
                }
            },
            {new:true});
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
            return;
        }
        res.status(201).json(board);

    });

};
