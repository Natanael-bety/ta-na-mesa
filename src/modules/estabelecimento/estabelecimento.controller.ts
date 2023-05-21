import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Query,
  // UseGuards,
} from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { CreateEstabelecimentoDto } from './dto/create-estabelecimento.dto';
import { UpdateEstabelecimentoDto } from './dto/update-estabelecimento.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { toMb } from 'src/utils/transform';
import { IMAGE_EXTENSION_REGEX } from 'src/constants/utils';
// import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('estabelecimento')
// @UseGuards(JwtAuthGuard)
export class EstabelecimentoController {
  constructor(
    private readonly estabelecimentoService: EstabelecimentoService,
  ) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe({ transform: true }))
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: toMb(10) }),
          new FileTypeValidator({
            fileType: IMAGE_EXTENSION_REGEX,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Query() data: CreateEstabelecimentoDto,
  ) {
    return this.estabelecimentoService.create({ data, file });
  }

  @Get()
  findAll() {
    return this.estabelecimentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estabelecimentoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstabelecimentoDto: UpdateEstabelecimentoDto,
  ) {
    return this.estabelecimentoService.update(+id, updateEstabelecimentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estabelecimentoService.remove(+id);
  }
}
