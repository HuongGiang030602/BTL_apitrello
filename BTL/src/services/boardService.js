const Board = require("../models/Board");

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

    delete = async(id) => {
        try {
            //Xử lý các nghiệp vụ liên quan
            const board = await Board.findById(id);
            console.log(board);
            await board.deleteOne();
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new BoardService();