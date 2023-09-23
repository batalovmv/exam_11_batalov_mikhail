import {
  JsonController, UploadedFile, Post, BadRequestError, Req
} from 'routing-controllers';
import multer from 'multer';


const upload = multer({ dest: 'uploads/' });

@JsonController()
export class UploadController {
  @Post('/upload')
  uploadFile(@UploadedFile('photo', { options: upload }) file: any, @Req() request: any) {
    if (!file) {
      throw new BadRequestError('File is not provided');
    }
    console.log(request.body) 

    return { filePath: file.path };
  }
}