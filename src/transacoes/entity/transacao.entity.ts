import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transacoes')
export class Transacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuario: string;

  @Column('decimal')
  valor: number;

  @Column()
  categoria: string;

  @Column()
  tipo: string;
}
