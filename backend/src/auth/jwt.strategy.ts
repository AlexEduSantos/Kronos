import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/user/user.service'; // Para buscar o usuário pelo ID do token

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrai o token do cabeçalho 'Bearer Token'
      ignoreExpiration: false, // Não ignora a expiração do token
      secretOrKey: process.env.JWT_SECRET || 'umSegredoMuitoForte123!@#', // USE A MESMA VARIÁVEL DE AMBIENTE!
    });
  }

  async validate(payload: any) {
    // payload contém os dados que você colocou no JWT (email, sub: id do usuário)
    const user = await this.userService.findById(payload.sub);
    if (!user) {
        throw new UnauthorizedException('Usuário não encontrado.');
    }
    // Retorna o objeto user. Isso será anexado a req.user em rotas protegidas
    return { userId: user.id, email: user.email, name: user.name };
  }
}