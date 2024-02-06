const boardService = require("../services/boardService");

class BoardController{
    create = async (req, res, next) => {
        try {
            const { title, cover } = req.body;
            
            if (req.file) {
            } else {
                throw new Error('Chỉ hỗ trợ định dạng jpg và png');
            }
    
            let data = {
                title,
                //Nếu có tệp tin được tải lên thì đường dẫn của tệp tin tải lên sẽ đc gán cho cover
                //Nếu k có giá trị cover sẽ đc giữ nguyên
                cover: req.file ? req.file.path : cover,
            };

            const board = await boardService.create(data);
    
            res.status(200).json({
                board
            });
        } catch (error) {
            next(error);
        }
    };

    getAll = async(req, res, next) =>{
        try {
            const boards = await boardService.getAll();
            res.status(200).json({
                boards
            })
        } catch (error) {
           throw error;
        }
    }

    update = async (req, res, next) => {
        try {
            const {id} = req.params;
            
            const { title, cover } = req.body;
        
            let data = {
                title,
                cover: req.file ? req.file.path : cover,
            };
        
            const result = await boardService.update(id, data);
            const boards = await boardService.getBoard(id);
            res.status(200).json({
                board: result,
                boards
            });
        } catch (error) {
            next(error);
        }
      };


    delete = async (req, res, next) => {
        try {
          const { id } = req.params;
      
          const boardDelete = await boardService.delete(id);
      
          if (boardDelete) {
            const deleteList = await boardService.deleteList(id);
            if(deleteList) {
                const deleteCard = await boardService.deleteCard(deleteList);
                if (deleteCard) { 
                    res.status(200).json({
                        'msg': 'Xoá thành công'
                    })
                } else {
                    res.status(404).json({
                        'msg': 'Lỗi khi xoá tất cả các card'
                    })
                }
            } else {
                res.status(404).json({
                    'msg': 'Lỗi khi xoá'
                })
            }
          } else {
            res.status(404).json({
                'msg': 'Not found'
            })
          }
        } catch (error) {
          next (error);
        }
    };
}

module.exports = new BoardController();