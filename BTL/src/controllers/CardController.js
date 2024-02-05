const cardService = require("../services/cardService");

class CardController{
    create = async (req, res, next) => {
        try {
            const {title,idList,describe,member,due_date} = req.body;

            const coverPath = req.files?.cover?.[0]?.path ?? null;
            const attachmentPaths = req.files?.attachment?.map(file => file.path) ?? [];

            const data = {
                title,
                describe,
                member,
                due_date,
                cover: coverPath,
                idList,
                attachment: attachmentPaths
            };
    
            let dataCard = {idList};
            let dataMember = {member};
            const list = await cardService.checkIDList(dataCard)
    
            if(list) {
                const card = await cardService.create(data);
                const members = await cardService.getMember(dataMember)
                res.status(200).json({
                    card,
                    members
                })
            } else { 
                res.status(404).json({
                    'msg': 'Tạo card thất bại'
                })
            }
        
            
        } catch (error) {
            next (error);
        }
    };

    getAll = async(req, res, next) =>{
        try {
            const {idList} = req.params;
            const cards = await cardService.getAll(idList);
            res.status(200).json({
                cards
            });
        } catch (error) {
           throw error;
        }
    }

    //xem chi tiet 1 card
    getCard = async (req, res, next) => {
        try {
            const {idCard} = req.params;
            // Goi den service
            const card = await cardService.getCard(idCard);
            res.status(200).json({
                card
            });
        } catch (error) {
            throw error;
        }
    };

    update = async (req, res, next) => {
        try {
            const {title, describe, member, due_date } = req.body;
            const {idCard} = req.params;

            const coverPath = req.files?.cover?.[0]?.path ?? null;
            const attachmentPaths = req.files?.attachment?.map(file => file.path) ?? [];

            const data = {
                title,
                describe,
                member,
                due_date,
                cover: coverPath,
                attachment: attachmentPaths
            };

            let dataMembers = {member}

           
            const result = await cardService.checkCard(idCard);
            if (!result) {
                return res.status(404).json({ msg: 'Không tìm thấy idCard' });
            }

            const cardPut = await cardService.update(idCard, data);
            if (!cardPut) {
                throw new Error('Cập nhật thông tin Card thất bại');
            }

            const card = await cardService.getCard(idCard);
            const members = await cardService.getMember(dataMembers);

            res.status(200).json({
                "msg": 'Cập nhật thông tin Card thành công!',
                card,
                members
            });
        } catch (error) {
            next(error);
        }
    };


    delete = async (req, res, next) => {
        try {
          const { idCard } = req.params;
      
          const card = await cardService.delete(idCard);
      
          if (card) {
            res.status(200).json({ 'msg': 'Card deleted successfully!' });
          } else {
            throw new Error('Fail');
          }
        } catch (error) {
          throw error;
        }
    };
}

module.exports = new CardController();