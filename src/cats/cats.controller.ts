import { Controller, Get, Query, Req, Headers, Redirect, Param, Post, Body, HttpStatus, HttpException, UseFilters, ForbiddenException, ParseIntPipe } from '@nestjs/common';
import { CatsService } from './cats.service';
import { UseGuards } from '@nestjs/common';
import { Observable, of, map } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';
import { IlyasException } from 'src/common/exceptions/ilyas.exception';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';



@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Get("breed")
  findBreed(): string {
    return "This is a cat breed";
  }

 @Get("excep")
  async checkExcept() {
    try {
      return await this.catsService.findAll()
    }
    catch(error) {
      throw new HttpException(
        {
          message: "This is a custom message",
          status: HttpStatus.FORBIDDEN
        },
        HttpStatus.FORBIDDEN,
        {
          cause:error
        }
      )
    }
  }

  @Get("ilyasException")
  async checkIlyas() {
    throw new IlyasException()
  }

  @Get("test")
  findTestWith(@Headers() headers: string){
    return {
      name: "the result of the request to retrieve headers component",
      headers: headers
    }
  }
  
  @Get("concrete")
  findConcreteComponentFromHeaders(@Headers("host") host: string, @Headers("connection") connection:string) {
    return {
      message: "here is the particular parameters from headers",
      connection: connection,
      host: host
    }

  } 

  @Get("info")
  findOtherHeaders(@Headers("user-agent") agent: string, @Headers("accept-language") lang: string) {
  return {
    message: "retrieved specific headers information",
    userAgent: agent,
    language: lang,
  };
}

  @Get('docs')
  @Redirect("https://youtube.com")
  redirectToyoutube(@Query("version") version:string) {
    if (version === "5") {
    return {url: "https://www.youtube.com/watch?v=gzPdC6OPajI"}
  }
}
  @UseFilters(HttpExceptionFilter)
  @Get(':id')
  findOne(@Param("id", ParseIntPipe) id:number) {
    return this.catsService.findOne(id);
  }

  @Get('promises')
  async promis():Promise<any[]>{
    const data = await fetch("https://api.open-meteo.com/v1/forecast?latitude=32.2217&longitude=-110.9265&hourly=temperature_2m")
    const res = data.json()
    return res
  }

  @Get("observ")
  getData(): Observable<any> {
    return of({message: 'Hello'}).pipe(
      map(v=>({...v, date: Date.now()})),
      map(v=>({...v, server:"server"})),
      map(v=>({...v, help:"help"}))
    );
  }


  @Post("postus")
  @Roles(["admin"])
  async postus(@Body() createCatDto: CreateCatDto){
    const data = await createCatDto
    const res = {...data,date:Date.now()}
      return res
    }

    // @Post()
    // async create(@Body() createCatDto: CreateCatDto) {
    //   this.catsService.create(createCatDto);
    // }

  @Post()
  @UseFilters(HttpExceptionFilter)
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    throw new ForbiddenException
  }

    @Get("findAll")
    async findAll() {
      return this.catsService.findAll();
    }
}

