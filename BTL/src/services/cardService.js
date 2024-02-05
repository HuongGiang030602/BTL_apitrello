const Board = require("../models/Board");
const Card = require("../models/Card");
const List = require("../models/List");
const User = require("../models/User")

class CardService{

    checkIDList = async(data) => {
        try {
            const list = await List.findOne({_id: data.idList})
            return list;
        } catch (error) {
            throw new Error('Không tồn tại idList !')
        }
    }

    checkCard = async (idCard) => { 
        try {
            const card = await Card.findOne({_id: idCard}) 
            return card;
          } catch (error) {
            throw new Error('Không tồn tại idCard này');
          }
    }


    getMember = async (data) => {
        try {
            const user = await User.find({email: { $in: data.member} }).select('-_id username phone age');
            console.log(user);
            return user;
        } catch (error) {
            throw error;
        }
    }

    create = async (data) =>{
        
        try {
            // Xử lý các nghiệp vụ liên quan
            // Gọi đến tầng model
            const card = new Card(data);
            await card.save();
            return card;
     
        } catch (error) {
            throw error;
        }
    }

    getAll = async(idList) => {
        try {
            const cards = await Card.find({idList});
            // const cards = await Card.find({'title': 'Bảng 1'});
            console.log(cards)
            return cards;
        } catch (error) {
            throw error;
        }
    }

    getCard = async (cardId) => {
        try {
          const card = await Card.findOne({ _id: cardId });
          console.log(card);
          return card;
        } catch (error) {
          throw error;
        }
      }

    update = async(id,data) => {
        try {
            //Xử lý các nghiệp vụ liên quan
            const result = await Card.updateOne({ _id: id }, {
                title: data.title,
                describe: data.describe,
                member: data.member,
                due_date: data.due_date,
                cover: data.cover,
                attachment: data.attachment
              });
           return true;
        } catch (error) {
            throw error;
        }
    }

    delete = async(id) => {
        try {
            //Xử lý các nghiệp vụ liên quan
            const card = await Card.findById(id);
            console.log(card);
            await card.deleteOne();
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CardService();