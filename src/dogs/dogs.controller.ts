import { Controller, Get, Query, Headers, Redirect, Post, Body } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { Observable, of, map } from 'rxjs';
import { CreateDogDto } from './dto/create-dog.dto';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Get("breed")
  findBreed(): string {
    return "This is a dog breed";
  }

  @Get("test")
  findTestWith(@Headers() headers: any) {
    return {
      name: "the result of the request to retrieve headers component",
      headers: headers
    }
  }
  
  @Get("concrete")
  findConcreteComponentFromHeaders(
    @Headers("host") host: string,
    @Headers("connection") connection: string
  ) {
    return {
      message: "here is the particular parameters from headers",
      connection: connection,
      host: host
    }
  } 

  @Get("info")
  findOtherHeaders(
    @Headers("user-agent") agent: string,
    @Headers("accept-language") lang: string
  ) {
    return {
      message: "retrieved specific headers information",
      userAgent: agent,
      language: lang,
    };
  }

  @Get('docs')
  @Redirect("https://youtube.com")
  redirectToyoutube(@Query("version") version: string) {
    if (version === "5") {
      return { url: "https://www.youtube.com/watch?v=gzPdC6OPajI" }
    }
  }

  @Get('promises')
  async promis(): Promise<any[]> {
    const data = await fetch("https://api.open-meteo.com/v1/forecast?latitude=32.2217&longitude=-110.9265&hourly=temperature_2m")
    const res = data.json()
    return res
  }

  @Get("observ")
  getData(): Observable<any> {
    return of({ message: 'Hello' }).pipe(
      map(v => ({ ...v, date: Date.now() })),
      map(v => ({ ...v, server: "server" })),
      map(v => ({ ...v, help: "help" }))
    );
  }

  @Post("postus")
  async postus(@Body() createDogDto: CreateDogDto) {
    const res = { ...createDogDto, date: Date.now() }
    return res
  }

  @Post()
  async create(@Body() createDogDto: CreateDogDto) {
    this.dogsService.create(createDogDto);
  }

  @Get("findAll")
  async findAll() {
    return this.dogsService.findAll();
  }
}
