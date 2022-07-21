import express, {Request, Response} from 'express';
import mongoose from 'mongoose';

import {User, Cards, Containers, Boards} from "../persist/model";

export const cardSetUp = function(app:any){

    app.post("/board/:boardId/container/:containerId/card", async (req:Request, res:Response)=>{
        const boardID = req.params.boardId;
        const containerId = req.params.containerId;
        
        if(!req.user){
            res.status(401).json({message:"unauthed"});
            return;
        }
        let container:any;
        try {
            container = await Containers.findById(containerId);
        } catch (err) {
            res.status(500).json(err)
            return;
        }
        if(!container){
            res.status(404).json({message:"Container not found"});
            return;
        }
        if(container.creatorID != User.id){
            res.status(403).json({message:"User is not autherized to create a card on this container"});
        }

        let card = {
            name: req.body.name,
            date: req.body.date,
            category: req.body.category,
            creatorID: req.user.id,
            done: false,
        }
        let newCard;
        try {
            newCard = await Containers.findByIdAndUpdate(containerId,
                card,
                {new:true});
        } catch (err) {
            res.status(500).json(err);
            return;
        }
        res.status(201).json(newCard);
        
                            

    });
    //will need to mark an card as complete by id


}