export interface JwtResponse {
    dataUser:{
        id:number,
        rol:string,
        accessToken:string,
        expiresIn:string
    }
}
