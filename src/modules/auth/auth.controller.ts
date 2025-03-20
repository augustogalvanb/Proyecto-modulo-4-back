import { Body, Controller, HttpException, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { SetDefaultRolePipe } from "src/pipes/setDefaultRole.pipe";
import { UsersService } from "../users/users.service";
import { createUserDto } from "../users/dtos/createUser.dto";
import { loginUserDto } from "./dtos/loginUser.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly usersService: UsersService) {}

    @Post('signup')
    @UsePipes(SetDefaultRolePipe, new ValidationPipe({ transform: true }))
    signup(@Body() user: createUserDto) {
        try {
            return this.usersService.signup(user)
        } catch (error) {
            throw new HttpException(
                {
                    status: 400,
                    error: "No se pudo crear el usuario en este momento"
                },
                400
            )
         }
    }
    
    @Post('signin')
    signin(@Body() credentials: loginUserDto) {

        try {
            return this.usersService.signin(credentials)
        } catch (error) {
            throw new HttpException(
                {
                    status: 400,
                    error: "No se pudo loguear en este momento"
                },
                400
            )
        }

    } 
}