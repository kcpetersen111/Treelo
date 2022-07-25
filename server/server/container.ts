import express, {Request, Response} from 'express';
import { idText } from 'typescript';

import {User, Cards, Containers, Boards} from "../persist/model";

export const containerSetUp = function(app:any){


    //will need to get all containers from a board
    app.get("/container/board/:boardId", async (req:Request, res:Response)=>{
        const id = req.params.boardId;
        if(!req.user){
            res.status(401).json({message:"unauthed"});
            return;
        }
        let board:typeof Boards;
        try {
            board = await Boards.findById(id);
            if (!board){
                res.status(404).json({
                message:`not found`,
            })
            return;
            }
            if(!board.creatorID.includes(req.user.id)){
                res.status(403).json({"message":"you are not authorized to view that board"});
                return;
            }
        } catch (error) {
            res.status(500).json(error);
            return;
        }
        res.status(201).json(board.container);

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
            container= await Containers.findById(containerId);
            if (!container){
                res.status(404).json({
                message: `not found`,
                container_id: containerId,
                })
            return;
            }

            if (container.creatorID != req.user.id){
                res.status(403).json({
                message: `not authorized to view board`,
            })
            return;
            }

        
         } catch (err){
            res.status(500).json({
                message: `error when finding container`,
                error: err,
            });
            return;
         }
         res.status(200).json(container);
         return;

    })
    //will need to update container by id
    app.put("/container/:containerId", async (req:Request, res: Response)=>{
        if (!req.user){
            res.status(401).json({message: `unauthed`});
            return;
        }
        const id = req.params.containerId;
        let container;
        try{
            container = await Containers.findById(id);
            if (!container){
                res.status(404).json({
                    message: `container not found`,
                    id: id,
                });
                return;
            }
            if (container.creatorID != req.user.id){
                res.status(403).json({
                    message: `not authorized to change this container`,
                });
                return;
            }
        }catch(err){
            res.status(500).json({
                message: `failed to put`,
                error: err,
            });
            return;
        }
        let newContainer = {
            name: req.body.name,
            description:req.body.description,
            cards: req.body.cards};
        
        try{
            container = await Containers.findByIdAndUpdate(id,newContainer,
                {
                   new: true,
                },
            );
        } catch (err){
            console.log(err);
            res.status(500).json({
                message: `ERROR`,
                error: err,
            });
            return;
        }
        console.log(container);
        res.status(201).json(container);    
    });
    //will need to delete container by id
    app.delete("/board/:boardId/container/:containerId", async (req:Request, res:Response)=>{
        if (!req.user){
            res.status(401).json({ message: "unauthed"});
            return;
        }
        let board;
        let container;

        try{
            board = await Boards.findOne({
                _id : req.params.boardId,
            });
            if (!board){
                res.status(404).json({
                    message: `couldnt find it`,
                });
                return;
                }
            let isSameUser: Boolean = false;
            try{
                await board.populated("container");
            }
            catch{
                console.log("something happend")
                return;
            }
            //console.log(board.populate("container"));
            for (let k in board.container){
                if (board.container[k]._id == req.params.containerId){
                    try{
                        container = await Containers.findById(board.container[k]);
                    }catch(err){
                        res.status(500).json({message: 'no container', error: err})
                    }
                    }
                    else{
                        continue;
                    }
                    console.log(container);
                    //console.log(board.container[k].creatorID);
                    //console.log(board.container[k]._id);
                    //console.log(board.container[k]);
                    if (container.creatorID == req.user.id){
                        isSameUser = true;
                    }
                }
            //console.log("board.container[k] ", container.creatorID, " userID: ", req.user.id);
            if(!isSameUser){
                res.status(403).json({
                    message: `not authorized to delete container`,
                })
                return;
            }
        }catch(err){
            console.log(err);
            res.status(500).json({message: `err`, error: err})
        }
        try{
            await Boards.findByIdAndUpdate(req.params.boardId,{
                $pull: {
                    container: req.params.containerId, 
                },
            });
        }catch (err){
            res.status(500).json({
                message: `failed to delete container`,
                error: err,
            });
            return;
        }
        try{
            await Containers.findByIdAndDelete(req.params.containerId);
        }catch(err){
            res.status(500).json({
                message: `failed to delete`,
                error: err,
            });
            return;
        }
        res.status(201).json(container);
    });

    //will need to create container on a board id
    app.post("/board/:boardID/container",async (req:Request, res:Response)=>{
        const id = req.params.boardID;
        if(!req.user){
            res.status(401).json({message:"unauthed"});
            return;
        }
        let container;
        try{
            container = await Containers.create({
                "creatorID": req.user.id,
                "name": req.body.containerName,
                "description": req.body.description,
                "cards": [],
            });
        }catch(err){
            res.status(500).json({
                message: "Failed to enter in all the fields"
            });
            return;
        }
        let board;
        // rn we are not checking if the board exists or should be changed

        try {
            board = await Boards.findById(id);
        } catch (error) {
            res.status(500).json(error);
            return;
        }
        
        if(!board){
            res.status(404).json({
                message: `Doesn't exist`
            });
            return;
        }
        if(!board.creatorID.includes(req.user.id)){
            res.status(403).json({
                message: `not authorized to access board`});
            return;
        }

        try {
            board = await Boards.findByIdAndUpdate(
                id,
                {
                    $push:{
                        container: container._id,
                    }
                },
                {
                    new: true,
                }
            );
        
        } catch (error) {
            res.status(500).json(error);
            return;
        }
        
        res.status(201).json(board);



    });

}
