import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transacao } from './entity/transacao.entity';

@Injectable()
export class TransacoesService {
  constructor(
    @InjectRepository(Transacao)
    private repo: Repository<Transacao>,
  ) {}

  async adicionar(
    usuario: string,
    valor: number,
    categoria: string,
    tipo: string,
  ) {
    const transacao = this.repo.create({ usuario, valor, categoria, tipo });
    await this.repo.save(transacao);
  }

  async resumo(usuario: string): Promise<string> {
    const transacoes = await this.repo.find({ where: { usuario } });

    if (!transacoes.length) return '📊 Sem transações.';

    const total = transacoes.reduce((s, t) => s + Number(t.valor), 0);
    const categorias = transacoes.reduce<Record<string, number>>((acc, t) => {
      acc[t.categoria] = (acc[t.categoria] || 0) + Number(t.valor);
      return acc;
    }, {});

    let resposta = `📊 Resumo:\nTotal: R$${total}\n`;
    for (const [cat, val] of Object.entries(categorias)) {
      resposta += `- ${cat}: R$${val}\n`;
    }
    return resposta;
  }
}
