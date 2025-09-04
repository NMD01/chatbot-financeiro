import { Module } from '@nestjs/common';
import { TransacoesService } from './transacoes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transacao } from './entity/transacao.entity';

@Module({
  providers: [TransacoesService],
  exports: [TransacoesService],
  imports: [TypeOrmModule.forFeature([Transacao])],
})
export class TransacoesModule {}
