const List = require("../models/List");
const Board = require("../models/Board");

class ListService{

    checkIDBoard = async(data) => {
        try {
            const board = await Board.findOne({_id: data.idBoard})
            return board;
        } catch (error) {
            throw error;
        }
    }

    checkList = async (idList) => { 
        try {
            const list = await List.findOne({_id: idList}); 
            return list;
          } catch (error) {
            throw new Error('Không tồn tại idList này');
          }
    }

    getList = async (id) => {
        try {
            const list = await List.findById(id);
            return list;
        } catch (error) {
            throw error;
        }
    }


    create = async (data) =>{
        
        try {
            // Xử lý các nghiệp vụ liên quan
            // Gọi đến tầng model
            const list = new List(data);
            await list.save();
            return list;
     
        } catch (error) {
            throw error;
        }
    }

    getAll = async(idBoard) => {
        try {
            const lists = await List.find({ idBoard }).sort({ position: -1 });
            // const lists = await List.find({'title': 'Bảng 1'});
            console.log(lists)
            return lists;
        } catch (error) {
            throw error;
        }
    }

    update = async(id,data) => {
        try {
            //Xử lý các nghiệp vụ liên quan
           const result = await List.updateOne({_id: id},{title: data.title});
           return true;
        } catch (error) {
            throw new Error('Không tồn tại List này');          
        }
    }

    delete = async(id) => {
        try {
            //Xử lý các nghiệp vụ liên quan
            
            const list = await List.findById(id);
            await list.deleteOne();
            return true;
        } catch (error) {
            throw new Error('Không tồn tại List này');            
        }
    }
}

module.exports = new ListService();