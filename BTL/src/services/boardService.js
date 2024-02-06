const Board = require("../models/Board");
const List = require("../models/List")
const Card = require("../models/Card")


class BoardService{

    create = async(dataBoard) => {
        try {
            //Xử lý các nghiệp vụ liên quan
            const board = new Board(dataBoard);
            await board.save();
            return board;
        } catch (error) {
            throw error;
        }
    }

    getAll = async() => {
        try {
            const boards = await Board.find();
            // const boards = await Board.find({'title': 'Bảng 1'});
            return boards;
        } catch (error) {
            throw error;
        }
    }

    getBoard = async(id) => {
        try {
            const board = await Board.findById({_id : id});
            return board;
        } catch (error) {
            throw error;
        }
    }

    update = async(id,data) => {
        try {
            //Xử lý các nghiệp vụ liên quan
           const result = await Board.updateOne({_id: id},{title: data.title,cover: data.cover });
           console.log(result);
           return true;
        } catch (error) {
            throw new Error('Không tìm thấy idBoard');
        }
    }

    deleteCard = async (deleteListObjects) => {
        try  {
            const deleteLists = deleteListObjects.map(lists => lists._id);    
            const result = await Card.deleteMany({ idList: { $in: deleteLists } });
            return true;
        } catch (error) {
            throw error;
        }
    }


    deleteList = async (id) => {
        try  {
            const result = await List.find({ idBoard: id });
            const deleted = await List.deleteMany({ idBoard: id });
            return result;
        } catch (error) {
            throw error;
        }
    }

    delete = async(id) => {
        try {
            const checkBoard = await Board.findOne({_id: id});
            if (checkBoard) {
                const board = await Board.findById(id);
                // console.log(board);  
                await board.deleteOne();
                return true;
            } else { 
                return false;
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new BoardService();