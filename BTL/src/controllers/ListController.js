const listService = require("../services/listService");

class ListController{
    create = async (req, res, next) => {
        try {
            const {title,idBoard} = req.body;

            let data = {
                title,
                idBoard
            };

            let id = {idBoard};

            const result = await listService.checkIDBoard(id);

            if (!result) {
                res.status(404).json({
                    message: 'idBoard không tồn tại !'
                })
            }else {
                const list = await listService.create(data);
                res.status(200).json({
                    list
                });
            }
            
        } catch (error) {
            res.status(404).json({
                message: 'Không tìm thấy !'
            })
        }
    };


    

    getAll = async(req, res, next) =>{
        try {
            const {idBoard} = req.params;
            const lists = await listService.getAll(idBoard);
            res.status(200).json({
                lists
            });
        } catch (error) {
           throw error;
        }
    }

    update = async (req, res, next) => {
        try {
            const {idList} = req.params;
            
            const {title} = req.body;
        
            // Tạo object mới chứa thông tin cập nhật
            let data = {
                title
            };

            const result = await listService.checkList(idList);
            if (!result) {
                return res.status(404).json({ error: 'Không tìm thấy' });
            }

            const listPut = await listService.update(idList, data);
            if (!listPut) {
                throw new Error('Cập nhật thông tin List thất bại');
            }

            const list = await listService.getList(idList);
            res.status(200).json({
                "msg": 'Cập nhật thông tin List thành công',
                list
            });
        
        } catch (error) {
            next(error);
        }
      };

      
    delete = async (req, res, next) => {
        try {
            const { idList } = req.params;
      
            const result = await listService.delete(idList)
            if(result == true) {
                const deleteCard = await listService.deleteCard(idList);
                if(deleteCard == true) {
                    res.status(200).json({
                        'msg': 'Xoá thành công !'
                    })
                } else {
                    res.status(404).json({
                        'msg': 'Lỗi khi xoá tất cả các card'
                    })
                }
            }else {
                res.status(404).json({
                    'msg': 'Không tìm thấy idList'
                })
            }
        } catch (error) {
          next (error);
        }
    };
}

module.exports = new ListController();